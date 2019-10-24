<template>
  <div class="indicator" :class="indicatorClass" @click="save()"></div>
</template>

<script>
import MethodsSave from "@/components/fields/markdown/methods/save.js";

export default {
  name: "MarkdownIndicator",
  computed: {
    indicatorClass() {
      return this.$store.state["field/markdown/editor"].indicator;
    }
  },
  methods: {
    save() {
      MethodsSave.saveNow(this);
      MethodsSave.saveRevision(this);
    }
  }
};
</script>

<style lang="scss" scoped>
.indicator {
  height: 1rem;
  width: 1rem;
  background: black;
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  margin: 0;
  border-radius: 100vh;

  &.warning {
    background: var(--color-danger);
  }
  &.success {
    background: var(--color-success);
    opacity: 1;
    animation: fadeAway 3s forwards;
  }
  &.pending {
    background: var(--color-warning);
  }
  &.spinning {
    background-color: transparent;
    background-image: url("../../../assets/icomoon/131-spinner9.svg");
    opacity: 1;
    animation: spin 2s linear infinite;
  }
}

@keyframes fadeAway {
  0% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>