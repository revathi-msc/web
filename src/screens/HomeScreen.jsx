import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
//import data from '../data';
import axios from 'axios';
import logger from 'use-reducer-logger';

const reducer = (state, action) =>{
  switch(action.type){
    case 'FETCH_REQUEST':
    return{
      ...state,
      loading: true 
    };
    case 'FETCH_SUCCESS':
    return{
      ...state,
      products: action.payload,
      loading: false 
    };
    case 'FETCH_FAIL':
    return{
      ...state,
      loading: false,
      error: action.payload,
    };
    default:
      return state;

  }
}

function HomeScreen() {

  const [{loading, products, error},dispatch]= useReducer(logger(reducer),{
    products:[],
    loading:false,
    error:'',
  })
  //const [products, setProducts] = useState([]);
  useEffect(()=>{
    const fetchData= async ()=>{
      dispatch({type:'FETCH_REQUEST'});
      try{
        const result = await axios.get('/api/products');
        dispatch({type:'FETCH_SUCCESS',payload:result.data});
       }catch(err){
        dispatch({type:'FETCH_FAIL',payload:err.message});
      }
      
      //setProducts(result.data);
    };
    fetchData();
  },[]);
  
  return (
    <div>
        <h1 className="newProducts">New Products</h1>
        <div className="products">
          {
          loading  ? (
            <div>
              <h3 className='message'>Loading...</h3>
              </div>
          ):error  ? (
            <div>
              <h3 className='message'>{error}</h3>
              </div>
          ):

            
            products.map((product)=>(


              <div className="product" key={product.slug}>
              <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name}/>
              </Link>
              <div className="productInfo">
              <Link to={`/product/${product.slug}`}>
              <p className="name">{product.name}</p>
              </Link>
              <p className="price">${product.price}</p>
              <button>Add to Carts</button>
              </div>
              </div>
          ))}
        </div>
    </div>
  )
}

export default HomeScreen