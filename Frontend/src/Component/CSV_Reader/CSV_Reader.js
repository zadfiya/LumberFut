import React, { useState, useEffect } from 'react';
import {Line} from "chart.js"




const Chart=()=>{
    const handleOptionChange = (e) => {
        console.log(e.target.value)
      };
    return (
        <>
            <select value={"Open"} onChange={handleOptionChange}>
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