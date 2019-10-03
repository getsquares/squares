<template>
  <div class="links" v-show="isSidebar">
    <h2>Links</h2>
    <ul>
      <li v-for="option in options.links" :key="option.url">
        <a :href="option.url" target="_blank">{{ option.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    isSidebar() {
      return this.$store.state["field/markdown/editor"].sidebar == "links";
    },
    options() {
      return this.$store.state["field/markdown/options"].options;
    }
  }
};
</script>

<style lang="scss" scoped>
.links {
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
  padding: 1rem;

  h2 {
    margin-bottom: 0.5rem;
  }

  ul {
    list-style: none;

    li {
      a {
        color: #5398dd;
        text-decoration: none;
        //color: #ccc;
        padding: 0.25rem 0;
        display: block;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>