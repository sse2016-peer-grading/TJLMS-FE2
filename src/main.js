import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/reset.css';
import 'element-ui/lib/theme-default/index.css';

//import LayoutComponent from '@/components/Layout';

import App from '@/App';
import router from '@/router';
import store from '@/store';

Vue.use(ElementUI);
//Vue.use(LayoutComponent);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
