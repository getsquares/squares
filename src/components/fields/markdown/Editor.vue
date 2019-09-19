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
    ></textarea>
    <button class="tree" @click="toggleTree()">
      <img src="../../../assets/icomoon/040-file-picture.svg" />
    </button>
    {{ showTree }}
  </div>
</template>

<script>
import MethodsSave from "@/components/fields/markdown/methods/save.js";

export default {
  mounted() {
    this.$refs.input.focus();
    /*MethodsLoad.load(this);
    MethodsSave.saveWatch(this);*/
  },
  methods: {
    update(e) {
      this.$store.commit("field/markdown/editor/input", e.target.value);
      this.$store.commit("field/markdown/editor/html");
      this.overflow();
      this.indicate();
      this.wordcount();
    },
    indicate() {
      if (this.$store.state["field/markdown/limit"].overflow) {
        this.$store.commit("field/markdown/indicator/setType", "warning");
      } else {
        if (this.$store.state["field/markdown/editor"].input) {
          const pending = this.$store.getters["field/markdown/editor/pending"];
          const value = pending ? "pending" : "success";
          this.$store.commit("field/markdown/indicator/setType", value);
        }
      }
    },
    overflow() {
      const value = this.limit < this.input.length;
      this.$store.commit("field/markdown/limit/overflow", value);
    },
    save() {
      MethodsSave.saveNow(this);
    },
    toggleTree() {
      this.$store.commit("field/markdown/browser/setTreeState", !this.showTree);
    },
    wordcount() {
      this.$store.commit("field/markdown/words/wordcount", this.html);
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
    spellcheck() {
      if (!this.$store.state["field/markdown"]) return;

      if (!("editor" in this.$store.state["field/markdown"])) return;
      return this.$store.state["field/markdown/options"].options.editor
        .spellcheck;
    },
    input() {
      return this.$store.state["field/markdown/editor"].input;
    },
    html() {
      return this.$store.state["field/markdown/editor"].html;
    },
    showTree() {
      return this.$store.state["field/markdown/browser"].showTree;
    },
    limit() {
      return this.$store.state["field/markdown/limit"].max;
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

    width: 100%;
    height: 100%;

    font-family: Roboto;
    font-size: 16px;

    background: #f7f7f7;
    padding: 4rem;
    padding-right: calc(100% - 900px - 4rem);
    box-sizing: border-box;
  }
}
</style>