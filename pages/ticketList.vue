<template>
  <div>
    <!-- <button @click="write">寫入 Google Sheet</button> -->
    <div class="my-6 d-flex justify-center">
      <v-btn
        variant="outlined"
        @click="back"
      >
        上一頁
      </v-btn>
    </div>
    <div class="ticket_content mx-auto">
      <div class="ticket mb-3" v-for="(ticket, index) in sheetData" :key="index">
        <div class="d-flex">
          <div class="main flex-grow-0 flex-shrink-1 pa-5">
            <div class="mb-3">
              <img src="/assets/images/logo.png" width="230"/>
            </div>
            <div class="mb-5 font-weight-bold">{{ ticket.LASTNAME }} / {{ticket.FIRSTNAME}} {{ ticket.GENDER }}</div>
            <div class="d-flex justify-space-between mb-8">
              <div>
                <p class="text-caption">FLIGHT</p>
                <p class="text-h4 font-weight-bold font-weight-bold my-2">{{ ticket.FLIGHT }}</p>
                <p class="text-caption">ROUTE</p>
                <p class="text-h6 font-weight-bold my-2">{{ ticket.ROUTE1 }} > {{ ticket.ROUTE2 }}</p>
              </div>
              <div>
                <p class="text-caption">BOARDING TIME</p>
                <p class="text-h4 font-weight-bold my-2">{{ ticket.BORADINGTIME }}</p>
                <p class="text-caption">DATE</p>
                <p class="text-h6 font-weight-bold my-2">{{ ticket.DATE }}</p>
              </div>
              <div>
                <p class="text-caption">GATE</p>
                <p class="text-h4 font-weight-bold my-2">{{ ticket.GATE }}</p>
                <p class="text-caption">DEPARTURE</p>
                <p class="text-h6 font-weight-bold my-2">{{ ticket.DEPARTURE }}</p>
              </div>
              <div>
                <p class="text-caption">SEAT</p>
                <p class="text-h4 font-weight-bold my-2">{{ ticket.SEAT }}</p>
                <p class="text-caption">TERMINAL</p>
                <p class="text-h6 font-weight-bold my-2">{{ ticket.TERMINAL }}</p>
              </div>
            </div>
            <div class="font-weight-bold">PLEASE BE AT THE BOARDING GATE 30 MINS PRIOR TO DEPARTURE. GATE CLOSES 10 MINS BEFORE.</div>
          </div>
          <div class="sub flex-grow-1 flex-shrink-0 pa-5">
            <!--
              first class     頭等艙
              business class  商務艙
              economy class   經濟艙
            -->
            <div class="text-h6 font-weight-bold mb-2">{{ ticket.CLASS }}</div>
            <div class="mb-8 font-weight-bold">{{ ticket.LASTNAME }} / {{ticket.FIRSTNAME}} {{ ticket.GENDER }}</div>
            <div class="d-flex justify-space-between">
              <div class="mr-5">
                <div>
                  <p class="text-caption">FLIGHT</p>
                  <p class="text-h6 font-weight-bold font-weight-bold my-2">{{ ticket.FLIGHT }}</p>
                </div>
                <div>
                  <p class="text-caption">GATE</p>
                  <p class="text-h6 font-weight-bold my-2">{{ ticket.GATE }}</p>
                </div>
                <div>
                  <p class="text-caption">ROUTE</p>
                  <p class="text-h6 font-weight-bold my-2">{{ ticket.ROUTE1 }} > {{ ticket.ROUTE2 }}</p>
                </div>
              </div>
              <div>
                <div>
                  <p class="text-caption">BOARDING TIME</p>
                  <p class="text-h6 font-weight-bold my-2">{{ ticket.BOARDINGTIME }}</p>
                </div>
                <div>
                  <p class="text-caption">SEAT</p>
                  <p class="text-h6 font-weight-bold my-2">{{ ticket.SEAT }}</p>
                </div>
                <div>
                  <p class="text-caption">DATE</p>
                  <p class="text-h6 font-weight-bold my-2">{{ ticket.DATE }}</p>
                </div>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const sheetData = ref([])

  onMounted(() => {
    initSheetContent()
  })

  const initSheetContent = async () => {
    const { data, error, execute } = useGetSheetData()

    await execute() // execute() 本身不會回傳資料結果，它只是觸發重新 fetch 資料

    if (error.value) {
      console.error('API 發生錯誤:', error.value)
    } else {
      transData(data.value.values)
    }
  }

  const transData = (data) => {
    const keys = data[0] // 取出標題列
    const formattedData = data.slice(1).map(row => {
      return Object.fromEntries(keys.map((key, index) => [key, row[index]]))
    })

    sheetData.value = formattedData
  }

  const router = useRouter()

  const back = () => {
    router.push('/')
  }
</script>

<style scoped lang="scss">
.ticket_content {
  width: 800px;
}
.ticket {
  border: 1px solid gray;
}
.main {
  border-right: 1px dashed gray;
}
</style>
