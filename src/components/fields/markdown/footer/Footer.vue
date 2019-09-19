<template>
  <nav class="footer">
    <Breadcrumbs v-if="focus == 'browser'"></Breadcrumbs>
    <template v-if="focus == 'editor'">
      <MarkdownLocation></MarkdownLocation>
      <MarkdownTimer></MarkdownTimer>
      <MarkdownWordcount></MarkdownWordcount>
      <Chars></Chars>
      <MarkdownImages></MarkdownImages>
      <MarkdownLimit></MarkdownLimit>
    </template>
  </nav>
</template>

<script>
import MarkdownLocation from "@/components/fields/markdown/footer/Location.vue";
import MarkdownTimer from "@/components/fields/markdown/footer/Timer.vue";
import MarkdownWordcount from "@/components/fields/markdown/footer/Words.vue";
import MarkdownImages from "@/components/fields/markdown/footer/Images.vue";
import MarkdownLimit from "@/components/fields/markdown/footer/Limit.vue";
import Breadcrumbs from "@/components/fields/markdown/footer/Breadcrumbs.vue";
import Chars from "@/components/fields/markdown/footer/Chars.vue";

export default {
  name: "MarkdownFooter",
  components: {
    MarkdownWordcount,
    MarkdownImages,
    MarkdownTimer,
    MarkdownLocation,
    MarkdownLimit,
    Breadcrumbs,
    Chars
  },
  computed: {
    browserState() {
      return this.$store.state["field/markdown/browser"].browserState;
    },
    focus() {
      return this.$store.state["field/markdown/editor"].focus;
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

  > * {
    padding: 0.5rem 0.75rem;
    margin: 0 0.5rem;
    border-radius: 3px;
    user-select: none;

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