<template>
  <div class="limit" :title="title" :class="warningClass">
    <strong>Bytes:</strong>
    <span
      title="If this is turning red, increase the length to this field in your database."
    >{{ input.length }} / {{ limit }}</span>
  </div>
</template>

<script>
export default {
  name: "MarkdownLimit",
  computed: {
    limit() {
      return this.$store.state["field/markdown/editor"].limit;
    },
    input() {
      return this.$store.state["field/markdown/editor"].input;
    },
    overflow() {
      return this.$store.getters["field/markdown/editor/overflow"];
    },
    warningClass() {
      return { danger: this.overflow };
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