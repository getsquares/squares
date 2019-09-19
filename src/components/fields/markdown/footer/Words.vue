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
      return this.$store.state["field/markdown/words"].wordcount;
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
      let match = "none";
      let stateClass = {};

      for (let option in this.options.words) {
        let words = this.options.words[option];

        if (this.wordcount >= words.min) {
          if (!("max" in this.options.words[option])) {
            match = option;
          } else if (this.wordcount < words.max) {
            match = option;
          }
        }
      }

      switch (match) {
        case "warning":
          stateClass = { warning: true };
          break;
        case "danger":
          stateClass = { danger: true };
          break;
        case "success":
          stateClass = { success: true };
          break;
      }

      return stateClass;
    }
  }
};
</script>