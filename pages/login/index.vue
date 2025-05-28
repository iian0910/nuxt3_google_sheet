<template>
  <!-- <NuxtLayout name="custom"> -->
    <v-btn
      class="text-none ms-4 text-white"
      color="blue-darken-4"
      rounded="0"
      variant="flat"
      @click="navigateTo('/dashboard')"
    >
      Login
    </v-btn>
  <!-- </NuxtLayout> -->
</template>

<script setup>
definePageMeta({
  layout: 'custom'
  // layout: false
})
</script>

<style lang="scss" scoped>

</style>