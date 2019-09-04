<template>
  <nav class="footer">
    <MarkdownLocation></MarkdownLocation>
    <MarkdownTimer></MarkdownTimer>
    <MarkdownCounters></MarkdownCounters>
    <MarkdownLimit></MarkdownLimit>
  </nav>
</template>

<script>
import MarkdownLocation from "@/components/markdown/Location.vue";
import MarkdownTimer from "@/components/markdown/Timer.vue";
import MarkdownCounters from "@/components/markdown/Counters.vue";
import MarkdownLimit from "@/components/markdown/Limit.vue";

export default {
  name: "MarkdownFooter",
  components: {
    MarkdownCounters,
    MarkdownTimer,
    MarkdownLocation,
    MarkdownLimit
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