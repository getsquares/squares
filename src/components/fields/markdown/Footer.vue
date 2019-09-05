<template>
  <nav class="footer">
    <MarkdownLocation v-show="!treeState"></MarkdownLocation>
    <Breadcrumbs v-show="treeState"></Breadcrumbs>
    <MarkdownTimer></MarkdownTimer>
    <MarkdownCounters></MarkdownCounters>
    <MarkdownLimit></MarkdownLimit>
  </nav>
</template>

<script>
import MarkdownLocation from "@/components/fields/markdown/Location.vue";
import MarkdownTimer from "@/components/fields/markdown/Timer.vue";
import MarkdownCounters from "@/components/fields/markdown/Counters.vue";
import MarkdownLimit from "@/components/fields/markdown/Limit.vue";
import Breadcrumbs from "@/components/fields/markdown/Breadcrumbs.vue";

export default {
  name: "MarkdownFooter",
  components: {
    MarkdownCounters,
    MarkdownTimer,
    MarkdownLocation,
    MarkdownLimit,
    Breadcrumbs
  },
  computed: {
    treeState() {
      return this.$store.state["field/markdown/tree"].showTree;
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  background: #eee;
  font-size: 13px;
  font-family: roboto;
  padding: 5px;

  display: flex;

  > * {
    padding: 0 0.75rem;
  }
}
</style>