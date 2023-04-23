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
/*let subscriptionsKeys
let subscriptionsValues
let impressionsKeys
let impressionsValues
let clicksKeys
let clicksValues
let avgTimeKeys
let avgTimeValues*/



let avgTime

function getAllData(){
  axios.get(CHART_API)
  .then(response => {

    let impressions = response.data.impressions
    let clicks = response.data.clicks

    console.log('dentro la funzione impressions',impressions)
    console.log('dentro la funzione clicks',clicks)

    getAllData(impressions, clicks)
   
    return {impressions, clicks}
  })
  .catch(error => {
    console.log(error)
  })  
}

function showAllData(impressions, clicks){
  return{
    impressions: impressions,
    clicks: clicks
  } 
}

console.log(showAllData())

//const first = values.impressions
//const second = values.clicks

//console.log('fuori dalla funzione impressions', values.impressions)
//console.log('fuori dalla funzione clicks', values.clicks)

/*
  const data = {    
    labels: Object.keys(),
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: Object.values(values.clicks),
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

/*
const allData = async() => {
  
  let data
  
  try{
    const response  = await axios.get(CHART_API)

    console.log(response.data)
    data = response.data

    let tmpKeys = Object.keys(response.data)

    /*tmpKeys.forEach(el => {
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

  subscriptions = el.subscriptions.history
  impressions = el.impressions.history
  clicks = el.clicks.history
  avgTime = el.avgTime.history

  console.log(subscriptions)
  console.log(impressions)
  console.log(clicks)
  console.log(avgTime)
  
  console.log('subscriptions keys -> ',subscriptionsKeys)
  console.log('subscriptions values -> ',subscriptionsValues)
  console.log('impressions keys -> ',impressionsKeys)
  console.log('impressions values -> ',impressionsValues)
  console.log('clicks keys -> ',clicksKeys)
  console.log('clicks values -> ',clicksValues)
  console.log('avgTime keys -> ',avgTimeKeys)
  console.log('avgTime values -> ',avgTimeValues)

  return allData

}).catch((error)=>{
  console.error(error)
})

  const labels = [
    subscriptionsKeys
  ];
  */



</script>

<style scoped lang="scss"></style>