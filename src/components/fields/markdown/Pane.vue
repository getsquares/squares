<template>
  <div class="pane">
    <button :class="{ active: sidebar == 'browser' }" @click="toggleSidebar('browser')">
      <img src="../../../assets/icomoon/040-file-picture.svg" />
    </button>
    <button :class="{ active: sidebar == 'selector' }" @click="toggleSidebar('selector')">
      <img src="../../../assets/icomoon/101-database.svg" />
    </button>
    <button :class="{ active: sidebar == 'stats' }" @click="toggleSidebar('stats')">
      <img src="../../../assets/icomoon/156-stats-dots.svg" />
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    sidebar() {
      return this.$store.state["field/markdown/editor"].sidebar;
    }
  },
  methods: {
    toggleSidebar(value) {
      this.$store.commit("field/markdown/editor/sidebarToggle", value);
    }
  }
};
</script>

<style lang="scss" scoped>
.pane {
  background: #ddd;
  background: #323232;
  width: 4rem;
  z-index: 1;

  button {
    border: none;
    padding: calc(2rem - 8px);
    background: transparent;
    opacity: 0.33;
    display: flex;
    outline: none;
    width: 4rem;
    display: flex;
    justify-content: center;
    filter: invert(1);

    &.active {
      opacity: 1;
    }
  }
}
</style>