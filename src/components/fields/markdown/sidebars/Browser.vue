<template>
  <div class="tree" v-if="isSidebar" @click="focus()">
    <h2>File browser</h2>
    <BrowserFolders></BrowserFolders>
    <BrowserFiles></BrowserFiles>
    <div class="layout-switch">
      <div>
        <input type="radio" name="gender" value="male" checked id="list" />
        <label for="list" @click="setLayout('list')">List</label>
      </div>
      <div>
        <input type="radio" name="gender" value="female" id="gallery" />
        <label for="gallery" @click="setLayout('gallery')">Gallery</label>
      </div>
    </div>
    <footer v-if="filename != ''">
      <BrowserAlt></BrowserAlt>
      <BrowserCode></BrowserCode>
      <BrowserPreview></BrowserPreview>
    </footer>
  </div>
</template>

<script>
import BrowserCode from "@/components/fields/markdown/sidebars/browser/Code.vue";
import BrowserAlt from "@/components/fields/markdown/sidebars/browser/Alt.vue";
import BrowserPreview from "@/components/fields/markdown/sidebars/browser/Preview.vue";
import BrowserFiles from "@/components/fields/markdown/sidebars/browser/Files.vue";
import BrowserFolders from "@/components/fields/markdown/sidebars/browser/Folders.vue";

export default {
  name: "MarkdownTree",
  components: {
    BrowserCode,
    BrowserAlt,
    BrowserPreview,
    BrowserFiles,
    BrowserFolders
  },
  updated: function() {
    this.$nextTick(function() {
      this.$store.commit("field/markdown/editor/large");
    });
  },
  computed: {
    isSidebar() {
      return this.$store.state["field/markdown/editor"].sidebar == "browser";
    },
    filename() {
      return this.$store.state["field/markdown/browser"].filename;
    }
  },
  methods: {
    focus() {
      this.$store.commit("field/markdown/editor/focus", "browser");
    },
    setLayout(layout) {
      this.$store.commit("field/markdown/options/layout", layout);
    }
  }
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
    background: var(--color-darkest);

    .layout-switch {
      margin-top: auto;
      display: flex;
      margin: 0.5rem;
      margin-top: auto;
      margin-bottom: 0;

      div {
        flex: 1;
        text-align: center;

        label {
          padding: 0.5rem 1rem;
          display: block;
          color: #ccc;
        }

        input[type="radio"] {
          display: none;
        }

        input[type="radio"]:checked + label {
          background: #000;
          border-radius: 0.25rem;
        }
      }
    }

    h2 {
      color: #ccc;
      padding: 1rem;
      padding-bottom: 0.5rem;
    }

    ul {
      list-style: none;

      li {
        padding: 0.5rem 1rem;

        display: flex;
        color: #333;
        color: #ccc;
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
          background-color: var(--color-dark-hover);
        }
      }
    }

    footer {
      //margin-top: auto;
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