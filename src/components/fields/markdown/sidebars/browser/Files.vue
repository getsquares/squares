<template>
  <div class="files">
    <ul>
      <li
        v-for="file in files"
        :key="file.name"
        @click="gotoFile(file.name);"
        :class="{ active: filename == file.name }"
      >{{ file.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BrowserFiles",
  computed: {
    files() {
      return this.$store.state["field/markdown/browser"].files;
    },
    filename() {
      return this.$store.state["field/markdown/browser"].filename;
    },
    loading() {
      return this.$store.state["field/markdown/browser"].loading;
    }
  },
  methods: {
    gotoFile(name) {
      if (this.loading) return;

      this.setFilename(name);
    },
    setFilename(name) {
      this.$store.commit("field/markdown/browser/filename", name);
    }
  }
};
</script>

<style lang="scss" scoped>
.files {
  li {
    &:before {
      background-image: url("../../../../../assets/icomoon/colored/035-file-text.svg");
    }

    &.active,
    &.active:hover {
      background-color: #373737;
    }
  }
}
</style>