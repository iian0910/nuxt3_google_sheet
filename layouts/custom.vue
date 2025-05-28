<template>
  <h1>我是 Custom Layout</h1>
  <div class="container bg-cyan-lighten-4">
    <div class="main bg-white mx-auto">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
}
.main {
  width: 1200px;
  height: 100%;
}
</style>
