<template>
  <div class="fieldMarkdown view">
    <main>
      <!--
      <file-browser v-show="tree" @loaded="hasLoaded($event)"></file-browser>
      -->
      <MarkdownEditor></MarkdownEditor>

      <!--
      <markdown-indicator :savingState="savingState"></markdown-indicator>
      -->
      <MarkdownSheet></MarkdownSheet>
    </main>

    <MarkdownFooter></MarkdownFooter>

    <!--
      <ul v-show="!tree">
        <v-table-location></v-table-location>
        <v-cell-target></v-cell-target>
      </ul>
      <ul v-show="tree" class="field-markdown-breadcrumbs">
        <li>{{ trail }}</li>
      </ul>
      <ul style="justify-self: center; display: flex; justify-content: center;">
        <markdown-timeago :lastSave="lastSave" :timer="timer"></markdown-timeago>
      </ul>
    -->
  </div>
</template>

<script>
import MarkdownSheet from "@/components/markdown/Sheet.vue";
import MarkdownEditor from "@/components/markdown/Editor.vue";
import MarkdownFooter from "@/components/markdown/Footer.vue";

export default {
  name: "markdown",
  components: {
    MarkdownSheet,
    MarkdownEditor,
    MarkdownFooter
  },
  data: function() {
    return {
      input: ""
    };
  },
  created() {
    // eslint-disable-next-line
    console.log("oki");

    // eslint-disable-next-line
    console.log(process.env.VUE_APP_ROOT_API);

    this.$store.registerModule("fieldMarkdown", {
      state: {
        well: "fine",
        timer: 0,
        ticking: true,
        input: "",
        buffer: "",
        timeObject: null,
        savedTime: Date.now(),
        lastSaveText: "init",
        saving: false,
        error: false,
        tree: false,
        breadcrumbs: [],
        filename: "",
        uri: "",
        alt: "",
        files: [],
        folders: [],
        params: []
      },
      mutations: {
        fieldMarkdownSetInput(state, value) {
          state.input = value;
        },
        fieldMarkdownAddTimer(state) {
          state.timer++;
        },
        fieldMarkdownStopTimer(state) {
          state.ticking = false;
        },
        fieldMarkdownResetTimer(state) {
          state.ticking = true;
          state.timer = 0;
        },
        fieldMarkdownSetTimeObject(state) {
          clearInterval(state.timeObject);
          state.timeObject = setInterval(() => {
            if (!state.ticking) return;
            state.timer++;
          }, 1000);
        }
      }
    });

    // eslint-disable-next-line
    console.log(this.$store);
  },
  methods: {
    test() {
      this.$store.state.boom = "world";
      /*console.log(window.parent);
      console.log(window.location.href);*/
    }
  }
};
</script>

<style lang="scss" scoped>
.view {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;

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