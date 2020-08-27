import { routerConfig as microappRouterConfig } from '@/router';
import { routerConfig as componentRouterConfig } from '@/router/components';

declare let shell: any;

document.onreadystatechange = function() {
    function contentLoaded() {
        if (!document.getElementById('chi-icons')) {
            let DOMContentLoadedEvent = document.createEvent('Event');

            DOMContentLoadedEvent.initEvent('DOMContentLoaded', true, true);
            document.dispatchEvent(DOMContentLoadedEvent);
        }
    }

    if (document.readyState == 'complete') {
        document.onreadystatechange = null;
        contentLoaded();
        // Router setup
        const application: any = [];
        application.push({ name: 'MicroApp', icon: 'icon-logo-centurylink', routes: [microappRouterConfig] });
        application.push({ name: 'Component', icon: 'icon-activity', routes: [componentRouterConfig] });
        shell.library.setApplications(application);
        const app = shell.library.getVue();
        app.$mount('#app');
    }
};
