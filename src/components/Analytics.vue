<template>
  <div class="contain">
    <p>ciao sono su analytics</p>
    <canvas id="myChart"></canvas>
  </div>
</template>


<script setup>

import axios from 'axios'
import Chart from 'chart.js/auto';
import { onMounted } from 'vue';

const CHART_API = import.meta.env.VITE_API_CHARTS
var subscriptionsLabels = []
var subscriptionsData = []

async function createChart(){
  await getSubscriptions()

  const myChart = new Chart(document.getElementById('myChart'))

  const data = {    
    labels: subscriptionsLabels,
    datasets: [{
      label: 'Subscriptions',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: subscriptionsData,
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {}
  };
}

async function getSubscriptions(){
 
  axios.get(CHART_API)
  .then(response => {
    let subscriptions = response.data.subscriptions
    console.log(subscriptions)

    let subscriptionsKey = Object.keys(subscriptions.history)
    console.log(subscriptionsKey)

    let subscriptionsValues = Object.values(subscriptions.history)
    console.log(subscriptionsValues)

    subscriptionsLabels = subscriptionsKey
    subscriptionsData = subscriptionsValues
  })
  .catch(error => {
    console.log(error)
  })
}

createChart()

</script>

<style scoped lang="scss"></style>