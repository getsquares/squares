<template>
  <div class="stats" v-if="isSidebar">
    <div>
      <h3>Elements</h3>
      <section class="two">
        <div>Blockquote</div>
        <div>{{ counters.blockquotes }}</div>
      
        <div>Images</div>
        <div>{{ counters.images }}</div>
      
        <div>Headlines</div>
        <div>{{ counters.headlines }}</div>
      
        <div>Links</div>
        <div>{{ counters.links }}</div>
      
        <div>Lists</div>
        <div>{{ counters.lists }}</div>
      
        <div>Paragraphs</div>
        <div>{{ counters.paragraphs }}</div>
      
        <div>Tables</div>
        <div>{{ counters.tables }}</div>
      </section>
    </div>
    <div>
      <h3>Misc</h3>
      <section class="three">
        <div>Alt tags missing</div>
        <div>{{ missingAlt }}</div>
        <div>
          <img
            v-show="missingAlt != 0"
            src="../../../assets/icomoon/colored/264-warning.svg"
            title="Add alt tags on all images"
          />
        </div>
    
        <div>Bytes</div>
        <div>{{ bytes }}</div>
        <div>
          <img
            v-show="bytes > limit"
            src="../../../assets/icomoon/colored/264-warning.svg"
            :title="'Max field length: ' + limit + ' bytes'"
          />
        </div>
    
        <div>Characters</div>
        <div>{{ chars }}</div>
        <div></div>

        <div>Characters h1</div>
        <div>{{ counters.h1 }}</div>
        <div></div>
    
        <div>Lines</div>
        <div>{{ lines }}</div>
        <div></div>

        <div>Reading time</div>
        <div>{{ readingtime }}</div>
        <div></div>

        <div>Sentences</div>
        <div>{{ sentences }}</div>
        <div></div>

        <div>Words</div>
        <div>{{ words }}</div>
        <div></div>
      </section>
    </div>
  </div>
</template>

<script>
import ReadingTime from "@/components/fields/markdown/methods/readingtime.js";

export default {
  computed: {
    missingAlt() {
      return this.counters.images - this.counters.alt;
    },
    isSidebar() {
      return this.$store.state["field/markdown/editor"].sidebar == "stats";
    },
    counters() {
      return this.$store.state["field/markdown/editor"].count;
    },
    chars() {
      return this.sanitized.length;
    },
    sanitized() {
      return this.$store.state["field/markdown/editor"].sanitized;
    },
    readingtime() {
      const rt = new ReadingTime(200);
      rt.set(this.words);

      return rt.time;
    },
    input() {
      return this.$store.state["field/markdown/editor"].input;
    },
    words() {
      return this.$store.state["field/markdown/editor"].wordcount;
    },
    bytes() {
      return this.input.length;
    },
    limit() {
      return this.$store.state["field/markdown/editor"].limit;
    },
    sentences() {
      const text = this.sanitized + " ";
      const count = text.split(". ").length - 1;
      return count;
    },
    lines() {
      const text = this.input;
      const count = text.split("\n").length;
      return count;
    }
  }
};
</script>

<style lang="scss" scoped>
.stats {
  width: 300px;
  background: #eee;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  font-family: roboto;
  position: relative;
  padding: 1rem;
  box-sizing: border-box;
  background: var(--color-darkest);
  color: #ccc;

  h3 {
    margin-bottom: 1rem;
  }

  section {
    display: grid;
    grid-gap: 1px;
    margin-bottom: 2rem;

    &.three {
      grid-template-columns: 1fr 1fr min-content;

      div {
        &:nth-child(3n+1) {
          font-weight: bold;
        }

        &:nth-child(3n+3) {
          padding: .5rem 0;

          img {
            padding: 0 .5rem;
          }
        }
      }
    }

    &.two {
      grid-template-columns: 1fr 1fr;

      div {
        &:nth-child(2n+1) {
          font-weight: bold;
        }
      }
    }

    div {
      white-space: nowrap;
      background: #333;
      padding: 0.5rem;
    }
  }
}
</style>