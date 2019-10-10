<template>
  <div class="fieldMarkdown view">
    <main>
      <Pane></Pane>
      <Selector></Selector>
      <Browser></Browser>
      <Stats></Stats>
      <Toc></Toc>
      <Density></Density>
      <Links></Links>
      <Editor></Editor>
      <Sheet></Sheet>
    </main>

    <Footer></Footer>
  </div>
</template>

<script>
import Axios from "axios";

import Sheet from "@/components/fields/markdown/Sheet.vue";
import Editor from "@/components/fields/markdown/Editor.vue";
import Footer from "@/components/fields/markdown/footer/Footer.vue";

import Pane from "@/components/fields/markdown/Pane.vue";

import Toc from "@/components/fields/markdown/sidebars/Toc.vue";
import Stats from "@/components/fields/markdown/sidebars/Stats.vue";
import Selector from "@/components/fields/markdown/sidebars/Selector.vue";
import Browser from "@/components/fields/markdown/sidebars/Browser.vue";
import Density from "@/components/fields/markdown/sidebars/Density.vue";
import Links from "@/components/fields/markdown/sidebars/Links.vue";

import MethodsSave from "@/components/fields/markdown/methods/save.js";
import MethodsLoad from "@/components/fields/markdown/methods/load.js";

export default {
  name: "markdown",
  components: {
    Sheet,
    Editor,
    Footer,
    Browser,
    Selector,
    Stats,
    Pane,
    Toc,
    Density,
    Links
  },
  watch: {
    $route(to, from) {
      MethodsLoad.load(this);
    }
  },
  mounted() {
    MethodsLoad.load(this);
    MethodsSave.saveWatch(this);
    this.getOptions();
  },
  data: function() {
    return {
      obj: {}
    };
  },
  computed: {
    sidebar() {
      return this.$store.state["field/markdown/editor"].sidebar;
    }
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
        .catch()
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
    &.action-close {
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
      width: calc(64px - 17px);
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