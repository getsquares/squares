<template>
  <div class="location">
    <strong>Row / Column:</strong>
    {{ $route.params.id }} / {{ $route.params.column }}
  </div>
</template>

<script>
export default {
  name: "MarkdownLocation"
};
</script>