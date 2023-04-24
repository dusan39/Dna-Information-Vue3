<template>

  <!--
    <canvas id="myChartImpressions"></canvas>
    <canvas id="myChartClicks"></canvas>
    <canvas id="myChartAvgTime"></canvas>
   -->

  <div class="subscriptions-container">
    <canvas id="myChartSubscriptions"></canvas>

    <div class="chart-type-container">
      <button>Impressions</button>
      <button>Clicks</button>
      <button>Average time</button>
      <button>Clicks</button>
    </div>
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

async function getSubscriptions(){
 
  const response = await axios.get(CHART_API)
  const subscriptions = response.data.subscriptions
 /* const impressions = response.data.impressions
  const clicks = response.data.clicks
  const avgTime = response.data.avgTime*/

   const subscriptionsKey = Object.keys(subscriptions.history)
   const subscriptionsValues = Object.values(subscriptions.history)

   subscriptionsLabels = subscriptionsKey
   subscriptionsData = subscriptionsValues

/*   const impressionsKey = Object.keys(impressions.history)
   const impressionsValues = Object.values(impressions.history)

   const clicksKey = Object.keys(clicks.history)
   const clicksValues = Object.values(clicks.history)

   const avgTimeKey = Object.keys(avgTime.history)
   const avgTimeValues = Object.values(avgTime.history)*/



/*   impressionsLabels = impressionsKey
   ImpressionsData = impressionsValues

   clicksLabels = clicksKey
   clicksData = clicksValues

   avgTimeLabels = avgTimeKey
   avgTimeData = avgTimeValues
*/
}

async function createChartSubscriptions(){
  await getSubscriptions()

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

  const myChartSubscriptions = new Chart(
    document.getElementById('myChartSubscriptions'),
    config,
  );
}

createChartSubscriptions()

</script>

<style scoped lang="scss">

  .subscriptions-container{
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