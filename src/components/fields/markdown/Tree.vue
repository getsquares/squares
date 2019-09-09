<template>
  <div class="tree" v-show="treeState">
    <!--
        <li @click="parent(); get();">
          ..
        </li>
        <img :src="src">
    -->
    <div class="folders">
      <ul>
        <li @click="back()" v-show="!isRoot && !loading">..</li>
        <li
          v-for="folder in folders"
          :key="folder.name"
          @click="goto(folder.name);"
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
    {{ isRoot }}
    <footer v-if="filename != ''">
      <div class="alt">
        <input type="text" spellcheck="false" @keyup="setAlt($event)" placeholder="Alt text" />
      </div>
      <div class="code">
        <div tabindex="0" spellcheck="false">![{{ alt }}]({{ trail }})</div>
      </div>
      <div class="preview"></div>
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
    isRoot() {
      const trail = this.$store.getters["field/markdown/tree/trail"];
      const level = trail.split("/").length - 1;
      return level == 0;
    }
  },
  methods: {
    load() {
      this.$store.commit("field/markdown/tree/loading", true);

      const uri = "/fields/markdown/browse";

      //uri = base + "server/api/fields/markdown/browse/?uri=/";

      console.log(this.uri);

      Axios.get(uri, {
        params: {
          uri: this.uri
        }
      })
        .then(response => {
          console.log(response);
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
          //console.log(response);
          console.log(this.$store.state);

          this.$store.commit("field/markdown/tree/loading", false);
        })
        .catch(error => {
          console.log(error);
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
    back() {
      if (this.loading) return;
      this.$store.dispatch("field/markdown/tree/back");
      this.load();
    },
    goto(name) {
      if (this.loading) return;

      this.setUri(name);
      this.load();
    },
    gotoFile(name) {
      if (this.loading) return;

      this.setFilename(name);
      //this.load();
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

  ul {
    list-style: none;

    li {
      padding: 0.5rem 1rem;
      padding-left: calc(16px + 1rem);

      display: flex;
      color: #333;
      text-decoration: none;

      background-repeat: no-repeat;
      background-size: 16px;
      background-position: 0.5rem center;

      user-select: none;

      &:hover {
        background-color: #ddd;
      }
    }
  }

  .folders {
    li {
      background-image: url("../../../assets/icomoon/048-folder.svg");
    }
  }

  .files {
    li {
      background-image: url("../../../assets/icomoon/035-file-text.svg");

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
</style>