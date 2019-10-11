<template>
  <div class="counters" :class="stateClass" :title="title">
    <strong>Words:</strong>
    {{ wordcount }}
  </div>
</template>

<script>
export default {
  name: "MarkdownWordcount",
  computed: {
    input() {
      return this.$store.state["field/markdown/editor"].input;
    },
    wordcount() {
      return this.$store.state["field/markdown/editor"].wordcount;
    },
    options() {
      return this.$store.state["field/markdown/options"].options;
    },
    title() {
      if (!this.options) return;
      if (!this.options["words"]["success"]["min"]) return;

      return this.options.words.success.min + " words recommended";
    },
    stateClass() {
      if (!this.options) return;

      let stateClass = {};

      if (this.wordcount < this.options.words.min) {
        stateClass = {
          warning: true
        };
      }

      return stateClass;
    }
  }
};
</script>