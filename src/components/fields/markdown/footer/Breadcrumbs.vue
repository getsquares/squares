<template>
  <div>
    <strong>Browser:</strong>
    <span v-for="(item, index) in trail" :key="item" @click="buffer(index)">{{ item }}</span>
  </div>
</template>

<script>
export default {
  computed: {
    trail() {
      return this.$store.getters["field/markdown/browser/trail"].split("/");
    }
  },
  methods: {
    // Creates trail for future uri trigger
    /*buffer(index) {
      let buffer = "";
      for (let i = 0; i <= index; i++) {
        buffer += "/" + this.trail[i];
      }
      buffer = buffer.substr(1, buffer.length);
    }*/
  }
};
</script>

<style lang="scss" scoped>
span {
  &:before {
    content: "/" !important;
  }
}
</style>