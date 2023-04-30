<template>

  <div class="container-charts-button">
    <div class="chart-container">
      <canvas v-show="selectedChart === 0" id="myChartSubscriptions"></canvas>
      <canvas v-show="selectedChart === 1" id="myChartImpressions"></canvas>
      <canvas v-show="selectedChart === 2" id="myChartClicks"></canvas>
      <canvas v-show="selectedChart === 3" id="myChartAvgTime"></canvas>
    </div>

    <div class="chart-type-container">
      <div class="chart-button-container">
        <button @click="showChart(0)">Subscriptions</button>
        <h4 id="subscriptions-total"></h4>
      </div>

      <div class="chart-button-container">
        <button @click="showChart(1)">Impressions</button>
        <h4 id="impressions-total"></h4>
      </div>

      <div class="chart-button-container">
        <button @click="showChart(2)">Clicks</button>
        <h4 id="clicks-total"></h4>
      </div>
      <div v-motion-fade-visible-once class="chart-button-container">
        <button @click="showChart(3)">Average time</button>
        <h4 id="avgTime-total"></h4>
      </div>
    </div>
  </div>
  
</template>

<script setup>

  import axios from 'axios'
  import Chart from 'chart.js/auto';
  import { watch, ref } from 'vue';

  const VITE_API_CHARTS = import.meta.env.VITE_API_CHARTS

  var subscriptionsLabels = []
  var subscriptionsData = []
  var impressionsLabels = []
  var ImpressionsData = []
  var clicksLabels = []
  var clicksData = []
  var avgTimeLabels = []
  var avgTimeData = []

  let subscriptionsTotal 
  let impressionsTotal 
  let clicksTotal
  let avgTimeTotal 

  let selectedChart = ref(0)

  const showChart = (chartIndex) => {
    selectedChart.value = chartIndex
    console.log(selectedChart)
  }

  watch(() => selectedChart.value, () => {}, { deep: true });

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
    impressionsTotal = impressions.total

    const clicksKey = Object.keys(clicks.history)
    const clicksValues = Object.values(clicks.history)
    clicksTotal = clicks.total    

    const avgTimeKey = Object.keys(avgTime.history)
    const avgTimeValues = Object.values(avgTime.history)
    avgTimeTotal = avgTime.total    

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
    document.getElementById('subscriptions-total').innerHTML = 'Total: ' + subscriptionsTotal
    
    const data = {    
      labels: subscriptionsLabels,
      datasets: [{
        label: 'Subscriptions',
        backgroundColor: '#19A7CE',
        borderColor: '#19A7CE',
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
    document.getElementById('impressions-total').innerHTML = 'Total: ' + impressionsTotal

    function incrementImpressions(){
      let increment = impressionsTotal + 5
      document.getElementById('impressions-total').innerHTML = 'Total: ' + increment
      impressionsTotal = increment
    }

    const incrementDisplay = setInterval(incrementImpressions, 2000)

    const data = {    
      labels: impressionsLabels,
      datasets: [{
        label: 'Impressions',
        backgroundColor: '#19A7CE',
        borderColor: '#19A7CE',
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
    document.getElementById('clicks-total').innerHTML = 'Total: ' + clicksTotal

    const data = {    
      labels: clicksLabels,
      datasets: [{
        label: 'Clicks',
        backgroundColor: '#19A7CE',
        borderColor: '#19A7CE',
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
    document.getElementById('avgTime-total').innerHTML = 'Total: ' + avgTimeTotal

    const data = {    
      labels: avgTimeLabels,
      datasets: [{
        label: 'Avg Time',
        backgroundColor: '#19A7CE',
        borderColor: '#19A7CE',
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

<style lang="scss">

  .container-charts-button{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    
    .chart-container{
      width: 90%;
      padding: 3% 4%;
      border: solid 2px #F6F1F1;
      border-radius: 20px;
    }
  
    .chart-type-container{
      display: flex;
      justify-content: space-around;
      margin-top: 3%;

      .chart-button-container{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        
        background-color: #146C94;
        border: 2px solid #F6F1F1;
        border-radius: 20px;
        padding: 1rem 2rem;
        margin: 5px;

        button{
          cursor: pointer;
          padding: 10px 20px;
          border-radius: 10px;
          background-color: #AFD3E2;
          border: 2px solid #F6F1F1;
        }

        h4{
          color: white;
          margin-top: 10px;
          margin-bottom: 0;
        }
      }
    }
  }

  @media (max-width: 850px){

    .chart-container{
      width: 500px !important;
    }

    .chart-type-container{
      display: grid !important;
      column-gap: 30px;
      row-gap: 30px;
      grid-template-columns: 150px 150px;

      .chart-button-container{
        h4{
          text-align: center;
        }
      }
    }
  }

  @media (max-width: 550px){

    .chart-container{
      width: 350px !important;
    }

    .chart-type-container{
      display: grid !important;
      column-gap: 30px;
      row-gap: 30px;
      grid-template-columns: 150px 150px;

      .chart-button-container{
        h4{
          text-align: center;
        }
      }
    }
  }

  @media (max-width: 410px){

    .chart-container{
      width: 280px !important;
    }

    .chart-type-container{
      display: grid !important;
      column-gap: 10px;
      row-gap: 10px;
      grid-template-columns: 150px 150px;

      .chart-button-container{
        h4{
          text-align: center;
        }
      }
    }
  }
  
</style>