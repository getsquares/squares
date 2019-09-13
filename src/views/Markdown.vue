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

import MarkdownTree from "@/components/fields/markdown/Tree.vue";
import MarkdownSheet from "@/components/fields/markdown/Sheet.vue";
import MarkdownEditor from "@/components/fields/markdown/Editor.vue";
import MarkdownFooter from "@/components/fields/markdown/Footer.vue";

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
      obj: {},
      defaults: {
        preview: {
          delay: 300,
          css: null
        },
        revisions: {
          path: "revisions/markdown",
          limit: 5
        },
        media: {
          path: "server-media",
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
      }
    };
  },
  created() {
    // eslint-disable-next-line
    //console.log(process.env.VUE_APP_ROOT_API);

    this.$store.registerModule("myModule", {
      namespaced: true,
      state: {
        one: "first",
        two: "second"
      },
      mutations: {
        test(state) {
          state.one = "okk";
        }
      }
    });

    this.$store.registerModule("myModule", {
      namespaced: true,
      state: {
        one: "first",
        two: "second"
      },
      mutations: {
        test2(state) {
          state.one = "okk";
        }
      }
    });

    //console.log(this.$store);

    this.$store.registerModule("fieldMarkdown", {
      state: {
        well: "fine",
        lastSaveText: "init",
        saving: false,
        error: false,
        tree: false,
        filename: "",
        uri: "",
        params: []
      }
    });
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

      console.log("asda");

      Axios.get(uri)
        .then(response => {
          this.obj = response.data;
          this.optionsWithFallbacks(this.obj, this.defaults);
          this.$store.commit("field/markdown/editor/options", this.obj);
        })
        .catch(error => {
          //console.log("ERROR OPTIONS");
          //console.log(error);
        })
        .finally(() => {
          //this.resetTimer();
        });
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
      background: transparent;
      opacity: 0.25;
      font-size: 17px;
      display: flex;
      outline: none;

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