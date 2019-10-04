<template>
  <nav class="footer" :class="{ dark: sidebar != null }">
    <Breadcrumbs v-if="sidebar == 'browser' && focus == 'browser'"></Breadcrumbs>
    <template v-else>
      <div class="location">
        <strong>Row:</strong>
        {{ $route.params.id }}
      </div>
      <div class="column">
        <strong>Column:</strong>
        {{ $route.params.column }}
      </div>
      <MarkdownTimer></MarkdownTimer>
      <MarkdownWordcount></MarkdownWordcount>
      <MarkdownLimit></MarkdownLimit>
      <Alt></Alt>
    </template>
  </nav>
</template>

<script>
import MarkdownTimer from "@/components/fields/markdown/footer/Timer.vue";
import MarkdownWordcount from "@/components/fields/markdown/footer/Words.vue";
import MarkdownLimit from "@/components/fields/markdown/footer/Limit.vue";
import Breadcrumbs from "@/components/fields/markdown/footer/Breadcrumbs.vue";
import Alt from "@/components/fields/markdown/footer/Alt.vue";

export default {
  name: "MarkdownFooter",
  components: {
    MarkdownWordcount,
    MarkdownTimer,
    MarkdownLimit,
    Breadcrumbs,
    Alt
  },
  computed: {
    browserState() {
      return this.$store.state["field/markdown/browser"].browserState;
    },
    focus() {
      return this.$store.state["field/markdown/editor"].focus;
    },
    sidebar() {
      return this.$store.state["field/markdown/editor"].sidebar;
    }
  }
};
</script>

<style lang="scss">
.fieldMarkdown .footer {
  background: #eee;
  font-size: 13px;
  font-family: roboto;
  height: 3rem;
  position: fixed;
  bottom: 0;
  width: 100%;

  display: flex;
  align-items: center;
  border-top: 1px solid #ddd;
  box-sizing: border-box;

  &.dark {
    background: #373737;
    border-top: 1px solid transparent;
    color: #ccc;
  }

  > * {
    padding: 0.5rem 0.75rem;
    margin: 0 0.5rem;
    border-radius: 3px;
    user-select: none;

    strong {
      &:after {
        content: " ";
      }
    }

    &.warning,
    &.danger,
    &.success {
      color: #fff;
      strong,
      span {
        color: #fff;
      }
    }

    &.warning {
      background-color: var(--color-warning);
    }

    &.danger {
      background-color: var(--color-danger);
    }

    &.success {
      background-color: var(--color-success);
    }
  }
}
</style>