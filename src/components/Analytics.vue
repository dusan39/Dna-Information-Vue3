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
      <div class="chart-button-container">
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
  var impressionsData = []
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
    try{
      const response = await axios.get(VITE_API_CHARTS)
      return response
    }catch(error){
      console.error(error)
    }      
  }

  async function getSubscriptionsData(response){
    const subscriptions = response.data.subscriptions
    const subscriptionsKey = Object.keys(subscriptions.history)
    const subscriptionsValues = Object.values(subscriptions.history)

    subscriptionsTotal = subscriptions.total
    subscriptionsLabels = subscriptionsKey
    subscriptionsData = subscriptionsValues

    await createChartSubscriptions()
  }

  async function getImpressionsData(response){
    const impressions = response.data.impressions
    const impressionsKey = Object.keys(impressions.history)
    const impressionsValues = Object.values(impressions.history)

    impressionsLabels = impressionsKey
    impressionsData = impressionsValues
    impressionsTotal = impressions.total

    await createChartImpressions()
  }

  async function getClicksData(response){
    const clicks = response.data.clicks
    const clicksKey = Object.keys(clicks.history)
    const clicksValues = Object.values(clicks.history)

    clicksTotal = clicks.total
    clicksLabels = clicksKey
    clicksData = clicksValues 

    await createChartClicks()
  }

  async function getAvgTimeData(response){
    const avgTime = response.data.avgTime
    const avgTimeKey = Object.keys(avgTime.history)
    const avgTimeValues = Object.values(avgTime.history)
    
    avgTimeTotal = avgTime.total
    avgTimeLabels = avgTimeKey
    avgTimeData = avgTimeValues   

    await createChartAvgTime()
  }

  async function fetchDataAndCallFunctions() {
    const response = await getAllData()
    getSubscriptionsData(response)
    getImpressionsData(response)
    getClicksData(response)
    getAvgTimeData(response)
  }

  async function createChartSubscriptions(){
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
        data: impressionsData,
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

  fetchDataAndCallFunctions()

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
          transition: all 0.3s;

          &:hover{
            border: 2px solid #AFD3E2;
            background-color: #F6F1F1;
          }
        }

        h4{
          color: white;
          margin-top: 10px;
          margin-bottom: 0;
          text-align: center;
        }
      }
    }
  }

  @media (max-width: 850px){

    .chart-container{
      width: 500px !important;
    }

    .chart-type-container{

      .chart-button-container{

        button{
          color: black;
        }
      }
    }
  }

  

  @media (max-width: 550px){

    .chart-container{
      width: 350px !important;
    }
  }

  @media (max-width: 410px){

    .chart-container{
      width: 290px !important;
    }

    .chart-type-container{
      display: grid !important;
      column-gap: 5px;
      row-gap: 5px;
      grid-template-columns: 150px 150px;
    }
  }

  @media(min-width: 320px) and (max-width: 410px){
    .chart-container{
      width: 300px !important;
    }
  }
  
</style>