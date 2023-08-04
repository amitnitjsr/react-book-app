import { useEffect, useState } from 'react';
import Axios from 'axios';

const Home = () => {

    const [data, setData] = useState([]);
    
    useEffect(()=>{
        Axios.get('https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=20',
        { 'headers': { 'Content-Type': 'application/json' } }
        )
        .then((res)=>{
            setData(res?.data?.photos);
        })
        .catch((error)=>{
            console.log("error", error);
        })
    },[]);

    return(
        <div>

        </div>
    )
}

export default Home;