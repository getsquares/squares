<template>
  <div class="fieldMarkdown view">
    <main>
      <MarkdownTree></MarkdownTree>
      <MarkdownEditor></MarkdownEditor>
      <MarkdownSheet></MarkdownSheet>
    </main>

    <MarkdownFooter></MarkdownFooter>
  </div>
</template>

<script>
import Axios from "axios";

import MarkdownTree from "@/components/fields/markdown/browser/Browser.vue";
import MarkdownSheet from "@/components/fields/markdown/Sheet.vue";
import MarkdownEditor from "@/components/fields/markdown/Editor.vue";
import MarkdownFooter from "@/components/fields/markdown/footer/Footer.vue";

import MethodsSave from "@/components/fields/markdown/methods/save.js";
import MethodsLoad from "@/components/fields/markdown/methods/load.js";

export default {
  name: "markdown",
  components: {
    MarkdownSheet,
    MarkdownEditor,
    MarkdownFooter,
    MarkdownTree
  },
  mounted() {
    MethodsLoad.load(this);
    MethodsSave.saveWatch(this);
    this.getOptions();
  },
  data: function() {
    return {
      input: "",
      obj: {}
      /*defaults: {
        preview: {
          delay: 300,
          css: null
        },
        editor: {
          spellcheck: false,
          width: 900
        },
        revisions: {
          path: "revisions/markdown",
          limit: 5
        },
        media: {
          path: "server-media",
          trim: null,
          folder: null
        },
        autosave: {
          save: 15,
          retry: 45,
          warning: 300,
          danger: 900
        },
        words: {
          danger: {
            min: 0,
            max: 799
          },
          warning: {
            min: 800,
            max: 1999
          },
          success: {
            min: 2000
          }
        }
      }*/
    };
  },
  methods: {
    optionsWithFallbacks(object, fallback) {
      Object.entries(fallback).forEach(([key, value]) => {
        if (value && typeof value === "object") {
          this.optionsWithFallbacks(
            (object[key] = object[key] || (Array.isArray(value) ? [] : {})),
            value
          );
        } else if (!(key in object)) {
          object[key] = value;
        }
      });
    },
    getOptions() {
      const uri = "/fields/markdown/get/options";

      Axios.get(uri)
        .then(response => {
          this.obj = response.data;
          const defaults = this.$store.state["field/markdown/options"].options;

          this.optionsWithFallbacks(this.obj, defaults);
          this.$store.commit("field/markdown/options/options", this.obj);

          const folder = this.$store.state["field/markdown/options"].options
            .media.folder;
          if (folder && folder != "" && folder != "/") {
            this.$store.commit("field/markdown/browser/uri", folder);
          }

          this.$store.commit("field/markdown/options/loading", false);

          document.documentElement.style.setProperty(
            "--markdown-editor-width",
            this.$store.state["field/markdown/options"].options.editor.width +
              "px"
          );
        })
        .catch(error => {})
        .finally(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.view {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: calc(100vh - 3rem);

  main {
    display: flex;
    overflow: hidden;
    flex: 1;
  }
}
</style>

<style lang="scss">
.fieldMarkdown {
  button {
    &.close,
    &.tree {
      position: absolute;
      top: 0;
      right: 0;
      border: none;
      padding: calc(2rem - 8px);
      padding-right: calc(2rem - 8px - 17px);
      background: transparent;
      opacity: 0.25;
      font-size: 17px;
      display: flex;
      outline: none;
      width: 64px;
      margin-right: 17px;
      display: flex;
      justify-content: center;

      &:hover {
        opacity: 1;
      }
    }
  }
  .sheet,
  .editor {
    flex: 1;
    position: relative;
  }
}
</style>