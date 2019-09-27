<template>
  <div class="density" v-if="isSidebar">
    <h3>Keyword density</h3>
    <section>
      <template v-for="item in density">
        <div class="word">{{ item.word }}</div>
        <div class="count">{{ item.count }}</div>
      </template>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    isSidebar() {
      return this.$store.state["field/markdown/editor"].sidebar == "density";
    },
    sanitized() {
      return this.$store.state["field/markdown/editor"].sanitized;
    },
    density() {
      let words = this.sanitized.toLowerCase();
      words = words.replace(/[^a-zA-Z0-9À-ž\s]/g, "");
      words = words.replace(/\s+/g, ' ').trim();

      let array = words.split(' ');
      let density = {};
      let results = [];

      array.forEach((item) => {
        density[item] = (typeof density[item] === 'undefined') ? 1 : density[item]+1;
      });

      let i = 0;
      for(let word in density) {
        results[i] = {
          count: density[word],
          word: word
        }
        i++;
      }

      results.sort((a, b) => b.count - a.count);
      return results;
    }
  }
}
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
  //padding: 1rem;
  box-sizing: border-box;
  color: #ccc;

  h3 {
    padding: 1rem;
  }

  section {
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-gap: 1px;
    background: #333;
    border-top: 1px solid #333;

    >div {
      padding: 0.25rem 1rem;
      background: var(--color-darkest);
      padding: 0.5rem 1rem;
    }
  }
}
</style>