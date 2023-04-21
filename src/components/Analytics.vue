<template>
  <div class="contain">
    <p>ciao sono su analytics</p>
    <div>
      <canvas id="myChart"></canvas>
    </div>
  </div>
</template>


<script setup>

import axios from 'axios'
import Chart from 'chart.js/auto';
import { onMounted } from 'vue';

const CHART_API = import.meta.env.VITE_API_CHARTS
let subscriptionsKeys
let subscriptionsValues
let impressionsKeys
let impressionsValues
let clicksKeys
let clicksValues
let avgTimeKeys
let avgTimeValues


const allData = async() => {
  
  let data
  
  try{
    const response  = await axios.get(CHART_API)

    console.log(response.data)
    data = response.data

    let tmpKeys = Object.keys(response.data)

    tmpKeys.forEach(el => {
      console.log(el, '-' ,response.data[el])
    })

  }catch(err){
    console.log(err)
  }  
  return data
}


allData().then(el => {

  subscriptionsKeys = Object.keys(el.subscriptions.history)
  subscriptionsValues = Object.values(el.subscriptions.history)
  impressionsKeys = Object.keys(el.impressions.history)
  impressionsValues = Object.values(el.impressions.history)
  clicksKeys = Object.keys(el.clicks.history)
  clicksValues = Object.values(el.clicks.history)
  avgTimeKeys = Object.keys(el.avgTime.history)
  avgTimeValues = Object.values(el.avgTime.history)
  
  console.log('subscriptions keys -> ',subscriptionsKeys)
  console.log('subscriptions values -> ',subscriptionsValues)
  console.log('impressions keys -> ',impressionsKeys)
  console.log('impressions values -> ',impressionsValues)
  console.log('clicks keys -> ',clicksKeys)
  console.log('clicks values -> ',clicksValues)
  console.log('avgTime keys -> ',avgTimeKeys)
  console.log('avgTime values -> ',avgTimeValues)

}).catch((error)=>{
  console.error(error)
})

  const labels = [
    subscriptionsKeys
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: subscriptionsValues,
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  onMounted(() => {
    const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
  })

</script>

<style scoped lang="scss"></style>