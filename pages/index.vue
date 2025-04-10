<template>
  <div class="my-6 d-flex justify-center">
    <v-btn
      color="#5865f2"
      class="mr-3"
      @click="getTicketList"
    >
      機票渲染
    </v-btn>
    <v-btn
      variant="outlined"
      @click="write"
    >
      輸入資料
    </v-btn>
  </div>
</template>

<script setup>

const router = useRouter()

const getTicketList = () => {
  router.push('/ticketList')
}

const write = () => {
  router.push('/write')
}

</script>