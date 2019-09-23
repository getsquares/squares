<template>
  <div class="readingtime">
    <strong>ReadingTime:</strong>
    <span>{{ time }}</span>
  </div>
</template>

<script>
export default {
  name: "MarkdownReadingTime",
  computed: {
    time() {
      return this.$store.state["field/markdown/editor"].readingtime;
    }
  }
};
</script>