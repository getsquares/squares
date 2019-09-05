<template>
  <div class="editor">
    <textarea
      ref="input"
      :value="input"
      @input="update"
      spellcheck="false"
      @keydown.ctrl.83.prevent="save()"
    ></textarea>
    <button class="tree" @click="toggleTree()">
      <img src="../../../assets/icomoon/040-file-picture.svg" />
    </button>
    {{ treeState }}
  </div>
</template>

<script>
import MethodsSave from "@/components/fields/markdown/methods/save.js";
import MethodsLoad from "@/components/fields/markdown/methods/load.js";

export default {
  components: {},
  mounted() {
    this.$refs.input.focus();
    //MethodsLoad.load(this);
    MethodsSave.saveWatch(this);
  },
  methods: {
    update(e) {
      this.$store.commit("field/markdown/editor/input", e.target.value);
      this.overflow();
      this.indicate();
    },
    indicate() {
      if (this.$store.state["field/markdown/limit"].overflow) {
        this.$store.commit("field/markdown/indicator/setType", "warning");
      } else {
        const pending = this.$store.getters["field/markdown/editor/pending"];
        const value = pending ? "pending" : "success";
        this.$store.commit("field/markdown/indicator/setType", value);
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
      this.$store.commit("field/markdown/tree/setTreeState", !this.treeState);
    }
  },
  computed: {
    input() {
      //console.log(this.$store.state);
      return this.$store.state["field/markdown/editor"].input;
    },
    treeState() {
      return this.$store.state["field/markdown/tree"].showTree;
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
    box-sizing: border-box;
  }
}
</style>