<template>
  <div class="markdown-content typo" v-html="compiledMarkdown"></div>
</template>

<script>
import render from './render';
import './typo.css';

export default {
  name: 'ui-markdown',
  computed: {
    compiledMarkdown: function () {
      return render(this.markdown);
    },
  },
  props: {
    markdown: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="stylus">
.markdown-content
  pre, code, pre tt
    font-family: "monaco", "Source Code Pro", "Consolas", "Lucida Console", "monospace"
    font-size: 13px

  pre
    border: 0
    display: block
    white-space: pre-wrap
    overflow: auto
    overflow-wrap: break-word
    word-wrap: break-word
    word-break: break-word
    hyphens: auto

  pre, code
    background: #F8F8F8

  pre > code
    background: none
    line-height: 1.5

  pre
    position: relative
    padding: 5px

  code
    color: #c92a2a

  pre > code
    color: black
    text-align: left
    white-space: pre-wrap
    word-spacing: normal
    word-break: normal
    tab-size: 4
    hyphens: none

</style>
