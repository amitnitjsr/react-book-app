import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import Axios from 'axios';
import Loading from './Loading';

const Home = () => {

    const [data, setData] = useState([]);
    const [offset, setOffSet] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        window.addEventListener("scroll", handleInfiniteScroll);
        return() =>{
            window.removeEventListener("scroll",handleInfiniteScroll);
        }
    },[]);

    useEffect(()=>{
        getDataApi();
    },[offset]);
    
    const handleInfiniteScroll = async() => {
        try{
            if(window.innerHeight + document.documentElement.scrollTop + 1 > 
                document.documentElement.scrollHeight){
                    setLoading(true);
                    setOffSet((prev)=> prev + 1);
                }
        }
        catch(error){
            console.log(error);
        }
    }

    const getDataApi = () => {
      
        Axios.get(`https://api.slingacademy.com/v1/sample-data/photos?offset=${offset}&limit=10`,
        { 'headers': { 'Content-Type': 'application/json' } }
        )
        .then((res)=>{
            setData((prev) => [...prev, ...res?.data?.photos]);
            setLoading(false);
        })
        .catch((error)=>{
            console.log("error", error);
        });
    }

    return(
        <>
        <div class='text-center font-bold text-lg pt-5 pb-5'>Books</div>
        <div class='flex flex-wrap justify-center items-center h-full gap-3'
         >
        {data && data.map((obj, id)=>{
            return (        
                        <Card
                            imgUrl={obj?.url}
                            description={'Tailwind CSS is an open source CSS framework.'}
                            price={75000}
                            discount={10}
                            name={'abc'}
                            key={id}
                        />
            );
        })}
        </div>
        {loading && <Loading />}
        </>
    )
}

export default Home;