<template>
  <div class="limit" :title="title" :class="warningClass">
    <strong>Limit:</strong>
    <span
      title="If this is turning red, increase the length to this field in your database."
    >{{ input.length }} / {{ limit }} bytes</span>
  </div>
</template>

<script>
export default {
  name: "MarkdownLimit",
  created() {
    this.$store.registerModule("field/markdown/limit", {
      namespaced: true,
      state: {
        overflow: false,
        max: 0
      },
      mutations: {
        overflow(state, value) {
          state.overflow = value;
        },
        max(state, value) {
          state.max = value;
        }
      }
    });
  },
  computed: {
    limit() {
      return 255;
      // Change later
    },
    input() {
      return this.$store.state["field/markdown/editor"].input;
    },
    overflow() {
      return this.$store.state["field/markdown/limit"].overflow;
    },
    warningClass() {
      return { danger: this.overflow };
    },
    title() {
      if (this.overflow) {
        return "Write a shorter text, or increase the length of the field in your database";
      }
      return "";
    }
  }
};
</script>

<style lang="scss" scoped>
.limit {
  cursor: default;
  user-select: none;
  span {
    &:before {
      content: " ";
    }
  }
}
</style>