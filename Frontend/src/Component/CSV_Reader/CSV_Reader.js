import React, { useState, useEffect } from 'react';
import {Line} from "chart.js"




const ChartComponent=({data})=>{
    const [selectedOption, setSelectedOption] = useState("Open")
    const [selectedData, setSelectedData] = useState([]);


    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value)
        console.log(e.target.value)
      };

      const chartData = {
        labels: selectedData.map(item => item.Date),
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
        </>
    )
}

export default ChartComponent;