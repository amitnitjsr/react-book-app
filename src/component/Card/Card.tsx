import { useEffect, useState } from 'react';
import Axios from 'axios';

const Card = () => {

    const [data, setData] = useState([]);
    useEffect(()=>{
        Axios.get('https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=20',
        { 'headers': { 'Content-Type': 'application/json' } }
        )
        .then((res)=>{
            console.log(res?.data?.photos);
            setData(res?.data?.photos);
        })
        .catch((error)=>{
            console.log("error");
        })
    },[]);

    return(
        <>
        <h1>Hello</h1>
        {data && data.map((obj)=>{
            return (
                <div class="grid gap-2" >
                    <tr>
                        <div class="rounded-md bg-white shadow-xs">
                            <img
                                src={obj?.url}
                                // src={'http://111.93.169.90:4020/image/user.png'}
                                // scr={val.poster}
                                // class="img-avatar"
                                alt="not found"
                                class="rounded-md h-48"
                            />
                        </div>
                    </tr>
                    <tr>
                        <td>{'val.name'}</td>
                        <td>{'val.director'}</td>
                        
                    </tr>
                </div>
            );
        })}
        </>
    )
}

export default Card;