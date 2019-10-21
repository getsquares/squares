<template>
  <div class="files">
    <section class="list" v-if="options.media.layout == 'list'">
      <ul>
        <li
          v-for="file in files"
          :key="file.name"
          @click="gotoFile(file.name);"
          :class="{ active: filename == file.name }"
        >{{ file.name }}</li>
      </ul>
    </section>
    <section class="gallery" v-else>
      <ul>
        <li
          v-for="file in files"
          :key="file.name"
          @click="gotoFile(file.name);"
          :class="{ active: filename == file.name }"
        >
          <img :src="imageUrl(file.name)" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "BrowserFiles",
  computed: {
    files() {
      return this.$store.state["field/markdown/browser"].files;
    },
    filename() {
      return this.$store.state["field/markdown/browser"].filename;
    },
    loading() {
      return this.$store.state["field/markdown/browser"].loading;
    },
    uri() {
      return this.$store.state["field/markdown/browser"].uri;
    },
    options() {
      return this.$store.state["field/markdown/options"].options;
    }
  },
  methods: {
    gotoFile(name) {
      if (this.loading) return;

      this.setFilename(name);
    },
    setFilename(name) {
      this.$store.commit("field/markdown/browser/filename", name);
    },
    imageUrl(filename) {
      return (
        "/fields/markdown/get/image/?path=" +
        encodeURI(this.uri + "/" + filename)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.files {
  .list {
    li {
      &:before {
        background-image: url("../../../../../assets/icomoon/colored/035-file-text.svg");
      }

      &.active,
      &.active:hover {
        background-color: #373737;
      }
    }
  }

  .gallery {
    ul {
      display: grid;
      grid-gap: 2px;
      grid-template-columns: 1fr 1fr;

      li {
        padding: 0;
        position: relative;

        &:before {
          display: none;
        }

        &:hover,
        &.active,
        &.active:hover {
          background-color: inherit;
        }

        &.active {
          &:before {
            content: "";
            display: block;
            background-image: url("../../../../../assets/icomoon/273-checkmark.svg");
            background-color: rgba(255, 255, 255, 0.5);
            background-position: center;
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            filter: invert(100%);
          }
        }

        img {
          width: 100%;
          object-fit: contain;
        }
      }
    }
  }
}
</style>