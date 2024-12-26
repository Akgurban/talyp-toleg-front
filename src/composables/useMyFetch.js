import { ref, watchEffect, toValue } from 'vue'
import { useRouter } from 'vue-router'
import { BASE_URL } from './constants'
const baseUrl=BASE_URL()


export async function useMyFetch(url, options) {
  const data = ref(null)
  const error = ref(null)
  const myHeaders = new Headers();
  if(JSON.parse(localStorage.getItem('userData'))?.token){
    myHeaders.append("Authorization", JSON.parse(localStorage.getItem('userData'))?.token)
  }
  options.headers=myHeaders
  
  await fetch(toValue(`${baseUrl}${url}`), options)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

if (data.value?.err_msg) {
error.value=data.value?.err_msg
  // errorToast()
}
  return { data, error }
}

// export async function errorToast  ()  {

// useToast().add({
//     severity: "error",
//     summary: "Info",
//     detail: "Ýalňyşlyk ýüze çykdy",
//     life: 3000,
//   });
// };
export function reverseAndDivideArray(arr) {
  // Step 1: Reverse the array

  // Step 2: Divide the array into subarrays of 6 elements each
  let result = []
  for (let i = 0; i < arr.length; i += Math.floor(arr.length / 5.1)) {
    result.push(arr.slice(i, i + Math.floor(arr.length / 5.1)))
  }

  return result
}
