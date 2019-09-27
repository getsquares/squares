<template>
  <div class="folders">
    <ul>
      <li @click="back()" v-show="!isRoot" :class="{ loading: foldername == '' && loading }">..</li>
      <li
        v-for="folder in folders"
        :key="folder.name"
        @click="gotoFolder(folder.name);"
        :class="{ loading: foldername == folder.name }"
      >{{ folder.name }}</li>
    </ul>
  </div>
</template>
<script>
import Axios from "axios";

export default {
  name: "BrowserFolders",
  /*created() {
    const folder = this.$store.state["field/markdown/options"].options.media
      .folder;
    if (folder && folder != "" && folder != "/") {
      this.$store.commit("field/markdown/browser/uri", folder);
    }
  },*/
  mounted() {
    this.$store.watch(
      () => this.$store.state["field/markdown/options"].loading,
      loading => {
        if (loading) return;

        this.load();
      }
    );
  },
  computed: {
    folders() {
      return this.$store.state["field/markdown/browser"].folders;
    },
    foldername() {
      return this.$store.state["field/markdown/browser"].foldername;
    },
    isRoot() {
      return this.$store.state["field/markdown/browser"].breadcrumbs == null;
    },
    loading() {
      return this.$store.state["field/markdown/browser"].loading;
    },
    uri() {
      return this.$store.state["field/markdown/browser"].uri;
    }
  },
  methods: {
    load() {
      this.$store.commit("field/markdown/browser/loading", true);
      const uri = "/fields/markdown/browse";

      Axios.get(uri, {
        params: {
          uri: this.uri
        }
      })
        .then(response => {
          this.$store.commit(
            "field/markdown/browser/files",
            response.data.files
          );
          this.$store.commit(
            "field/markdown/browser/folders",
            response.data.folders
          );

          let filename =
            response.data.current.type == "file"
              ? response.data.current.name
              : "";
          this.$store.commit("field/markdown/browser/filename", filename);
          this.$store.commit(
            "field/markdown/browser/breadcrumbs",
            response.data.breadcrumbs
          );

          this.$store.commit("field/markdown/browser/loading", false);
        })
        .catch(error => {})
        .finally(() => {});
    },
    back() {
      if (this.loading) return;

      if (this.$store.state["field/markdown/browser"].uri == "") return;

      this.$store.commit("field/markdown/browser/filename", "");
      this.$store.commit("field/markdown/browser/foldername", "");
      this.$store.commit("field/markdown/browser/back");
      this.load();
    },
    gotoFolder(name) {
      if (this.loading) return;

      this.setFoldername(name);
      this.setUri(name);
      this.$store.commit("field/markdown/editor/focus", "browser");
      this.load();
    },
    setFoldername(name) {
      this.$store.commit("field/markdown/browser/foldername", name);
    },
    setUri(name) {
      this.$store.commit("field/markdown/browser/uri", name);
    }
  }
};
</script>

<style lang="scss" scoped>
.folders {
  li {
    &:before {
      background-image: url("../../../../assets/icomoon/colored/048-folder.svg");
    }

    &.loading {
      &:before {
        background-image: url("../../../../assets/icomoon/colored/131-spinner9.svg");
        opacity: 1;
        animation: spin 2s linear infinite;
      }
    }
  }
}
</style>