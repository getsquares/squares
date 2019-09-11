<template>
  <div class="timeago">
    <strong>Saved:</strong>
    {{ ago }}
    {{ $store.state['field/markdown/timer'].duration }}
  </div>
</template>

<script>
export default {
  name: "MarkdownTimer",
  mounted() {
    this.set();
  },
  computed: {
    state() {
      return this.$store.state["field/markdown/timer"];
    },
    timer() {
      return this.state.timer;
    },
    /*ticking() {
      return this.state.ticking;
    },*/
    ago() {
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
          return result + " " + (result - 1 ? unit + "s" : unit);
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