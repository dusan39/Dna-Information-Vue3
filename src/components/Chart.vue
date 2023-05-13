<template>

  <canvas></canvas>
    
</template>

<script> 

  import { getData } from '../api';
  import Chart from 'chart.js/auto';
  
  var subscriptionsLabels = []
  var subscriptionsData = []
  var impressionsLabels = []
  var impressionsData = []
  var clicksLabels = []
  var clicksData = []
  var avgTimeLabels = []
  var avgTimeData = []
  
  async function getDataAPI(){
    const response = await getData()
    return response
  }

  async function getSubscriptionsData(response){
    const subscriptions = response.data.subscriptions
    const subscriptionsKey = Object.keys(subscriptions.history)
    const subscriptionsValues = Object.values(subscriptions.history)

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

    await createChartImpressions()
  }

  async function getClicksData(response){
    const clicks = response.data.clicks
    const clicksKey = Object.keys(clicks.history)
    const clicksValues = Object.values(clicks.history)

    clicksLabels = clicksKey
    clicksData = clicksValues 

    await createChartClicks()
  }

  async function getAvgTimeData(response){
    const avgTime = response.data.avgTime
    const avgTimeKey = Object.keys(avgTime.history)
    const avgTimeValues = Object.values(avgTime.history)
    
    avgTimeLabels = avgTimeKey
    avgTimeData = avgTimeValues   

    await createChartAvgTime()
  }

  async function createChartSubscriptions(){
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

    const myChartSubscriptions = new Chart(document.getElementById('myChartSubscriptions'), config);
  }

  async function createChartImpressions(){

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

    const myChartImpressions = new Chart(document.getElementById('myChartImpressions'), config);
  }

  async function createChartClicks(){

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

    const myChartClicks = new Chart(document.getElementById('myChartClicks'), config);
  }

  async function createChartAvgTime(){

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

    const myChartavgTime = new Chart(document.getElementById('myChartAvgTime'), config);
  }

  async function getDataAndCallFunctions() {
    try{
      const response = await getDataAPI()
      getSubscriptionsData(response)
      getImpressionsData(response)
      getClicksData(response)
      getAvgTimeData(response)
    }catch(error){
      console.error(error)
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    getDataAndCallFunctions()
  });

</script>

<style lang="scss">

</style>