<template>
  <div class="tree" v-show="treeState">
    A{{foldername}}A
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
    <footer v-if="filename != ''">
      <div class="alt">
        <input type="text" spellcheck="false" @keyup="setAlt($event)" placeholder="Alt text" />
      </div>
      <div class="code">
        <div tabindex="0" spellcheck="false">![{{ alt }}]({{ trail }})</div>
      </div>
      <div class="preview">
        <img :src="imageUrl" />
      </div>
    </footer>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "MarkdownTree",
  mounted() {
    this.load();
  },
  computed: {
    treeState() {
      return this.$store.state["field/markdown/tree"].showTree;
    },
    folders() {
      return this.$store.state["field/markdown/tree"].folders;
    },
    filename() {
      return this.$store.state["field/markdown/tree"].filename;
    },
    foldername() {
      return this.$store.state["field/markdown/tree"].foldername;
    },
    alt() {
      return this.$store.state["field/markdown/tree"].alt;
    },
    files() {
      return this.$store.state["field/markdown/tree"].files;
    },
    uri() {
      return this.$store.state["field/markdown/tree"].uri;
    },
    loading() {
      return this.$store.state["field/markdown/tree"].loading;
    },
    trail() {
      return this.$store.getters["field/markdown/tree/trail"];
    },
    imageUrl() {
      return "/fields/markdown/get/image/?path=" + encodeURI(this.trail);
    },
    isRoot() {
      return this.$store.state["field/markdown/tree"].breadcrumbs == null;
    }
  },
  methods: {
    load() {
      this.$store.commit("field/markdown/tree/loading", true);
      const uri = "/fields/markdown/browse";

      Axios.get(uri, {
        params: {
          uri: this.uri
        }
      })
        .then(response => {
          this.$store.commit("field/markdown/tree/files", response.data.files);
          this.$store.commit(
            "field/markdown/tree/folders",
            response.data.folders
          );

          let filename =
            response.data.current.type == "file"
              ? response.data.current.name
              : "";
          this.$store.commit("field/markdown/tree/filename", filename);
          this.$store.commit(
            "field/markdown/tree/breadcrumbs",
            response.data.breadcrumbs
          );

          this.$store.commit("field/markdown/tree/loading", false);
        })
        .catch(error => {
          //console.log(error);
        })
        .finally(() => {});
    },
    setUri(name) {
      this.$store.commit("field/markdown/tree/uri", name);
    },
    setFilename(name) {
      this.$store.commit("field/markdown/tree/filename", name);
    },
    setAlt(e) {
      this.$store.commit("field/markdown/tree/alt", e.target.value);
    },
    setFoldername(name) {
      this.$store.commit("field/markdown/tree/foldername", name);
    },
    back() {
      if (this.loading) return;
      this.$store.dispatch("field/markdown/tree/back");
      this.load();
    },
    gotoFolder(name) {
      if (this.loading) return;

      this.setFoldername(name);

      this.setUri(name);
      this.load();
    },
    gotoFile(name) {
      if (this.loading) return;

      this.setFilename(name);
    }
  }
};
</script>

<style lang="scss" scoped>
.tree {
  width: 300px;
  background: #eee;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  font-family: roboto;
  position: relative;

  ul {
    list-style: none;

    li {
      padding: 0.5rem 1rem;

      display: flex;
      color: #333;
      text-decoration: none;

      background-repeat: no-repeat;
      background-size: 16px;
      background-position: 0.5rem center;

      user-select: none;

      &:before {
        content: "";
        width: 1rem;
        height: 1rem;

        background-repeat: no-repeat;
        background-size: 16px;
        margin-right: 0.5rem;
      }

      &:hover {
        background-color: #ddd;
      }
    }
  }

  .folders {
    li {
      &:before {
        background-image: url("../../../assets/icomoon/048-folder.svg");
      }

      &.loading {
        &:before {
          background-image: url("../../../assets/icomoon/131-spinner9.svg");
          opacity: 1;
          animation: spin 2s linear infinite;
        }
      }
    }
  }

  .files {
    li {
      &:before {
        background-image: url("../../../assets/icomoon/035-file-text.svg");
      }

      &.active {
        background-color: #ccc;
      }
    }
  }

  footer {
    margin-top: auto;

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
  }
}

.indicator {
  height: 8px;
  width: 8px;
  background: black;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  margin: 0;
  border-radius: 100vh;

  &.spinning {
    background-color: transparent;
    background-image: url("../../../assets/icomoon/131-spinner9.svg");
    opacity: 1;
    animation: spin 2s linear infinite;
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>