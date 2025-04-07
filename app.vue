<template>
  <div>
    <button class="btn" @click="initSheetContent">Get Ticket Data</button>
    <div class="ticket" v-for="(ticket, index) in sheetData" :key="index">
      <div class="logo">LOGO</div>
      <div class="info">
        <div class="main">
          <div class="passenger">{{ ticket.LASTNAME }} / {{ticket.FIRSTNAME}} {{ ticket.GENDER }}</div>
          <div class="flyInfo">
            <div>
              <p class="title">FLIGHT</p>
              <p class="importantInfo">{{ ticket.FLIGHT }}</p>
              <p class="title">ROUTE</p>
              <p class="normalInfo">{{ ticket.ROUTE1 }} > {{ ticket.ROUTE2 }}</p>
            </div>
            <div>
              <p class="title">BOARDING TIME</p>
              <p class="importantInfo">{{ ticket.BORADINGTIME }}</p>
              <p class="title">DATE</p>
              <p class="normalInfo">{{ ticket.DATE }}</p>
            </div>
            <div>
              <p class="title">GATE</p>
              <p class="importantInfo">{{ ticket.GATE }}</p>
              <p class="title">DEPARTURE</p>
              <p class="normalInfo">{{ ticket.DEPARTURE }}</p>
            </div>
            <div>
              <p class="title">SEAT</p>
              <p class="importantInfo">{{ ticket.SEAT }}</p>
              <p class="title">TERMINAL</p>
              <p class="normalInfo">{{ ticket.TERMINAL }}</p>
            </div>
          </div>
          <div class="note">PLEASE BE AT THE BOARDING GATE 30 MINS PRIOR TO DEPARTURE. GATE CLOSES 10 MINS BEFORE.</div>
        </div>
        <div class="stub">Stub</div>
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
    const range = "工作表1!A1:L1000";
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
</script>

<style scoped>
.btn {
  margin-bottom: 20px;
}
.ticket {
  width: 800px;
  border: 1px solid gray;
  padding: 20px 30px;
}
.logo {
  margin-bottom: 10px;
}
.info {
  display: flex;
}
.passenger {
  margin-bottom: 20px;
}
.main {
  width: 75%;
  padding-left: 20px;
  padding-right: 10px;
  border-right: 1px solid gray;
}
.stub {
  padding-left: 10px;
}
.flyInfo {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
}
.title {
  font-family: 'roboto';
  font-weight: 100;
  font-size: 12px;
}
.normalInfo {
  font-family: 'roboto';
  margin: 10px 0;
  font-size: 20px;
  font-weight: bold;
}
.importantInfo {
  font-family: 'roboto';
  margin: 10px 0;
  font-size: 36px;
  font-weight: bold;
}
.note {
  font-family: 'Roboto Mono';
  font-weight: bold;
}
</style>
