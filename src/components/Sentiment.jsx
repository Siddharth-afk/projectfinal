import React, { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import TweetBody from './TweetBody';


export const Sentiment = ({ output }) => {

  const [data, setData] = useState([])
  
  useEffect(() => {
    fetch("/twitter",{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data: output})
    }).then(response => response.json()).then(
      data => {setData(data)}).catch(
      error => console.log(error))
  }, [output])

  if(data.length === 0){
    console.log("beep")
  }else{
    console.log("boop")
  }

  return (
    <div className='mx-auto mt-5 text-center px-10'>
      {(data.length === 0 ? <div className=''><CircularProgress /></div> : <TweetBody data={data}/>)}
    </div>
  )
}