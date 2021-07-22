import React, { useEffect, useState } from 'react'
import InventoryCard from './InventoryCard'
import '../styles/common.css';
import { useHistory } from 'react-router';
import conf from '../config.json'
import Loading from './Loading';
function InventoryList() {
    const [inventory, setInventory] = useState({isLoaded: false, items: []})
    const history = useHistory()
    const [reload, setReload] = useState(false)

    useEffect(() => {
        console.log('fetching')

      fetch(conf.baseUrl+'inventory/book/')
      .then(res => res.json())
      .then(
        (result) => {
          setInventory({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
        }
      )
    }, [reload])

    function triReload(){
      setReload(!reload)
    }
    return (
        <div className='container'>
            <div className='heading'>Inventory</div>
            <div id="vspace"></div>
            <input type='submit' onClick={()=>history.push('/create')} value='Add new'/>

            {!inventory.isLoaded && <Loading/>}
            <div className='raster-flex'>{inventory.items.map((item, index)=> <InventoryCard key={index} index={index} data={item} reload={triReload}/>)}</div>
            <div className='vspace-100'>
            </div>
            <input type='submit' onClick={()=>history.push('/create')} value='Add new'/>
        </div>
    )
}

export default InventoryList
