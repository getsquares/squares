<template>
  <div class="alt">
    <input type="text" spellcheck="false" @keyup="setAlt($event)" placeholder="Alt text" />
  </div>
</template>
      
<script>
export default {
  name: "BrowserAlt",
  computed: {
    alt() {
      return this.$store.state["field/markdown/browser"].alt;
    }
  },
  methods: {
    setAlt(e) {
      this.$store.commit("field/markdown/browser/alt", e.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.alt {
  padding: 0.5rem;

  input {
    border: none;
    padding: 0.5rem;
    box-sizing: border-box;
    outline: none;
    width: 100%;
  }
}
</style>