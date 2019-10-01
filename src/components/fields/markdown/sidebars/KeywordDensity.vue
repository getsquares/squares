<template>
  <div class="density">
    <h3>Word density</h3>
    <section class="marked">
      <h3>Marked words</h3>
      <template v-for="keyword in keywords">
        <div>{{ keyword }}</div>
      </template>
    </section>
    <div class="options">
      <label for="words">Words</label>
      <div class="words">
        <input type="range" min="1" max="10" class="slider" id="words" v-model="words" />
        <input type="text" v-model="words" />
      </div>
      <label for="characters">Characters</label>
      <div class="characters">
        <input type="range" min="0" max="10" class="slider" id="characters" v-model="characters" />
        <input type="text" v-model="characters" />
      </div>
      <div class="filter">
        <input type="text" placeholder="Filter" />
      </div>
    </div>
    <section class="unselected">
      <template v-for="item in density">
        <div
          @click="toggleSelected(item.word)"
          class="word"
          :key="'word-' + item.word"
          :class="activeClass(item.word)"
        >{{ item.word }}</div>
        <div class="count" :key="'count-' + item.word">{{ item.count }}</div>
      </template>
    </section>
  </div>
</template>

<script>
import Mark from "mark.js";
import KeywordDensity from "@/components/fields/markdown/methods/density.js";

export default {
  data: function() {
    return {
      words: 1,
      characters: 0
    };
  },
  destroyed() {
    console.log("destroyed");
    this.resetKeywords();
  },
  computed: {
    isSidebar() {
      return this.$store.state["field/markdown/editor"].sidebar == "density";
    },
    sanitized() {
      return this.$store.state["field/markdown/editor"].sanitized;
    },
    density() {
      let kd = new KeywordDensity({
        words: this.words,
        characters: this.characters
      });
      kd.add(this.sanitized);
      kd.toLowercase();
      kd.toAlphanumeric();
      kd.stipWhitespace();
      kd.process();

      return kd.get();
    },
    html() {
      return this.$store.state["field/markdown/editor"].html;
    },
    keywords() {
      return this.$store.state["field/markdown/editor"].densityKeywords;
    }
  },
  methods: {
    resetKeywords() {
      this.$store.commit("field/markdown/editor/densityKeywordsSet", []);
      this.$store.commit("field/markdown/editor/html");
    },
    activeClass(word) {
      return {
        active: this.keywords.includes(word)
      };
    },
    toggleSelected(word) {
      this.$store.commit("field/markdown/editor/densityKeywordToggle", word);
      this.$store.commit("field/markdown/editor/html");
    }
  }
};
</script>

<style lang="scss" scoped>
.density {
  width: 300px;
  background: var(--color-darkest);
  font-size: 14px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  font-family: roboto;
  position: relative;
  box-sizing: border-box;
  color: #ccc;

  h3 {
    padding: 1rem;
  }

  section.unselected {
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-gap: 1px;
    background: #333;
    border-top: 1px solid #333;
    border-bottom: 1px solid #333;

    > div {
      padding: 0.25rem 1rem;
      background: var(--color-darkest);
      padding: 0.5rem 1rem;
      cursor: default;

      &.word.active,
      &.word.active + div {
        background: rgba(25, 118, 210, 0.5);
        color: #fff;
      }
    }
  }
}

.options {
  padding: 0 1rem;

  label {
    display: block;
    margin-bottom: 1rem;
  }
  > * {
    display: flex;
    margin-bottom: 1rem;
    align-items: center;

    .slider {
      -webkit-appearance: none; /* Override default CSS styles */
      appearance: none;
      width: 100%; /* Full-width */
      height: 0.5rem;
      background: #555; /* Grey background */
      outline: none; /* Remove outline */
      opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
      -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
      transition: opacity 0.2s;
    }

    /* Mouse-over effects */
    .slider:hover {
      opacity: 1; /* Fully shown on mouse-over */
    }

    /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none; /* Override default look */
      appearance: none;
      width: 25px; /* Set a specific slider handle width */
      height: 25px; /* Slider handle height */
      background: #1976d2; /* Green background */
      cursor: pointer; /* Cursor on hover */
      border-radius: 100vh;
    }

    .slider::-moz-range-thumb {
      width: 25px; /* Set a specific slider handle width */
      height: 25px; /* Slider handle height */
      background: #1976d2; /* Green background */
      cursor: pointer; /* Cursor on hover */
    }

    input[type="text"] {
      background: #333;
      border: none;
      width: 2rem;
      outline: none;
      color: #ccc;
      text-align: center;
      margin-left: 1rem;
      padding: 0.25rem 0;
    }
  }
}
</style>