<template>
  <div class="timeago" :class="warningClass">
    <strong>Saved:</strong>
    {{ ago }}
  </div>
</template>

<script>
export default {
  name: "MarkdownTimer",
  created() {
    this.$store.registerModule("field/markdown/timer", {
      namespaced: true,
      state: {
        timeObject: null,
        durationObject: null,
        timer: 0,
        duration: 0
      },
      mutations: {
        timerSet(state) {
          clearInterval(state.timeObject);
          state.timeObject = setInterval(() => {
            state.timer++;
          }, 1000);
        },
        timerApppend(state) {
          state.timer++;
        },
        timerReset(state) {
          state.timer = 0;
        },
        durationSet(state) {
          clearInterval(state.durationObject);
          state.durationObject = setInterval(() => {
            state.duration++;
          }, 1000);
        },
        durationAppend(state) {
          state.duration++;
        },
        durationReset(state) {
          state.duration = 0;
        }
      }
    });
  },
  mounted() {
    this.set();
  },
  computed: {
    warningClass() {
      if (!("autosave" in this.options)) return;

      let class_obj = "";

      if (this.timer >= this.options.autosave.danger) {
        class_obj = { danger: true };
      } else if (this.timer >= this.options.autosave.warning) {
        class_obj = { warning: true };
      }

      return class_obj;
    },
    options() {
      return this.$store.state["field/markdown/editor"].options;
    },
    state() {
      return this.$store.state["field/markdown/timer"];
    },
    timer() {
      return this.state.timer;
    },
    duration() {
      return this.$store.state["field/markdown/timer"].duration;
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
      this.$store.commit("field/markdown/timer/timerSet");
      this.$store.commit("field/markdown/timer/durationSet");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>