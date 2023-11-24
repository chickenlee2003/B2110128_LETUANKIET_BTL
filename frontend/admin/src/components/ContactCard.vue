<script>
export default {
  props: {
    product: { type: Object, required: true },
  },
};
</script>
<template>
  <div>
    <div class="p-1">
      <strong>Tên:</strong>
      {{ product.name }}
    </div>
    <div class="p-1">
      <strong>description:</strong>
      {{ product.description }}
    </div>
    <div class="p-1">
      <strong>price:</strong>
      {{ product.price }}
    </div>
    <div class="p-1">
      <strong>stock:</strong>
      {{ product.stock }}
    </div>
    <div class="p-1">
      <strong>note:</strong>
      {{ product.note }}
    </div>
  </div>
</template>
