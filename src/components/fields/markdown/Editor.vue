<template>
  <div class="editor">
    <textarea
      ref="input"
      :value="input"
      @input="update"
      :spellcheck="spellcheck"
      @keydown.ctrl.83.prevent="save()"
      @keydown.tab.shift.prevent
      @keydown.tab.exact.prevent="tabRight($event)"
      @focus="setFocus"
      :class="editorClass"
    ></textarea>
    <button class="action-browser" @click="toggleSidebar('browser')" title="Image file browser">
      <img src="../../../assets/icomoon/040-file-picture.svg" />
    </button>

    <button class="action-rows" @click="toggleSidebar('selector')" title="Select row">
      <img src="../../../assets/icomoon/101-database.svg" />
    </button>

    <button class="action-stats" @click="toggleSidebar('stats')" title="Statistics">
      <img src="../../../assets/icomoon/156-stats-dots.svg" />
    </button>
  </div>
</template>

<script>
import MethodsSave from "@/components/fields/markdown/methods/save.js";

export default {
  mounted() {
    this.$refs.input.focus();
    window.addEventListener("resize", () => {
      this.$store.commit("field/markdown/editor/large");
    });

    this.$store.commit("field/markdown/editor/large");
  },
  data: function() {
    return {
      canMove: true
    };
  },
  methods: {
    update(e) {
      if (!this.canMove) return;
      this.canMove = false;
      setTimeout(() => {
        this.canMove = true;
      }, this.options.preview.delay);

      this.$store.commit("field/markdown/editor/input", e.target.value);
      this.$store.commit("field/markdown/editor/html");
      this.$store.commit("field/markdown/editor/sanitize", this.html);
      this.indicate();
      this.wordcount();
    },
    indicate() {
      if (this.$store.state["field/markdown/editor"].overflow) {
        this.$store.commit("field/markdown/editor/indicator", "warning");
      } else {
        if (this.$store.state["field/markdown/editor"].input) {
          const pending = this.$store.getters["field/markdown/editor/pending"];
          const value = pending ? "pending" : "success";
          this.$store.commit("field/markdown/editor/indicator", value);
        }
      }
    },
    save() {
      MethodsSave.saveNow(this);
    },
    /*toggleTree() {
      this.$store.commit("field/markdown/selector/selectorState", false);

      this.$store.commit(
        "field/markdown/browser/browserState",
        !this.browserState
      );
    },
    toggleSelector() {
      this.$store.commit("field/markdown/browser/browserState", false);

      this.$store.commit(
        "field/markdown/selector/selectorState",
        !this.selectorState
      );
    },*/
    toggleSidebar(value) {
      this.$store.commit("field/markdown/editor/sidebarToggle", value);
    },
    wordcount() {
      this.$store.commit("field/markdown/editor/wordcount");
    },
    setFocus() {
      this.$store.commit("field/markdown/editor/focus", "editor");
    },
    tabRight(event) {
      let text = this.input,
        originalSelectionStart = event.target.selectionStart,
        textStart = text.slice(0, originalSelectionStart),
        textEnd = text.slice(originalSelectionStart);

      this.$store.commit(
        "field/markdown/editor/input",
        `${textStart}\t${textEnd}`
      );
      event.target.value = this.input; // required to make the cursor stay in place.
      event.target.selectionEnd = event.target.selectionStart =
        originalSelectionStart + 1;
    }
  },
  computed: {
    editorClass() {
      return {
        large: this.$store.state["field/markdown/editor"].large
      };
    },
    spellcheck() {
      return this.options.editor.spellcheck;
    },
    options() {
      return this.$store.state["field/markdown/options"].options;
    },
    input() {
      return this.$store.state["field/markdown/editor"].input;
    },
    html() {
      return this.$store.state["field/markdown/editor"].html;
    },
    browserState() {
      return this.$store.state["field/markdown/browser"].browserState;
    },
    selectorState() {
      return this.$store.state["field/markdown/selector"].selectorState;
    },
    limit() {
      return this.$store.state["field/markdown/editor"].limit;
    }
  }
};
</script>

<style lang="scss" scoped>
.editor {
  textarea {
    resize: none;
    border: none;
    outline: none;
    overflow-y: auto;

    width: 100%;
    height: 100%;

    font-family: Roboto;
    font-size: 16px;

    background: #f7f7f7;
    padding: 4rem;
    box-sizing: border-box;

    &.large {
      padding-right: calc(100% - var(--markdown-editor-width));
    }
  }
}
</style>