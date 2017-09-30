import Vue from 'vue';
import Moment from 'vue-moment';

import UiSection from '@/components/Section';
import UiMarkdown from '@/components/Markdown';

import App from '@/App';
import router from '@/router';
import store from '@/store';

import 'element-ui/lib/theme-default/reset.css';

import {
  Dialog,
  Menu,
  Submenu,
  MenuItem,
  Input,
  Switch,
  Button,
  DatePicker,
  Form,
  FormItem,
  Tag,
  Alert,
  Row,
  Col,
  Card,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui'

Vue.use(Dialog);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Switch);
Vue.use(Button);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tag);
Vue.use(Alert);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.use(Moment);
Vue.use(UiSection);
Vue.use(UiMarkdown);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
