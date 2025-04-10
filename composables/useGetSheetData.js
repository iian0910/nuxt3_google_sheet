export const useGetSheetData = () => {
  const config = useRuntimeConfig()
  const apiKey = config.public.NUXT_API_KEY
  const sheetId = config.public.NUXT_SHEET_ID

  const range = "工作表1!A1:M1000";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`

  // 加上 immediate: false => 不在 composable 掛載時立即 fetch
  return useFetch(url, { immediate: false })
}