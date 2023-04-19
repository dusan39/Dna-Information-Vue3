import axios from 'axios'

const CHART_API = import.meta.env.VITE_API_CHARTS
let chartType = 'impressions'

const allData = async() => {
  try{
    const response  = await axios.get(CHART_API)

    console.log(response.data)

   // let dateKeys = Object.keys(response.data + '.' +  chartType  + '.' + history);
    let dateKeys = Object.keys(response.data.impressions.history);
    let dateValues = Object.values(response.data.impressions.history);

    console.log(dateKeys)
    console.log(dateValues)
    
  }catch(err){
    console.log(err)
  }  

}

allData()


export const data = {
  labels:[
    '2021-01-01',
    '2021-01-02',
    '2021-01-03',
    '2021-01-04',
    '2021-01-05',
    '2021-01-06',
    '2021-01-07'
  ],
 /* datasets: [
    {
      label: 'subscriptions',
      backgroundColor: '#f87979',
      data: [10000, 11500, 10000, 12000, 15000, 11160, 13000]
    }
  ] */
}

export const options = {
  responsive: true,
  maintainAspectRatio: false
}