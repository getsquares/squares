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
  components: {
    //Marked
  },
  computed: {
    input() {
      return this.$store.state.fieldMarkdown.input;
    },
    sanitized() {
      //console.log(this.input.length);
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
      let code = this.sanitized;

      return code.length;
    }
  }
};
</script>