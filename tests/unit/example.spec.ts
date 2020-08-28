import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Reports from '@/components/Reports.vue';

describe('Reports.vue', () => {
    it('render reports component should contain reports class', () => {
        const wrapper = shallowMount(Reports, {
            propsData: {
                location: ['madrid', 'Madrid'],
                token:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ',
            },
        });
        expect(wrapper.classes()).to.include('reports');
    });
});
