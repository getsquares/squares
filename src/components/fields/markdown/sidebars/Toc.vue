<template>
  <div class="toc" v-if="sidebar == 'toc'">
    <h3 class="h3">Table of contents</h3>
    <div class="list" v-if="toc.length">
      <component
        class="h"
        v-for="h, index in toc"
        :is="'h' + h.level"
        :key="index"
        :title="'h' + h.level"
      >{{ h.text }}</component>
    </div>
    <div v-else>No headings found</div>
  </div>
</template>

<script>
export default {
  computed: {
    sidebar() {
      return this.$store.state["field/markdown/editor"].sidebar;
    },
    toc() {
      return this.$store.state["field/markdown/editor"].toc;
    }
  }
};
</script>

<style lang="scss" scoped>
.toc {
  width: 300px;
  background: var(--color-darkest);
  display: flex;
  flex-direction: column;
  overflow: auto;
  font-family: roboto;
  position: relative;
  padding: 1rem;
  color: #ccc;
  box-sizing: border-box;
  line-height: 1.5;
  cursor: default;

  .h3 {
    margin-bottom: 1rem;
  }

  .list {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: 14px;
      font-weight: normal;
      display: flex;

      &:before {
        width: 20px;
        min-width: 20px;
        display: block;
        opacity: 0.5;
      }
    }

    h1 {
      &:before {
        content: "1\00a0 ";
      }
    }

    h2 {
      &:before {
        content: "2\00a0 ";
        margin-right: 1rem;
      }
    }

    h3 {
      &:before {
        content: "3\00a0 ";
        margin-right: 2rem;
      }
    }

    h4 {
      &:before {
        content: "4\00a0 ";
        margin-right: 3rem;
      }
    }

    h5 {
      &:before {
        content: "5\00a0 ";
        margin-right: 4rem;
      }
    }

    h6 {
      &:before {
        content: "6\00a0 ";
        margin-right: 5rem;
      }
    }
  }
}
</style>