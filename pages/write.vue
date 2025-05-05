<template>
  <div class="my-6 d-flex justify-center">
    <v-btn
      variant="outlined"
      @click="back"
    >
      上一頁
    </v-btn>
    
  </div>
  <v-sheet class="mx-auto my-6">
    <v-form ref="form">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="firstName"
              :rules="[v => !!v || 'FirstName is required']"
              label="FIRST NAME"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="lastName"
              :rules="[v => !!v || 'Last name is required']"
              label="LAST NAME"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="gender"
              :items="genderItem"
              :rules="[v => !!v || 'Gender is required']"
              label="GENDER"
              required
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="flight"
              :rules="[v => !!v || 'Flight is required']"
              label="FLIGHT"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="boardingTime"
              :rules="[v => !!v || 'Boarding time is required']"
              label="BOARDING TIME"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="gate"
              :rules="[v => !!v || 'Gate is required']"
              label="GATE"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="seat"
              :rules="[v => !!v || 'Seat is required']"
              label="SEAT"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="fromWhere"
              :rules="[v => !!v || 'Item is required']"
              label="FORM"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="toWhere"
              :rules="[v => !!v || 'Item is required']"
              label="TO"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="date"
              :rules="[v => !!v || 'Date is required']"
              label="DATE"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="departure"
              :rules="[v => !!v || 'Departure is required']"
              label="DEPARTURE"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="terminal"
              :rules="[v => !!v || 'Terminal is required']"
              label="TERMINAL"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-select
              v-model="flightClass"
              :items="flightItem"
              :rules="[v => !!v || 'Flight class is required']"
              label="FLIGHT CLASS"
              required
            ></v-select>
          </v-col>
        </v-row>
      </v-container>

      <div class="d-flex flex-column">
        <v-btn
          class="mt-4"
          color="error"
          block
          @click="reset"
        >
          清空
        </v-btn>

        <v-btn
          class="mt-4"
          color="warning"
          block
          :disabled="isLoading"
          :loading="isLoading"
          @click="send"
        >
          送出
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>
<script setup>
  import { ref } from 'vue'

  useSeoMeta({
    title: 'google sheets api 寫入',
    ogTitle: 'google sheets api 寫入',
    description: 'google sheets api 串接執行寫入的頁面',
    ogDescription: 'google sheets api 串接執行寫入的頁面'
  })

  const form = ref()

  const genderItem = [
    'MR',
    'MS'
  ]
  const flightItem = [
    'FIRST',
    'BUSINESS',
    'ECONOMY'
  ]

  const firstName = ref('')
  const lastName = ref('')
  const gender = ref(null)
  const flight = ref('')
  const boardingTime = ref('')
  const gate = ref('')
  const seat = ref('')
  const fromWhere = ref('')
  const toWhere = ref('')
  const date = ref('')
  const departure = ref('')
  const terminal = ref('')
  const flightClass = ref(null)

  const isLoading = ref(false)

  const reset = () => {
    form.value.reset()
  }

  const send = async () => {
    isLoading.value = true

    const { valid } = await form.value.validate()

    if (valid) {
      const res = await useFetch('/api/write', {
        method: 'POST',
        body: {
          values: [
            firstName.value,
            lastName.value,
            gender.value,
            flight.value,
            boardingTime.value,
            gate.value,
            seat.value,
            fromWhere.value,
            toWhere.value,
            date.value,
            departure.value,
            terminal.value,
            flightClass.value
          ],
        },
      })

      if (res.success) {
        isLoading.value = false
        reset()
      }

      console.log(res)
    }
  }

  const router = useRouter()

  const back = () => {
    router.push('/')
  }
</script>