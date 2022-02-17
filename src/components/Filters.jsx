import React, {useState} from 'react'
import "./styles.css"
export default function Filters({isSucceeded, isPast, choosenDate}) {

    const [tempDate, setTempDate] = useState('')

  return (
    <div className='filterContainer'>
        <div ><p>Filters</p></div>
        <button className='filterButton' onClick={() => isSucceeded(true)}>Succeeded</button>
        <button className='filterButton' onClick={() => isSucceeded(false)}>Failed</button>
        <button className='filterButton' onClick={() => isPast(true)}>Past</button>
        <button className='filterButton' onClick={() => isPast(false)}>Upcoming</button>
        <div>
            <input className='dateInput' placeholder="Choose a year" type='text' onChange={(e) => setTempDate(e.target.value)}/>
            <button className='filterButton' onClick={()=>choosenDate(tempDate)}>Set date</button>
        </div>
    </div>
  )
}
