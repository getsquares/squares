<template>
  <div class="limit">
    <strong>Limit:</strong>
    <span
      :class="warningClass"
      title="If this is turning red, increase the length to this field in your database."
    >{{ input.length }} / {{ limit }} bytes</span>
  </div>
</template>

<script>
//import Marked from "marked";

export default {
  name: "MarkdownLimit",
  components: {
    //Marked
  },
  computed: {
    limit() {
      return 255;
      // Change later
    },
    input() {
      return this.$store.state.fieldMarkdown.input;
    },
    overflow() {
      return this.limit < this.input.length;
    },
    warningClass() {
      return { warning: this.overflow };
    }
  }
};
</script>

<style lang="scss" scoped>
.warning {
  color: red; /* Change */
}
span {
  &:before {
    content: " ";
  }
}
</style>