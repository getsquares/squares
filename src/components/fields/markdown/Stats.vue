<template>
  <div class="stats" v-show="isSidebar">
    <div class="warnings">
      <h3>Warnings</h3>
      <ul>
        <li>
          <strong>Image alt tags:</strong> X/X
        </li>
        <li>
          <strong>Words:</strong> X (optimal: +3000)
        </li>
      </ul>
    </div>
    <div class="warnings">
      <h3>Formatting</h3>
      <table>
        <tbody>
          <tr>
            <th>Images</th>
            <td>{{imageCount}}</td>
          </tr>
          <tr>
            <th>Links</th>
            <td>{{linkCount}}</td>
          </tr>
        </tbody>
      </table>
      <ul>
        <li>
          <strong>Headings:</strong> 1
        </li>
        <li>
          <strong>Paragrahs:</strong> 4
        </li>
        <li>
          <strong>Lists:</strong> 4
        </li>
        <li>
          <strong>Links:</strong> 4
        </li>
        <li>
          <strong>Quotes:</strong> 4
        </li>
        <li>
          <strong>Tables:</strong> 4
        </li>
      </ul>
    </div>
    <div class="warnings">
      <h3>Other counters</h3>
      <ul>
        <li>
          <strong>h1 chars</strong> 4
        </li>
        <li>
          <strong>Sentences</strong> 4
        </li>
        <li>
          <strong>Reading time</strong> 4
        </li>
        <li>
          <strong>Characters</strong> 4
        </li>
        <li>
          <strong>Lines</strong> 4
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isSidebar() {
      return this.$store.state["field/markdown/editor"].sidebar == "stats";
    },
    imageCount() {
      return this.$store.state["field/markdown/editor"].count.images;
    },
    linkCount() {
      return this.$store.state["field/markdown/editor"].count.links;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.stats {
  width: 300px;
  background: #eee;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  font-family: roboto;
  position: relative;
  table {
    width: 100%;
    border-collapse: collapse;

    td,
    th {
      border: 1px solid #ccc;
      padding: 0.5rem;
    }

    th {
      text-align: left;
    }
  }

  ul {
    list-style: none;

    li {
      padding: 0.5rem 1rem;

      //display: flex;
      color: #333;
      text-decoration: none;

      background-repeat: no-repeat;
      background-size: 16px;
      background-position: 0.5rem center;

      user-select: none;

      &:hover {
        background-color: #ddd;
      }
    }
  }
}
</style>