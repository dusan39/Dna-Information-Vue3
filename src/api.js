import axios from 'axios'

const VITE_API_CHARTS = import.meta.env.VITE_API_CHARTS
  
export async function getData(){
  try{
    const response = await axios.get(VITE_API_CHARTS)
    return response
  }catch(error){
    console.error(error)
  }      
}

async function getDataAndCallFunctions() {
  try{
    const response = await getData()
  }catch(error){
    console.error(error)
  }
}

window.addEventListener('DOMContentLoaded', () => {
  getDataAndCallFunctions()
});
