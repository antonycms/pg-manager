<template>
  <prism-editor
    readonly
    class="json_editor"
    v-model="code"
    :highlight="highlighter"
  ></prism-editor>
</template>

<script>
// import Prism Editor
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-json.js';
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
    json: {
      type: String,
    },
  },
  watch: {
    code() {
      this.$emit('sql_textarea_data', { code: this.code });
    },
    json() {
      this.code = this.json;
    },
  },

  methods: {
    highlighter(code) {
      return highlight(code, languages.json); //returns html
    },
  },
};
</script>
