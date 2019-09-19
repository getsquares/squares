<template>
  <div class="chars">
    <strong>Chars:</strong>
    {{ chars }}
  </div>
</template>

<script>
export default {
  name: "MarkdownChars",
  computed: {
    chars() {
      return this.$store.getters["field/markdown/editor/chars"];
    }
  }
};
</script>