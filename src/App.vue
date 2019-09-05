<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap");

#app {
}
* {
  margin: 0;
  padding: 0;
}

:root {
  --color-active: hsl(219, 100%, 50%);
  //--color-active-light: hsla(219, 100%, 93%);
  --color-focus: #ffffcc;
  --color-border: #ddd;
  --color-bright: #f7f7f7;

  --color-danger: #d32f2f;
  --color-danger-inverterd: #d32f2f;
  --color-header: #7b1fa2;
  --color-header-400: #ab47bc;
  --color-header-500: #9c27b0;
  --color-header-600: #8e24aa;
  --color-header-800: #6a1b9a;
  --color-header-900: #4a148c;
  --color-success: #388e3c;
  --color-active: #1976d2;
  --color-active-800: #1565c0;
  --color-active-inverted: #e6892d;
  --color-active-inverted-800: #de690c;
  --color-active-100: #bbdefb;
  --color-active-50: #e3f2fd;
  --color-warning: #f57c00;
  --color-current: #b2dfdb;
}
</style>
