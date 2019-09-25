<template>
  <div class="stats" v-show="isSidebar">
    <div>
      <h3>Elements</h3>
      <ul>
        <li>
          <div>
            <strong>Blockquote</strong>
          </div>
          <div>{{ counters.blockquotes }}</div>
        </li>
        <li>
          <div>
            <strong>Images</strong>
          </div>
          <div>{{ counters.images }}</div>
        </li>
        <li>
          <div>
            <strong>Headlines</strong>
          </div>
          <div>{{ counters.headlines }}</div>
        </li>
        <li>
          <div>
            <strong>Links</strong>
          </div>
          <div>{{ counters.links }}</div>
        </li>
        <li>
          <div>
            <strong>Lists</strong>
          </div>
          <div>{{ counters.lists }}</div>
        </li>
        <li>
          <div>
            <strong>Paragraphs</strong>
          </div>
          <div>{{ counters.paragraphs }}</div>
        </li>
        <li>
          <div>
            <strong>Tables</strong>
          </div>
          <div>{{ counters.tables }}</div>
        </li>
      </ul>
    </div>
    <div>
      <h3>Other counters</h3>
      <ul>
        <li>
          <div>
            <strong>Alt tags missing</strong>
          </div>
          <div>{{ missingAlt }}</div>
          <div>
            <img
              v-show="missingAlt != 0"
              src="../../../assets/icomoon/colored/264-warning.svg"
              title="Add alt tags on all images"
            />
          </div>
        </li>
        <li>
          <div>Bytes</div>
          <div>{{ bytes }}</div>
          <div>
            <img
              v-show="bytes > limit"
              src="../../../assets/icomoon/colored/264-warning.svg"
              :title="'Max field length: ' + limit + ' bytes'"
            />
          </div>
        </li>
        <li>
          <div>Characters</div>
          <div>{{ chars }}</div>
        </li>
        <li>
          <div>Characters h1</div>
          <div>{{ counters.h1 }}</div>
        </li>
        <li>
          <div>Lines</div>
          <div>{{ lines }}</div>
        </li>
        <li>
          <div>Reading time</div>
          <div>{{ readingtime }}</div>
        </li>
        <li>
          <div>Sentences</div>
          <div>{{ sentences }}</div>
        </li>
        <li>
          <div>Words</div>
          <div>{{ words }}</div>
        </li>
      </ul>
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

  h3 {
    margin-bottom: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;

    td,
    th {
      border: 1px solid #ccc;
      padding: 0.5rem;
      width: 50%;
      line-height: 16px;
    }

    th {
      text-align: left;
    }

    tr {
      &.warning {
        th,
        td {
          background: var(--color-warning);
          color: #fff;
        }
      }
    }

    td:nth-child(3) {
      width: 33px;
    }

    td img {
      vertical-align: bottom;
    }
  }

  ul {
    list-style: none;
    margin-bottom: 2rem;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;

    li {
      display: flex;

      div {
        padding: 0.5rem;
        flex: 1;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        background: #eee;
        white-space: nowrap;

        &:nth-child(2) {
          border-right: none;
        }

        &:nth-child(3) {
          flex: 0;
          min-width: 16px;
        }

        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>