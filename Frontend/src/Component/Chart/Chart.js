import ChartComponent from '../CSV_Reader/CSV_Reader'
import { GetAPi } from '../../Services/ApiServices'
import APIPath from '../../Services/ApiPath'
import { useEffect, useState } from 'react'
const Chart = ()=>{

    const [data, setData] = useState([])
    useEffect(()=>{
        const chartdata = new Promise((resolve,reject)=>resolve(GetAPi(APIPath.getChartData)))
   chartdata.then(response=>{
    if(response.data.success)
    {
        setData(response.data.data)  
    }
   })
    },[])
    
    return (
        <>
           <ChartComponent data={data}/>
        </>
    )

}

export default Chart;