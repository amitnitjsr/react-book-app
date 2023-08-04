import { useEffect, useRef, useState } from 'react';
import Axios from 'axios';

const Card = () => {
    
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(10);

    // useEffect(()=>{
    //     getDataApi();
    // },[]);

    useEffect(()=>{
        getDataApi();
    },[limit]);

    const getDataApi = () => {
        console.log("limit", limit)
        Axios.get(`https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=${limit}`,
        { 'headers': { 'Content-Type': 'application/json' } }
        )
        .then((res)=>{
            setData(res?.data?.photos);
        })
        .catch((error)=>{
            console.log("error", error);
        });
    }

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) { 
            console.log("bottom")
            setLimit(limit+10);
        }
     }

    return(
        <>
        <div class='text-center font-bold text-lg pt-5 pb-5'>Books</div>
        <div class='flex flex-wrap justify-evenly overflow-y-scroll h-full'
        style={{overflowY: 'scroll', maxHeight: '500px'}}
        onScroll={handleScroll}  >
        {data && data.map((obj)=>{
            return (        
                        <div class='shadow-md mb-4'>
                            <div class='w-48 h-64 object-contain'>
                                <img src={obj?.url} alt='not found'  class="rounded"/>
                            <div class='font-semibold pl-1 pr-1'>
                            Tailwind CSS is an open source CSS framework.
                            </div>
                            <div>
                                <div class='float-left pl-1 text-rose-600 font-bold'>10%</div>
                                <div class='float-right font-bold pr-1'>570000&nbsp;<span class='font-semibold'>Hiii</span></div> 
                            </div>
                            </div>
                        </div>
            );
        })}
        </div>
        </>
    )
}

export default Card;