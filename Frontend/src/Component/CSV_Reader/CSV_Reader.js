import React, { useState, useEffect } from 'react';
import {Line} from "chart.js"




const ChartComponent=({data})=>{
    console.log(data)
    const [selectedOption, setSelectedOption] = useState("Open")
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value)
        console.log(e.target.value)
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