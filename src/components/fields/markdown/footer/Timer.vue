<template>
  <div class="timeago" :class="warningClass">
    <strong>Saved:</strong>
    {{ ago }}
  </div>
</template>

<script>
export default {
  name: "MarkdownTimer",
  mounted() {
    this.set();
  },
  computed: {
    warningClass() {
      if (!this.options || !("autosave" in this.options)) return;

      let class_obj = "";

      if (this.timer >= this.options.autosave.danger) {
        class_obj = { danger: true };
      } else if (this.timer >= this.options.autosave.warning) {
        class_obj = { warning: true };
      }

      return class_obj;
    },
    options() {
      if (!this.$store.state["field/markdown/editor"]) return;
      return this.$store.state["field/markdown/options"].options;
    },
    timer() {
      return this.$store.state["field/markdown/editor"].timer;
    },
    duration() {
      return this.$store.state["field/markdown/editor"].duration;
    },
    /*ticking() {
      return this.state.ticking;
    },*/
    ago() {
      if (this.timer == 0) return "Now";

      let timer = this.timer;
      var unit,
        length = {
          second: 60,
          minute: 60,
          hour: 24,
          day: 7,
          week: 4.35,
          month: 12,
          year: 10000
        },
        result;

      for (unit in length) {
        result = timer % length[unit];
        if (!(timer = 0 | (timer / length[unit])))
          return result + " " + (result - 1 ? unit + "s" : unit) + " ago";
      }

      return 0;
    }
  },
  methods: {
    set() {
      this.$store.commit("field/markdown/editor/timerSet");
      this.$store.commit("field/markdown/editor/durationSet");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>