<template>
  <div class="fieldMarkdown view">
    <main>
      <!--
      <file-browser v-show="tree" @loaded="hasLoaded($event)"></file-browser>
      -->
      <MarkdownTree></MarkdownTree>
      <MarkdownEditor></MarkdownEditor>
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
    -->
  </div>
</template>

<script>
import MarkdownTree from "@/components/fields/markdown/Tree.vue";
import MarkdownSheet from "@/components/fields/markdown/Sheet.vue";
import MarkdownEditor from "@/components/fields/markdown/Editor.vue";
import MarkdownFooter from "@/components/fields/markdown/Footer.vue";

export default {
  name: "markdown",
  components: {
    MarkdownSheet,
    MarkdownEditor,
    MarkdownFooter,
    MarkdownTree
  },
  data: function() {
    return {
      input: ""
    };
  },
  created() {
    // eslint-disable-next-line
    console.log(process.env.VUE_APP_ROOT_API);

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
  methods: {}
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