<template>
  <nav class="footer">
    <MarkdownLocation v-show="!treeState"></MarkdownLocation>
    <Breadcrumbs v-show="treeState"></Breadcrumbs>
    <MarkdownTimer></MarkdownTimer>
    <MarkdownWordcount></MarkdownWordcount>
    <MarkdownImages></MarkdownImages>
    <MarkdownLimit></MarkdownLimit>
  </nav>
</template>

<script>
import MarkdownLocation from "@/components/fields/markdown/footer/Location.vue";
import MarkdownTimer from "@/components/fields/markdown/footer/Timer.vue";
import MarkdownWordcount from "@/components/fields/markdown/footer/Words.vue";
import MarkdownImages from "@/components/fields/markdown/footer/Images.vue";
import MarkdownLimit from "@/components/fields/markdown/footer/Limit.vue";
import Breadcrumbs from "@/components/fields/markdown/footer/Breadcrumbs.vue";

export default {
  name: "MarkdownFooter",
  components: {
    MarkdownWordcount,
    MarkdownImages,
    MarkdownTimer,
    MarkdownLocation,
    MarkdownLimit,
    Breadcrumbs
  },
  computed: {
    treeState() {
      return this.$store.state["field/markdown/browser"].showTree;
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