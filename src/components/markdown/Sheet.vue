<template>
  <div class="sheet">
    <button class="close" @click="close()">
      <img src="../../assets/icomoon/272-cross.svg" />
    </button>
    <div class="preview" v-html="input"></div>
  </div>
</template>

<script>
import Marked from "marked";

export default {
  name: "MarkdownSheet",
  components: {
    //Marked
  },
  computed: {
    input() {
      return Marked(this.$store.state.fieldMarkdown.input);
    }
  }
};
</script>

<style lang="scss" scoped>
.preview {
  font-size: 17px;
  font-family: roboto;
  color: #333;
  overflow: auto;
  box-sizing: border-box;
  line-height: 1.5;
  overflow-wrap: break-word;
  padding: 4rem;
  height: 100%;
  overflow: auto;

  img {
    max-width: 100%;
    vertical-align: bottom;
  }

  ul,
  ol {
    padding-left: 2rem;
    margin-bottom: 1.5rem;
  }

  li ul,
  li ol {
    margin-bottom: 0;
  }

  h1 {
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.5em;
    font-family: roboto;
    margin-bottom: 1em;
  }

  h3 {
    margin-bottom: 1rem;
  }

  p,
  blockquote,
  iframe {
    font-size: 17px;
    margin-bottom: 1.5em;
  }

  a {
    color: #0366d6;
    text-decoration: none;
    text-decoration: underline;
  }

  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin-bottom: 1rem;
  }

  pre {
    background: #eee;
    padding: 1rem;
    margin-bottom: 2rem;
    overflow-x: auto;
  }

  pre code {
    padding: 0;
  }

  code {
    background: #eee;
    padding: 0 0.5rem;
  }

  blockquote {
    border-left: 0.2rem solid #eee;
    padding-left: 1rem;
    margin-bottom: 2rem;
  }

  > *:last-child {
    margin-bottom: 0;
  }
}
</style>