<template>

  <div class="chart-container">
    <canvas v-show="selectedChart === 'subscriptions'" id="myChartSubscriptions"></canvas>
    <canvas v-show="selectedChart === 'impressions'" id="myChartImpressions"></canvas>
    <canvas v-show="selectedChart === 'clicks'" id="myChartClicks"></canvas>
    <canvas v-show="selectedChart === 'avgTime'" id="myChartAvgTime"></canvas>
  </div>

  <div class="chart-type-container">
    <div class="chart-button-container">
      <button @click="showChart('subscriptions')">Subscriptions</button>
      <h4 id="subscriptions-total"></h4>
    </div>

    <div class="chart-button-container">
      <button @click="showChart('impressions')">Impressions</button>
      <h4>Total: 1000</h4>
    </div>

    <div class="chart-button-container">
      <button @click="showChart('clicks')">Clicks</button>
      <h4>Total: 1000</h4>
    </div>
    <div class="chart-button-container">
      <button @click="showChart('avgTime')">Average time</button>
      <h4>Total: 1000</h4>
    </div>
  </div>
  
</template>

<script setup>

  import axios from 'axios'
  import Chart from 'chart.js/auto';

  const VITE_API_CHARTS = import.meta.env.VITE_API_CHARTS

  let selectedChart = 'subscriptions'

  var subscriptionsLabels = []
  var subscriptionsData = []
  var impressionsLabels = []
  var ImpressionsData = []
  var clicksLabels = []
  var clicksData = []
  var avgTimeLabels = []
  var avgTimeData = []

  let subscriptionsTotal = 0

  let totalSubscriptionsLabel = document.querySelector('#subscriptions-total')
  let totalImpressionsLabel = ''
  let totalClicksLabel = ''
  let totalAvgTimeLabel = ''

  const showChart = (chartString) => {
    selectedChart = chartString
    console.log(selectedChart)
  }

  async function getAllData(){
  
    const response = await axios.get(VITE_API_CHARTS)
    const subscriptions = response.data.subscriptions
    const impressions = response.data.impressions
    const clicks = response.data.clicks
    const avgTime = response.data.avgTime

    const subscriptionsKey = Object.keys(subscriptions.history)
    const subscriptionsValues = Object.values(subscriptions.history)
    subscriptionsTotal = subscriptions.total

    const impressionsKey = Object.keys(impressions.history)
    const impressionsValues = Object.values(impressions.history)
    const impressionsTotal = impressions.total

    const clicksKey = Object.keys(clicks.history)
    const clicksValues = Object.values(clicks.history)
    const clicksTotal = clicks.total    

    const avgTimeKey = Object.keys(avgTime.history)
    const avgTimeValues = Object.values(avgTime.history)
    const avgTimeTotal = avgTime.total    

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
    console.log(subscriptionsTotal)
    totalSubscriptionsLabel.innerHTML = subscriptionsTotal

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
  
  .chart-type-container{
    display: flex;
    justify-content: space-around;
    margin-top: 3%;
    margin-bottom: 3%;

    .chart-button-container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid red;
      border-radius: 20px;
      padding: 50px 70px;

      button{
        display: flex;
        padding: 10px;
      }

      p{
        margin-bottom: 0;
      }
    }
  }

</style>