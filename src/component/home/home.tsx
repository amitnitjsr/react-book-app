import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import Axios from 'axios';

const Home = () => {

    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(1);

    useEffect(()=>{
        getDataApi();
    },[limit]);
    
    const getDataApi = () => {
      
        Axios.get(`https://api.slingacademy.com/v1/sample-data/photos?offset=${limit}&limit=10`,
        { 'headers': { 'Content-Type': 'application/json' } }
        )
        .then((res)=>{
            setData([...data, ...res?.data?.photos]);
        })
        .catch((error)=>{
            console.log("error", error);
        });
    }

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) { 
            setLimit(limit+1);
        }
     }

    return(
        <>
        <div class='text-center font-bold text-lg pt-5 pb-5'>Books</div>
        <div class='flex flex-wrap justify-around overflow-y-scroll h-full'
        style={{overflowY: 'scroll', maxHeight: '500px'}}
        onScroll={handleScroll}  >
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
        </>
    )
}

export default Home;