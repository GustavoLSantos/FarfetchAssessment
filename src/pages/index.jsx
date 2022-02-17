import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './styles.css';
import PastLaunches from '../components/PastLaunches';
import UpcomingLaunches from "../components/UpcomingLaunches";
import Filters from "../components/Filters";

export default function Index() {

  const [succeeded, setSucceeded] = useState()
  const [past, setPast] = useState()
  const [choosenDate, setChoosenDate] = useState()

  return (
    <div className='main-container'>
        <PastLaunches choosenDate={choosenDate} past={past} isSucceeded={succeeded}/>
        <Filters choosenDate={setChoosenDate} isSucceeded={setSucceeded} isPast={setPast}/>
        <UpcomingLaunches choosenDate={choosenDate} past={past} isSucceeded={succeeded}/>
    </div>
  )
}
