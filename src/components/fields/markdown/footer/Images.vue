<template>
  <div class="images">
    <strong>Images:</strong>
    {{ images }}
  </div>
</template>

<script>
export default {
  name: "MarkdownImages",
  computed: {
    images() {
      return this.$store.state["field/markdown/editor"].imagecount;
    }
  }
};
</script>