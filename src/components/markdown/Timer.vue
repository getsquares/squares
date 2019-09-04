<template>
  <div class="timeago">
    <strong @click="stop()">Saved:</strong>
    {{ timeago }}
    {{ timer }}
    {{ ago }}
  </div>
</template>

<script>
export default {
  name: "MarkdownTimer",
  created() {
    this.set();
  },
  computed: {
    savedTime() {
      return this.$store.state.fieldMarkdown.savedTime;
    },
    timer() {
      return this.$store.state.fieldMarkdown.timer;
    },
    ticking() {
      return this.$store.state.fieldMarkdown.ticking;
    },
    timeago() {
      let diff = (Date.now() - this.savedTime) / 1000;
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
        result = diff % length[unit];
        if (!(diff = 0 | (diff / length[unit])))
          return result + " " + (result - 1 ? unit + "s" : unit);
      }
      return 0;
    },
    ago() {
      //let diff = (Date.now() - this.savedTime) / 1000;
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
      this.$store.commit("fieldMarkdownSetTimeObject");
    },
    stop() {
      this.$store.commit("fieldMarkdownStopTimer");
    },
    reset() {
      clearInterval(this.$store.state.fieldMarkdown.timeObject);
      this.$store.commit("fieldMarkdownResetTimer");
    }
    /*ago(val) {
      val = 0 | ((Date.now() - val) / 1000);
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
        result = val % length[unit];
        if (!(val = 0 | (val / length[unit])))
          return result + " " + (result - 1 ? unit + "s" : unit);
      }
    }*/
  }
};
</script>

<style lang="scss" scoped>
</style>