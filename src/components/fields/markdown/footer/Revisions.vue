<template>
  <div class="revisions">
    <strong>Revisions:</strong>
    {{ count }}
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state["field/markdown/editor"].revisionCount;
    }
  }
};
</script>