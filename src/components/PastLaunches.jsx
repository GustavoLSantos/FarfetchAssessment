import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './styles.css';

export default function PastLaunches({isSucceeded, past, choosenDate}) {

    const [launches, setLaunches] = useState([]);
    const [backupLaunches, setBackupLaunches] = useState([]);
    const [page, setPage] = useState(4);    
    const [loading, setLoading] = useState(false);

    const api = axios.create({
        baseURL: "https://api.spacexdata.com/",
      });

    const getApiLaunches = async () =>{
        return api.get(`v3/launches/past?limit=${page}`);
    } 

    const getLaunches = async () => {
        try {
        setLoading(true);
        const { data } = await getApiLaunches();
        console.log("Response",data);
        setLaunches(prev => [...data]);
        setBackupLaunches(prev => [...data]);
        setLoading(false);
          }
        catch (erro) {
          console.log("ERRO", erro);
        }
    }

    useEffect(() => {
        getLaunches();
    }, [page]);

    useEffect(() => {
        let tempSucceeded = backupLaunches?.filter(function(el){return el.launch_success == isSucceeded})
        setLaunches(tempSucceeded);
    }, [isSucceeded]);

    useEffect(() => {
        let tempDate = backupLaunches?.filter(function(el){return el.launch_year >= choosenDate})
        setLaunches(tempDate);
    }, [choosenDate]);
    
    
    const handleScrollSuccess = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if(page <= 12){
            setPage(prev => prev + 4);
        }
        if (scrollHeight - scrollTop === clientHeight) {
            setPage(prev => prev + 4);
        }
    }

    const [favorites, setFavorites] = useState("");
    const [arrayOfFav, setArrayOfFav] = useState([])
    const [objectOfFav, setObjectOfFav] = useState({})

    useEffect(() => {
        let tempFav = launches?.filter(function(el){return el.mission_name >= favorites})
        setObjectOfFav(tempFav)
        setArrayOfFav(JSON.stringify(tempFav[0]));
        localStorage.setItem("myFavorites", arrayOfFav);
        console.log(`Favorite ${favorites} was set`);
    }, [favorites]);
    

  return (
    <div className='main-container'>
        <p className='header-text'>Past flights</p>
        <div className='content'  onScroll={(e) => handleScrollSuccess(e)}>
        
        <table className='center'>
                <tr>
                <th>Launch Number</th>
                <th>Mission name</th>
                <th>Mission year</th>
                <th>Mission Success</th>
                <th>Rocket name</th>
                <th>Image</th>
            </tr>
            {past==undefined || past==true ? launches.map((item) => {
            return(
               
                <tr>
                <td>
                    {item.flight_number.toString()}
                </td>  
                <td className='missionName' onClick={(e) => setFavorites(e.target.outerText)}>
                    {item.mission_name}
                </td> 
                <td>
                    {item.launch_year}
                </td> 
                <td>
                    {item.launch_success ? "Success" : "Failed"}
                </td> 
                <td>
                    {item.rocket.rocket_name}
                </td> 
                <td>
                    <div className='image-patch'>
                    <img src={item.links.mission_patch}></img>
                    </div>
                </td> 
                </tr> 
                
            )
        }): <></>}
        {loading && <h4>Loading...</h4>}
        </table>
        
        </div>
        <div>
        {objectOfFav.length > 0 ? `YOUR FAVORITE FLIGHT IS THE: ${objectOfFav[0].mission_name}` : "Choose a favorite flight by clicking on its name"}
        </div>
            
    </div>
  )
}
