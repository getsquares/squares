<template>
  <div class="pane" :class="{ dark: sidebar != null }">
    <button
      :class="{ active: sidebar == 'browser' }"
      @click="toggleSidebar('browser')"
      title="Image Browser"
    >
      <img src="../../../assets/icomoon/040-file-picture.svg" />
    </button>
    <button
      :class="{ active: sidebar == 'selector' }"
      @click="toggleSidebar('selector')"
      title="Select row"
    >
      <img src="../../../assets/icomoon/101-database.svg" />
    </button>
    <button
      :class="{ active: sidebar == 'stats' }"
      @click="toggleSidebar('stats')"
      title="Statistics"
    >
      <img src="../../../assets/icomoon/156-stats-dots.svg" />
    </button>
    <button
      :class="{ active: sidebar == 'toc' }"
      @click="toggleSidebar('toc')"
      title="Table of Contents"
    >
      <img src="../../../assets/icomoon/354-font-size.svg" />
    </button>
    <button
      :class="{ active: sidebar == 'density' }"
      @click="toggleSidebar('density')"
      title="Keyword Density"
    >
      <img src="../../../assets/icomoon/334-sort-amount-desc.svg" />
    </button>
    <button :class="{ active: sidebar == 'links' }" @click="toggleSidebar('links')" title="Links">
      <img src="../../../assets/icomoon/204-link.svg" />
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
  width: 4rem;
  z-index: 1;

  &.dark {
    background: #323232;

    button {
      filter: invert(1);
    }
  }

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

    &:hover {
      opacity: 0.5;
    }

    &.active {
      opacity: 1;
    }
  }
}
</style>