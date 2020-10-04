<template>
  <div class="overflow-hidden">
    <div class="text-center mb-8">
      <v-btn color="deep-purple" outlined @click="active = !active">
        Toggle Navigation
      </v-btn>
    </div>

    <v-bottom-navigation v-model="value" :input-value="active" color="indigo">
      <SQLEditor />
    </v-bottom-navigation>
  </div>
</template>

<script>
import SQLEditor from '@/frontend/components/SQLEditor';

export default {
  components: {
    SQLEditor,
  },
  data() {
    return {
      value: 1,
      active: true,
    };
  },
};
</script>
