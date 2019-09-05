<template>
  <div class="tree" v-show="treeState">
    <!--
    <div class="file-browser-breadcrumbs"></div>
    <div class="folders">
      <ul>
        <li @click="parent(); get();">
          ..
        </li>
        <li v-for="folder in folders" @click="goto(folder.name); get();">
          {{ folder.name }}
        </li>
      </ul>
    </div>
    <div class="files">
      <ul>
        <li v-for="file in files" @click="setFilename(file.name)" :class="{ active: filename == file.name }">
          {{ file.name }}
        </li>
      </ul>
    </div>
    <div class="file-browser-bottom" v-if="filename != ''">
      <div class="file-browser-alt">
        <input placeholder="Alt text" type="text" v-model="alt" spellcheck="false">
      </div>
      <div class="file-browser-code">
        <div tabindex="0" spellcheck="false">![{{ alt }}]({{ fileuri }})</div>
      </div>
      <div class="file-browser-preview">
        <img :src="src">
      </div>
    </div>
    -->
    <div class="folders">
      <ul>
        <li>gittor</li>
        <li>gittor</li>
      </ul>
    </div>
    <div class="files">
      <ul>
        <li>gittor</li>
        <li>gittor</li>
      </ul>
    </div>
    <footer>
      <div class="alt">
        <input type="text" spellcheck="false" placeholder="Alt text" />
      </div>
      <div class="code"></div>
      <div class="preview"></div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "MarkdownTree",
  computed: {
    treeState() {
      return this.$store.state["field/markdown/tree"].showTree;
    }
  }
};
</script>

<style lang="scss" scoped>
.tree {
  width: 300px;
  background: #eee;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  font-family: roboto;

  ul {
    list-style: none;

    li {
      padding: 0.5rem 1rem;
      padding-left: calc(16px + 1rem);

      display: flex;
      color: #333;
      text-decoration: none;

      background-repeat: no-repeat;
      background-size: 16px;
      background-position: 0.5rem center;

      user-select: none;

      &:hover {
        background-color: #ddd;
      }
    }
  }

  .folders {
    li {
      background-image: url("../../../assets/icomoon/048-folder.svg");
    }
  }

  .files {
    li {
      background-image: url("../../../assets/icomoon/035-file-text.svg");

      &.active {
        background-color: #ccc;
      }
    }
  }

  footer {
    margin-top: auto;

    .alt {
      padding: 0.5rem;

      input {
        border: none;
        padding: 0.5rem;
        box-sizing: border-box;
        outline: none;
        width: 100%;
      }
    }

    .code {
      padding: 0.5rem;
      padding-top: 0;

      div {
        width: 100%;
        border: none;
        resize: none;
        font-family: inherit;
        user-select: all;
        padding: 0.5rem;
        box-sizing: border-box;
        background: transparent;
        border: 2px solid #ddd;
        display: block;
        outline: none;
      }
    }
    .preview {
      padding: 0.5rem;
      padding-top: 0;
      display: flex;
      justify-content: center;

      img {
        max-width: 100%;
        max-height: 200px;
        border: 2px solid #ddd;
        box-sizing: border-box;
      }
    }
  }
}
</style>