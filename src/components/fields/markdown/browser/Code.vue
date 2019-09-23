<template>
  <div class="code">
    <div tabindex="0" spellcheck="false">![{{ alt }}]({{ trail }})</div>
  </div>
</template>

<script>
export default {
  name: "BrowserCode",
  computed: {
    alt() {
      return this.$store.state["field/markdown/browser"].alt;
    },
    trail() {
      let trail = this.$store.getters["field/markdown/browser/trail"];

      if (!this.replacement) {
        return trail;
      } else {
        // If not in the beginning of the string
        if (trail.indexOf(this.replacement) !== 0) return trail;

        return trail.slice(
          trail.indexOf(this.replacement) + this.replacement.length
        );
      }
    },
    replacement() {
      return this.$store.state["field/markdown/options"].options.media.trim;
    }
  }
};
</script>

<style lang="scss" scoped>
.code {
  padding: 0.5rem;
  padding-top: 0;

  div {
    width: 100%;
    border: none;
    resize: none;
    font-family: inherit;
    user-select: all;
    padding: 0.5rem;
    box-sizing: border-box;
    background: transparent;
    border: 2px solid #ddd;
    display: block;
    outline: none;
  }
}
</style>