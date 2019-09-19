<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <VTable></VTable>

    <div @click="test">Click {{$store.state.boom}}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import VTable from "@/components/VTable.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    VTable
  },
  methods: {
    test() {
      this.$store.state.boom = "world";
    }
  }
};
</script>
