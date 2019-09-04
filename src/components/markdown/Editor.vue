<template>
  <div class="editor">
    <textarea
      ref="input"
      :value="input"
      @input="update"
      spellcheck="false"
      @keydown.ctrl.83.prevent="save"
    ></textarea>
    <button class="tree" @click="toggleTree()">
      <img src="../../assets/icomoon/040-file-picture.svg" />
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    update(e) {
      this.$store.commit("fieldMarkdownSetInput", e.target.value);

      //console.log(this.$store.state);
    }
  },
  computed: {
    input() {
      return this.$store.state.fieldMarkdown.input;
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