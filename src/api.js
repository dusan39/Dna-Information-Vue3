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

/*

export async function getSubscriptionsData(response){
  const subscriptions = response.data.subscriptions
  const subscriptionsKey = Object.keys(subscriptions.history)
  const subscriptionsValues = Object.values(subscriptions.history)

  subscriptionsTotal = subscriptions.total
  subscriptionsLabels = subscriptionsKey
  subscriptionsData = subscriptionsValues
}

var subscriptionsLabels = []
var subscriptionsData = []
var impressionsLabels = []
var impressionsData = []
var clicksLabels = []
var clicksData = []
var avgTimeLabels = []
var avgTimeData = []


export async function getImpressionsData(response){
  const impressions = response.data.impressions
  const impressionsKey = Object.keys(impressions.history)
  const impressionsValues = Object.values(impressions.history)

  impressionsLabels = impressionsKey
  impressionsData = impressionsValues
  impressionsTotal = impressions.total
}

export async function getClicksData(response){
  const clicks = response.data.clicks
  const clicksKey = Object.keys(clicks.history)
  const clicksValues = Object.values(clicks.history)

  clicksTotal = clicks.total
  clicksLabels = clicksKey
  clicksData = clicksValues 
}

export async function getAvgTimeData(response){
  const avgTime = response.data.avgTime
  const avgTimeKey = Object.keys(avgTime.history)
  const avgTimeValues = Object.values(avgTime.history)
  
  avgTimeTotal = avgTime.total
  avgTimeLabels = avgTimeKey
  avgTimeData = avgTimeValues   
}

*/