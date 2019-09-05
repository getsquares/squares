<template>
  <div class="counters">
    <strong>Counters:</strong>
    {{ countWords }} words, {{ countChars }} chars
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
    sanitized() {
      let markdown = Marked(this.input);
      return markdown.replace(/(\r\n|\n|\r)/gm, " ");
    },
    countWords() {
      let code = this.sanitized;

      return code.split(" ").filter(function(n) {
        return n != "";
      }).length;
    },
    countChars() {
      return this.sanitized.length;
    }
  }
};
</script>