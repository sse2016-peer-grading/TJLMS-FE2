import Section from './section.vue';
import SectionContainer from './section-container.vue';

export default {
  install(Vue) {
    Vue.component(Section.name, Section);
    Vue.component(SectionContainer.name, SectionContainer);
  },
};
