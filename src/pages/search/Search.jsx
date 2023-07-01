import React, { useEffect, useState } from 'react'
import Card from '../../Components/card/Card'
import { useParams } from 'react-router-dom'
import { searchProductsApi } from '../../apis/Api';

const Search = () => {

    const {query}= useParams();
    const[products,setproducts]= useState([]);
    const[searchQuery, setSearchQuery]= useState(query);

useEffect(()=>{
    searchProductsApi(query).then(res=>{
console.log(res.data)
setproducts(res.data)
    }).catch(err=>{
        console.log(err)
    })
})


const handleSearch=(e)=>{
    searchProductsApi(searchQuery).then(res=>{
        console.log(res.data)
        setproducts(res.data)
            }).catch(err=>{
                console.log(err)
            })
    }

  return (
    <div className='container mt-3'>
        <div className='d-flex justify-content-between'>
            <h4> search products</h4>

            <form action="">
        <input onChange={(e)=>setSearchQuery(e.target.value)} type="text" className="form-control mb-3" placeholder="search"/>
        <button onClick={handleSearch} type= "submit" hidden>Search</button>
      </form>
        </div>
        <p>
            result for <strong>{searchQuery}</strong>
        </p>

<div className='row row-cols-1 row-cols-md-4 g-4'>
{
   products.length > 0 ?  products.map(product=>(
    <Card product={product}/>

    )): <h5> No products found</h5>
        
}
</div>


    </div>
  )
}

export default Search