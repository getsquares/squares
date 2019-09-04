<template>
  <table :class="tableClass" :style="table_css">
    <VThead></VThead>
    <tbody>
      <v-tr v-for="(rowData, y) in data" :y="y" :rowData="rowData" v-bind:key="y"></v-tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "VTable"
  /*props: {
    msg: String
  }*/
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;

  a {
    outline: 10px solid red;
  }
}
a {
  color: #42b983;
}
</style>
