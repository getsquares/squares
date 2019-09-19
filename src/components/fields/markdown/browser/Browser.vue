<template>
  <div class="tree" v-show="treeState">
    <BrowserFolders></BrowserFolders>
    <BrowserFiles></BrowserFiles>
    <footer v-if="filename != ''">
      <BrowserAlt></BrowserAlt>
      <BrowserCode></BrowserCode>
      <BrowserPreview></BrowserPreview>
    </footer>
  </div>
</template>

<script>
import BrowserCode from "@/components/fields/markdown/browser/Code.vue";
import BrowserAlt from "@/components/fields/markdown/browser/Alt.vue";
import BrowserPreview from "@/components/fields/markdown/browser/Preview.vue";
import BrowserFiles from "@/components/fields/markdown/browser/Files.vue";
import BrowserFolders from "@/components/fields/markdown/browser/Folders.vue";

export default {
  name: "MarkdownTree",
  components: {
    BrowserCode,
    BrowserAlt,
    BrowserPreview,
    BrowserFiles,
    BrowserFolders
  },
  computed: {
    treeState() {
      return this.$store.state["field/markdown/browser"].showTree;
    },
    filename() {
      return this.$store.state["field/markdown/files"].filename;
    }
  },
  methods: {}
};
</script>

<style lang="scss">
.fieldMarkdown {
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

    footer {
      margin-top: auto;
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
        background-image: url("../../../../assets/icomoon/131-spinner9.svg");
        opacity: 1;
        animation: spin 2s linear infinite;
      }
    }

    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>