<template>
  <div class="counters" :class="stateClass">
    <strong>Word Count:</strong>
    {{ wordcount }} words
  </div>
</template>

<script>
import Marked from "marked";

export default {
  name: "MarkdownCounters",
  computed: {
    input() {
      return this.$store.state["field/markdown/editor"].input;
    },
    wordcount() {
      return this.$store.state["field/markdown/editor"].wordcount;
    },
    options() {
      return this.$store.state["field/markdown/editor"].options;
    },
    stateClass() {
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
      console.log(match);
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