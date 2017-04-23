import Vue from 'vue';
import ElementUI from 'element-ui';
import Moment from 'vue-moment';
import 'element-ui/lib/theme-default/reset.css';
import 'element-ui/lib/theme-default/index.css';

import UiSection from '@/components/Section';

import App from '@/App';
import router from '@/router';
import store from '@/store';

Vue.use(ElementUI);
Vue.use(Moment);
Vue.use(UiSection);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
