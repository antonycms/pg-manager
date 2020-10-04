<template>
  <prism-editor
    class="sql_editor"
    v-model="code"
    :highlight="highlighter"
    line-numbers
  ></prism-editor>
</template>

<script>
// import Prism Editor
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-plsql.js';
import 'prismjs/themes/prism.css';

export default {
  name: 'SQLEditor',
  components: {
    PrismEditor,
  },

  data: () => ({
    code: 'SELECT * FROM "public"."pessoas"',
  }),
  watch: {
    code() {
      this.$emit('sql_textarea_data', { code: this.code });
    },
  },

  methods: {
    highlighter(code) {
      return highlight(code, languages.plsql); //returns html
    },
  },
};
</script>

<style scoped>
/* required class */
.sql_editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: var(--background);
  color: rgb(255, 0, 0);
  outline: none;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  padding: 5px;
}
</style>

<style>
.prism-editor-wrapper,
.prism-editor__container {
  min-height: 100% !important;
}
.prism-editor__textarea {
  outline: transparent;
}
</style>
