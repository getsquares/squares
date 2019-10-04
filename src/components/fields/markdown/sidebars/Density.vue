<template>
  <div class="density" v-if="isSidebar">
    <h2>Keyword density</h2>
    <section class="custom">
      <h3>Custom keywords</h3>
      <div class="custom-keywords">
        <input type="text" placeholder="Add keyword" spellcheck="false" />
        <button class="add"></button>
      </div>
    </section>

    <!--
    <section class="marked" v-show="keywords.length > 0">
      <template v-for="item in keywords">
        <div class="count" :key="'count-' + item.word">{{ item.count }}</div>
        <div class="word" :key="'word-' + item.word">{{ item.word }}</div>
        <div class="del" :key="'del-' + item.word" @click="del(item.word)"></div>
      </template>
    </section>
    -->

    <section class="unmarked">
      <template v-for="item in density.sorted">
        <template v-if="filtered(item.word)">
          <div class="count" :key="'count-' + item.word">{{ item.count }}</div>
          <div
            class="word"
            :key="'word-' + item.word"
            :class="activeClass(item.word)"
          >{{ item.word }}</div>

          <div class="add" :key="'add-' + item.word" @click="toggleSelected(item.word)"></div>
        </template>
      </template>
    </section>

    <div class="options">
      <label for="words">Words</label>
      <div class="words">
        <input type="range" min="1" max="10" class="slider" id="words" v-model="wordsEachRow" />
        <input type="text" v-model="wordsEachRow" />
      </div>
      <label for="characters">Characters</label>
      <div class="characters">
        <input type="range" min="0" max="10" class="slider" id="characters" v-model="characters" />
        <input type="text" v-model="characters" />
      </div>
      <div class="filter">
        <label for="filter">Filter</label>
        <input type="text" placeholder="Filter words" v-model="filter" id="filter" />
      </div>
    </div>
  </div>
</template>

<script>
import Mark from "mark.js";
import KeywordDensity from "@/components/fields/markdown/methods/density.js";

export default {
  data: function() {
    return {
      filter: "",
      wordsEachRow: 1,
      characters: 0
    };
  },
  destroyed() {
    //console.log("destroyed");
    this.resetKeywords();
  },
  computed: {
    isSidebar() {
      return this.$store.state["field/markdown/editor"].sidebar == "density";
    },
    words() {
      return this.$store.state["field/markdown/editor"].words;
    },
    density() {
      let kd = new KeywordDensity({
        words: this.wordsEachRow,
        characters: this.characters
      });
      kd.add(this.words);
      kd.toLowercase();
      kd.toAlphanumeric();
      kd.stipWhitespace();
      kd.process();

      return {
        sorted: kd.get(),
        unsorted: kd.getUnsorted()
      };
    },
    html() {
      return this.$store.state["field/markdown/editor"].html;
    },
    keywords() {
      return [];
      const keywords = this.$store.state["field/markdown/editor"]
        .densityKeywords;

      console.log(keywords);

      keywords.forEach(keyword => {
        console.log("JT");
        console.log(this.words);
        let count = this.words.split(keyword).length - 1;
        console.log(count);
      });
      /*let i = 0;
      let array_results = [];

      keywords.forEach(keyword => {
        console.log(keyword);
        console.log(this.density.unsorted[keyword]);

        array_results[i] = {
          count: this.density.unsorted[keyword],
          word: keyword
        };
        i++;
      });

      console.log(array_results);
      array_results.sort((a, b) => b.count - a.count);
      return array_results;
      return this.$store.state["field/markdown/editor"].densityKeywords;*/
    }
  },
  methods: {
    filtered(word) {
      return word.includes(this.filter);
    },
    resetKeywords() {
      this.$store.commit("field/markdown/editor/densityKeywordsSet", []);
      this.$store.commit("field/markdown/editor/html");
    },
    activeClass(word) {
      return {
        active: this.keywords.includes(word)
      };
    },
    del() {},
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

  h2 {
    padding: 1rem;
  }

  h2 {
    padding-bottom: 0;
  }

  .custom {
    margin-bottom: 1rem;
    flex: 1;
    padding: 1rem;

    h3 {
      margin-bottom: 1rem;
    }

    .custom-keywords {
      display: flex;

      button {
        background-image: url("../../../../assets/icomoon/colored/267-plus.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-position: center;
        padding: 0.5rem 1rem;
        background-color: transparent;
        border: none;
        border: 1px solid #333;

        &:hover {
          background-color: #000;
        }
      }
    }

    input[type="text"] {
      box-sizing: border-box;
      border: none;
      padding: 0.5rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      outline: none;
      width: 100%;
      background: #333;
      color: #ccc;
    }
  }

  section.marked,
  section.unmarked {
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    grid-gap: 1px;
    background-color: #333;
    border-top: 1px solid #333;
    border-bottom: 1px solid #333;

    > div {
      padding: 0.25rem 1rem;
      background: var(--color-darkest);
      padding: 0.5rem 1rem;
      cursor: default;

      &.add {
        background-image: url("../../../../assets/icomoon/colored/267-plus.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-position: center 0.5rem;

        &:hover {
          background-color: #000;
        }
      }

      &.word.active,
      &.word.active + div {
        background-color: rgba(25, 118, 210, 0.5);
        color: #fff;
      }
    }
  }

  section.marked {
    background-color: transparent;
    margin-bottom: 1rem;
    border: none;
    overflow-y: auto;

    > div {
      background: #111;
    }
  }

  section.unmarked {
    max-height: 339px;
    overflow-y: auto;
  }
}

.filter input {
  border: none;
  padding: 0.5rem;
  box-sizing: border-box;
  outline: none;
  width: 100%;
  background: #333;
  color: #ccc;
  margin-bottom: 1rem;
}

.options {
  padding: 0 1rem;
  padding-top: 1rem;

  label {
    display: block;
    margin-bottom: 1rem;
    font-weight: bold;
  }
  .words,
  .characters {
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