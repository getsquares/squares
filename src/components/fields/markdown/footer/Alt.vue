<template>
  <div class="alt" :class="warningClass" :title="title" v-show="missingAlt != 0">
    <strong>Missing alt:</strong>
    {{ missingAlt }}
  </div>
</template>
<script>
export default {
  name: "Alt",
  computed: {
    missingAlt() {
      return this.counters.images - this.counters.alt;
    },
    counters() {
      return this.$store.state["field/markdown/editor"].count;
    },
    warningClass() {
      return {
        danger: this.missingAlt != 0
      };
    },
    title() {
      const s = this.missingAlt > 1 ? "s" : "";
      return `${this.missingAlt} image alt attribute${s} missing`;
    }
  }
};
</script>