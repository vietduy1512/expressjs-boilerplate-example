import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {

  const [title, setTitle] = useState(null);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    axios.get('/data').then(res => {
      setTitle(res.data.title);
      setDataList(res.data.data);
    })
  }, [])

  return (
    <div className="text-center">
      <p>Home Page</p>
      <p>{title}</p>
      {dataList.map(data => <p>{data}</p>)}
    </div>
  )
}

export default Home
