import Vue from 'vue';
import { mount, shallowMount } from '@vue/test-utils';

import _ from 'lodash';

import { expect } from 'chai';
import List from '@/modules/list/Index.vue';
import { Ticket } from '@/modules/list/_models/list-state';
import TicketsTable from '@/modules/list/_components/ticketTable/TicketsTable.vue';
import { ListData } from '@/modules/list/_models/list-constants';
import CustomizeColumnModal from '@/modules/list/_components/CustomizeColumnModal.vue';

Vue.config.ignoredElements = [/chi-.*/];

describe('modules/list', () => {
    const noop = () => {
        // do nothing
    };

    const ticketTemplate = {
        ticketInfo: {
            id: '18588649',
            source: 'CLARIFY',
            serviceId: 'ETH10GB-23955268-DIV',
            serviceType: 'IP',
            ticketCreatedDate: '2020-01-04T12:29:10.406951',
            ticketCreatedDateCorrected: '2020-01-04T12:29:10.406951',
            ticketLastModified: '2020-01-04T12:29:10.406951',
            ticketLastModifiedCorrected: '2020-01-04T12:29:10.406951',
            detailedStatus: 'Active',
            desc: 'Customer Trouble - IP - See Notes',
            problem: null,
            deviceName: null,
            lastLogEntryText: '11950636 changed contact information for this ticket on 2020-06-03 12:00:00 GMT+2.',
            trackingNumber: null,
            applianceName: null,
            ticketStatus: 'Open',
            clarifyInfo: {
                ticketType: 'Repair',
            },
        },
        customerInfo: {
            customerId: '3-A667476',
            customerIdSource: 'TMS',
            customerAccountId: '94684538',
            customerAccountIdSource: 'TMS',
        },
    };

    const sampleTickets: Ticket[] = [];

    for (let i = 0; i < 50; i++) {
        sampleTickets.push(JSON.parse(JSON.stringify(ticketTemplate)));
        sampleTickets[i].ticketInfo.id = '' + (Number(ticketTemplate.ticketInfo.id) + i);
    }

    it('render table page', () => {
        const wrapper = mount(TicketsTable, {
            propsData: {
                ticketsList: sampleTickets,
                columns: ListData.REPAIR_SUMMARY_TICKETS_TABLE,
            },
        });
        expect(wrapper.findAll('.cursorPointer').length).to.equal(20);
    });

    it('render full view', () => {
        const wrapper = mount(List, {
            computed: {
                allTicketsList: (): Ticket[] => sampleTickets,
                error: () => null,
                isLoggedIn: () => true,
            },
            methods: {
                refreshTickets: noop,
                _register: noop,
            },
            stubs: { TicketsTable },
        });
        expect(wrapper.find(TicketsTable).exists()).equals(true);
        expect(wrapper.findAll('.cursorPointer').length).to.equal(20);
        wrapper.find('#next-button').trigger('click');
        wrapper.find('#next-button').trigger('click');
        expect(wrapper.findAll('.cursorPointer').length).to.equal(10);
    });

    it('show column selector modal', () => {
        const wrapper = mount(List, {
            computed: {
                allTicketsList: (): Ticket[] => sampleTickets,
                error: () => null,
                isLoggedIn: () => true,
            },
            methods: {
                refreshTickets: noop,
                _register: noop,
            },
            stubs: { CustomizeColumnModal },
        });
        expect(wrapper.find(CustomizeColumnModal).exists()).to.equal(false);
        wrapper.find('#settings-button').trigger('click');
        expect(wrapper.find(CustomizeColumnModal).exists()).to.equal(true);
        wrapper.find('#closeCustomizeColumnModal').trigger('click');
        expect(wrapper.find(CustomizeColumnModal).exists()).to.equal(false);
    });

    it('display errors', () => {
        const message = 'Error: Request failed with status code 401';
        const wrapper = mount(List, {
            computed: {
                allTicketsList: (): Ticket[] => [],
                error: () => message,
                isLoggedIn: () => true,
            },
            methods: {
                refreshTickets: noop,
                _register: noop,
            },
            stubs: { CustomizeColumnModal },
        });
        expect(wrapper.text().includes(message));
    });
});
