<template>
  <prism-editor
    class="sql_editor"
    v-model="code"
    :highlight="highlighter"
    line-numbers
    :readonly="readonly"
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
    code: '',
  }),
  props: {
    sql: {
      type: String,
    },
    readonly: {
      type: Boolean,
    },
  },
  watch: {
    code() {
      this.$emit('sql_textarea_data', this.code);
    },
    sql() {
      this.code = this.sql;
    },
  },

  methods: {
    highlighter(code) {
      return highlight(code, languages.plsql); //returns html
    },
  },
};
</script>
