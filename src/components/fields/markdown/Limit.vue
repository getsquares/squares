<template>
  <div class="limit" :title="title">
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
      return this.$store.state["field/markdown/editor"].input;
    },
    overflow() {
      console.log(this.$store.state["field/markdown/limit"]);
      return this.$store.state["field/markdown/limit"].overflow;
    },
    warningClass() {
      return { warning: this.overflow };
    },
    title() {
      if (this.overflow) {
        return "Write a shorter text, or increase the length of the field in your database";
      }
      return "";
    }
  }
};
</script>

<style lang="scss" scoped>
.limit {
  cursor: default;
  user-select: none;
  span {
    &:before {
      content: " ";
    }

    &.warning {
      color: var(--color-danger);
    }
  }
}
</style>