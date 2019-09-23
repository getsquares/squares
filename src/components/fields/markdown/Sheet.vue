<template>
  <div class="sheet">
    <button class="action-close" @click="close()">
      <img src="../../../assets/icomoon/272-cross.svg" />
    </button>
    <div class="preview-wrap">
      <div v-html="html" class="preview" :class="previewClass"></div>
    </div>
    <MarkdownIndicator></MarkdownIndicator>
  </div>
</template>

<script>
import Marked from "marked";
import MarkdownIndicator from "@/components/fields/markdown/Indicator.vue";

export default {
  name: "MarkdownSheet",
  components: {
    MarkdownIndicator
  },
  computed: {
    html() {
      return this.$store.state["field/markdown/editor"].html;
    },
    input() {
      const renderer = new Marked.Renderer();
      const baseUrl = "/fields/markdown/get/image?path=";

      const originalRendererLink = renderer.link.bind(renderer);
      const originalRendererImage = renderer.image.bind(renderer);

      renderer.link = (href, title, text) => {
        href = baseUrl + href;
        return originalRendererLink(href, title, text);
      };

      renderer.image = (href, title, text) => {
        href = baseUrl + href;
        return originalRendererImage(href, title, text);
      };

      let marked = Marked(this.$store.state["field/markdown/editor"].input, {
        renderer
      });

      return marked;
    },
    options() {
      return this.$store.state["field/markdown/options"].options;
    },
    css() {
      if (!this.$store.state["field/markdown/editor"]) return;
      if (!("options" in this.$store.state["field/markdown/editor"])) return;
      if (!("preview" in this.$store.state["field/markdown/options"].options))
        return;
      return this.$store.state["field/markdown/options"].options.preview.css;
    },
    previewClass() {
      return {
        default: !this.css
      };
    }
  },
  methods: {
    replaceAll(str, find, replace) {
      return str.replace(new RegExp(find, "g"), replace);
    }
  }
};
</script>

<style lang="scss">
.fieldMarkdown {
  .sheet {
    overflow-x: auto;
  }
  .preview-wrap {
    height: 100%;
    overflow-y: auto;
    height: calc(100% - 8rem);
    padding: 4rem;
  }
  .preview.custom {
    @import "https://example.com/css";
  }
  .preview.default {
    font-size: 17px;
    font-family: roboto;
    color: #333;
    box-sizing: border-box;
    line-height: 1.5;
    overflow-wrap: break-word;
    max-width: var(--markdown-editor-width);

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
      background: red;
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
}
</style>