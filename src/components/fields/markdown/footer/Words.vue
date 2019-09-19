<template>
  <div class="counters" :class="stateClass">
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
      return this.$store.state["field/markdown/words"].wordcount;
    },
    options() {
      return this.$store.state["field/markdown/options"].options;
    },
    stateClass() {
      if (!this.options) return;
      let match = "none";
      let stateClass = {};

      for (let option in this.options.words) {
        let words = this.options.words[option];

        if (this.wordcount > words.min) {
          if (!("max" in this.options.words[option])) {
            match = option;
          } else if (this.wordcount < words.max) {
            match = option;
          }
        }
      }

      if (match == "warning") {
        stateClass = { warning: true };
      } else if (match == "danger") {
        stateClass = { danger: true };
      } else if (match == "success") {
        stateClass = { success: true };
      }
      return stateClass;
    }
  }
};
</script>