<template>
  <div>
    <strong>Browser:</strong>
    /{{ trail }}
  </div>
</template>

<script>
export default {
  computed: {
    trail() {
      return this.$store.getters["field/markdown/tree/trail"];
    }
  }
};
</script>