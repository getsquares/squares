<template>
  <div class="preview">
    <img :src="imageUrl" />
  </div>
</template>

<script>
export default {
  name: "BrowserPreview",
  computed: {
    imageUrl() {
      return "/fields/markdown/get/image/?path=" + encodeURI(this.trail);
    },
    trail() {
      return this.$store.getters["field/markdown/browser/trail"];
    }
  }
};
</script>

<style lang="scss" scoped>
.preview {
  padding: 0.5rem;
  padding-top: 0;
  display: flex;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 200px;
    border: 2px solid #ddd;
    box-sizing: border-box;
  }
}
</style>