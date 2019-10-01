<template>
  <div class="selector" v-show="isSidebar">
    <h3>Select row</h3>
    <ul>
      <li v-show="loading" class="loading">
        <div class="a">&nbsp;</div>
      </li>
      <li v-for="(row, id) in rows" :key="id" :class="activeClass(id)">
        <router-link :to="{ name: 'cell', params: { id: id } }">
          <span @click="visit($event)">{{ row }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  mounted() {
    this.$store.watch(
      () => this.$store.state["field/markdown/options"].loading,
      loading => {
        if (loading) return;

        this.load();
      }
    );
  },
  updated: function() {
    this.$nextTick(function() {
      this.$store.commit("field/markdown/editor/large");
    });
  },
  computed: {
    isSidebar() {
      return this.$store.state["field/markdown/editor"].sidebar == "selector";
    },
    rows() {
      return this.$store.state["field/markdown/selector"].rows;
    },
    loading() {
      return this.$store.state["field/markdown/selector"].loading;
    }
  },
  methods: {
    activeClass(id) {
      return {
        active: id == this.$route.params.id
      };
    },
    visit(e) {
      console.log(this.$store.state["field/markdown/editor"].indicator);
      if (
        this.$store.state["field/markdown/editor"].indicator !== "success" &&
        !confirm(
          "Content was not saved successfully. Are you sure you want to load another row?"
        )
      ) {
        e.preventDefault();
      } else {
        // LADDA
      }
      //console.log(e);
      // OM EJ SUCCESS FRÅGA FÖRST
      //e.preventDefault();
      /*console.log("visit");
      let params = this.$route.params;
      params.id = 58;
      console.log(params);
      router.push({ name: "cell", params: params });
      */
    },
    load() {
      this.$store.commit("field/markdown/selector/loading", true);
      const uri = "/fields/markdown/get/rows";

      Axios.get(uri, {
        params: {
          uri: this.uri,
          id: this.$route.params.id,
          db: this.$route.params.db,
          table: this.$route.params.table
          //column: this.$route.params.column
        }
      })
        .then(response => {
          this.$store.commit("field/markdown/selector/rows", response.data);
          this.$store.commit("field/markdown/selector/loading", false);
          /*this.$store.commit(
            "field/markdown/browser/files",
            response.data.files
          );
          this.$store.commit(
            "field/markdown/browser/folders",
            response.data.folders
          );

          let filename =
            response.data.current.type == "file"
              ? response.data.current.name
              : "";
          this.$store.commit("field/markdown/browser/filename", filename);
          this.$store.commit(
            "field/markdown/browser/breadcrumbs",
            response.data.breadcrumbs
          );

          this.$store.commit("field/markdown/browser/loading", false);*/
          console.log(response);
        })
        .catch()
        .finally(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.selector {
  width: 300px;
  background: var(--color-darkest);
  font-size: 14px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  font-family: roboto;
  position: relative;
  padding: 1rem 0;
  color: #ccc;

  h3 {
    margin-bottom: 0.75rem;
    padding: 0 1rem;
  }

  ul {
    list-style: none;

    li {
      a,
      .a {
        padding: 0.25rem 1rem;

        display: flex;
        color: #ccc;
        text-decoration: none;

        background-repeat: no-repeat;
        background-size: 16px;
        background-position: 0.5rem center;

        user-select: none;
        font-size: 13px;

        &:before {
          content: "";
          width: 1rem;
          height: 1rem;

          background-repeat: no-repeat;
          background-size: 16px;
          margin-right: 0.5rem;

          background-image: url("../../../../assets/icomoon/colored/370-table2.svg");
        }

        &:hover {
          background-color: #2d2d2d;
        }
      }

      .a {
        &:before {
          background-image: url("../../../../assets/icomoon/colored/131-spinner9.svg");
          opacity: 1;
          animation: spin 2s linear infinite;
        }
      }

      &.active {
        a {
          background-color: #373737;
        }
      }
    }
  }
}
</style>