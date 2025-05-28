<template>
  <h1>我是 Default Layout</h1>
  <div class="d-flex">
    <div class="side-bar bg-blue-lighten-4">
      <v-list class="bg-transparent">
        <NuxtLink to="/dashboard">首頁</NuxtLink>
      </v-list>
      <v-list class="bg-transparent">
        <NuxtLink to="/dashboard/write">輸入資料</NuxtLink>
      </v-list>
      <v-list class="bg-transparent">
        <NuxtLink to="/dashboard/ticketList">機票清單</NuxtLink>
      </v-list>
      <v-list class="bg-transparent">
        <NuxtLink to="/dashboard/changeLayout">特殊頁面</NuxtLink>
      </v-list>
    </div>
    <div class="main bg-indigo-lighten-4 flex-1-0">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.side-bar {
  width: 200px;
  height: 100vh;
}
</style>