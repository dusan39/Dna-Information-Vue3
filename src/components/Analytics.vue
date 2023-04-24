<template>

  <div class="chart-type-container">
    <button @click="showChart('subscriptions')">Subscriptions</button>
    <button @click="showChart('impressions')">Impressions</button>
    <button @click="showChart('clicks')">Clicks</button>
    <button @click="showChart('avgTime')">Average time</button>
  </div>

  <div class="chart-container">
    <canvas v-show="selectedChart === 'subscriptions'" id="myChartSubscriptions"></canvas>
    <canvas v-show="selectedChart === 'impressions'" id="myChartImpressions"></canvas>
    <canvas v-show="selectedChart === 'clicks'" id="myChartClicks"></canvas>
    <canvas v-show="selectedChart === 'avgTime'" id="myChartAvgTime"></canvas>
  </div>
  
</template>

<script setup>

import axios from 'axios'
import Chart from 'chart.js/auto';

const CHART_API = import.meta.env.VITE_API_CHARTS
var subscriptionsLabels = []
var subscriptionsData = []
var impressionsLabels = []
var ImpressionsData = []
var clicksLabels = []
var clicksData = []
var avgTimeLabels = []
var avgTimeData = []

let selectedChart = 'subscriptions'

const showChart = (chartString) => {
  selectedChart = chartString
  console.log(selectedChart)
}

async function getAllData(){
 
  const response = await axios.get(CHART_API)
  const subscriptions = response.data.subscriptions
  const impressions = response.data.impressions
  const clicks = response.data.clicks
  const avgTime = response.data.avgTime

   const subscriptionsKey = Object.keys(subscriptions.history)
   const subscriptionsValues = Object.values(subscriptions.history)

   const impressionsKey = Object.keys(impressions.history)
   const impressionsValues = Object.values(impressions.history)

   const clicksKey = Object.keys(clicks.history)
   const clicksValues = Object.values(clicks.history)

   const avgTimeKey = Object.keys(avgTime.history)
   const avgTimeValues = Object.values(avgTime.history)

   subscriptionsLabels = subscriptionsKey
   subscriptionsData = subscriptionsValues

   impressionsLabels = impressionsKey
   ImpressionsData = impressionsValues

   clicksLabels = clicksKey
   clicksData = clicksValues

   avgTimeLabels = avgTimeKey
   avgTimeData = avgTimeValues

}

async function createChartSubscriptions(){
  await getAllData()

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
    type: 'line',
    data: data,
    options: {}
  };

  const myChartSubscriptions = new Chart(
    document.getElementById('myChartSubscriptions'),
    config,
  );
}

async function createChartImpressions(){
  await getAllData()

  const data = {    
    labels: impressionsLabels,
    datasets: [{
      label: 'Impressions',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: ImpressionsData,
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  const myChartImpressions = new Chart(
    document.getElementById('myChartImpressions'),
    config,
  );
}

async function createChartClicks(){
  await getAllData()

  const data = {    
    labels: clicksLabels,
    datasets: [{
      label: 'Clicks',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: clicksData,
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  const myChartClicks = new Chart(
    document.getElementById('myChartClicks'),
    config,
  );
}

async function createChartAvgTime(){
  await getAllData()

  const data = {    
    labels: avgTimeLabels,
    datasets: [{
      label: 'Avg Time',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: avgTimeData,
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  const myChartavgTime = new Chart(
    document.getElementById('myChartAvgTime'),
    config,
  );
}

createChartSubscriptions()

createChartImpressions()

createChartClicks()

createChartAvgTime()

</script>

<style scoped lang="scss">

  .chart-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  
    .chart-type-container{
      display: flex;
      justify-content: space-between;
      margin-top: 3%;
    }
  }

</style>