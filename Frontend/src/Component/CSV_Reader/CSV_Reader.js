import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// import {Line} from 'react-chartjs-2'




const ChartComponent=({data})=>{
    const [selectedOption, setSelectedOption] = useState("Open")
    const [selectedData, setSelectedData] = useState([]);

    useEffect(()=>{
        setSelectedData(data)
    }, [data])

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


    return (
        <>
            <select value={selectedOption} onChange={handleOptionChange}>
                <option value="Open">Open</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
                <option value="Close">Close</option>
                <option value="AdjClose">Adj Close</option>
                <option value="Volume">Volume</option>
            </select>

            <LineChart
                width={700}
                height={500}
                data={data}
                margin={{
                top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="Date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={selectedOption} stroke="#8884d8" />
            </LineChart>
           
         {/* { selectedData.length>0&& <Line data={chartData}/> } */}
                
           
        </>
    )
}

export default ChartComponent;