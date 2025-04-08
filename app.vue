<template>
  <div>
    <div class="my-6 d-flex justify-center">
      <v-btn
        color="#5865f2"
        class="mr-3" @click="initSheetContent"
      >
        機票渲染
      </v-btn>
      <v-btn
        variant="outlined"
        @click="keyIn"
      >
        輸入資料
      </v-btn>
    </div>
    <div class="ticket_content mx-auto">
      <div class="ticket px-7 mb-3" v-for="(ticket, index) in sheetData" :key="index">
        <div class="d-flex">
          <div class="main pr-3 py-5">
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
          <div class="sub pl-3 py-5">
            <!--
              first class     頭等艙
              business class  商務艙
              economy class   經濟艙
            -->
            <div class="text-h6 font-weight-bold mb-2">{{ ticket.CLASS }}</div>
            <div class="mb-5 font-weight-bold">{{ ticket.LASTNAME }} / {{ticket.FIRSTNAME}} {{ ticket.GENDER }}</div>
            <div class="d-flex justify-space-between">
              <div>
                <div>
                  <p class="text-caption">FLIGHT</p>
                  <p class="text-h4 font-weight-bold font-weight-bold my-2">{{ ticket.FLIGHT }}</p>
                </div>
                <div>
                  <p class="text-caption">GATE</p>
                  <p class="text-h4 font-weight-bold my-2">{{ ticket.GATE }}</p>
                </div>
                <div>
                  <p class="text-caption">ROUTE</p>
                  <p class="text-h6 font-weight-bold my-2">{{ ticket.ROUTE1 }} > {{ ticket.ROUTE2 }}</p>
                </div>
              </div>
              <div>
                <div>
                  <p class="text-caption">BOARDING TIME</p>
                  <p class="text-h4 font-weight-bold my-2">{{ ticket.BORADINGTIME }}</p>
                </div>
                <div>
                  <p class="text-caption">SEAT</p>
                  <p class="text-h4 font-weight-bold my-2">{{ ticket.SEAT }}</p>
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
  const config = useRuntimeConfig()
  const apiKey = config.public.NUXT_API_KEY
  const sheetId = config.public.NUXT_SHEET_ID

  const sheetData = ref([])

  onMounted(() => {
    initSheetContent()
  })

  const initSheetContent = () => {
    const range = "工作表1!A1:M1000";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        transData(data.values)
      })
      .catch((error) => console.error("Error:", error))
  }

  const transData = (data) => {
    // console.log('first')
    const keys = data[0] // 取出標題列
    const formattedData = data.slice(1).map(row => {
      return Object.fromEntries(keys.map((key, index) => [key, row[index]]))
    })

    sheetData.value = formattedData
  }

  const keyIn = () => {
    navigateTo('https://docs.google.com/spreadsheets/d/1FaS9wO-zK4kT_oAuKBo5KWaWa8_ENaMf9vA8tiDK_q0/edit?gid=0#gid=0', {
      external: true,
      open: {
        target: '_blank'
      }
    })
  }
</script>

<style scoped lang="scss">
.ticket_content {
  width: 1200px;
}
.ticket {
  border: 1px solid gray;
}
.main {
  width: 75%;
  border-right: 1px dashed gray;
}
.sub {
  width: 25%;
}
</style>
