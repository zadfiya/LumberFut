import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Slider from  'react-input-slider';
import Loader from '../Loader/Loader.js' ;
// import {Line} from 'react-chartjs-2'




const ChartComponent=({data})=>{
    const [selectedOption, setSelectedOption] = useState("Open")
    const [selectedData, setSelectedData] = useState([]);
    const [x, setX] = useState(10);

    useEffect(()=>{
        setSelectedData(data.slice(0, x))
    }, [data,x])

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value)
        console.log(e.target.value)
      };
      
      const chartData = {

//         labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   datasets: [
//     {
//       label: "First dataset",
//       data: [33, 53, 85, 41, 44, 65],
//       fill: true,
//       backgroundColor: "rgba(75,192,192,0.2)",
//       borderColor: "rgba(75,192,192,1)"
//     },
        
            labels: selectedData.map(item => item["Date"]),
            datasets: [
            {
                label: selectedOption,
                data: selectedData.map(item => item[selectedData]),
                fill: false,
                backgroundColor: 'rgba(255,0,0,0.4)',
                borderColor: 'rgba(255,0,0,1)',
                borderWidth: 2,
            }
        ]
        
      };
const config={
    position: "absolute",
    left: "15%"
}

const silderStyle = {
    track: {
      //backgroundColor: '#ddd',
      height: '10px',
      width: '650px' // Adjust width here
    },
   
}

    

    return (
        <>
            <select value={selectedOption} style={config} onChange={handleOptionChange}>
                <option value="Open">Open</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
                <option value="Close">Close</option>
                <option value="AdjClose">Adj Close</option>
                <option value="Volume">Volume</option>
            </select>

            {data.length>0 ? (<LineChart
                width={900}
                height={500}
                data={selectedData}
                fill = {true}
                margin={{
                top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="Date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={selectedOption} stroke="#8884d8" />
            </LineChart>) : (<Loader/>)}
            
            <Slider styles={silderStyle}
            axis="x"
            xstep={1}
            xmin={1}
            xmax={data.length}
            x={x}
            onChange={({ x }) => {
             setX(x)}}
            />

        {/* <div>Current Value: {selectedData[x]["Date"]}</div> */}
           
                
           
        </>
    )
}

export default ChartComponent;