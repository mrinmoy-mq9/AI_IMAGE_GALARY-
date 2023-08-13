import React, {useState , useEffect} from 'react';
import { logo } from '../assets';
import {Link} from "react-router-dom"

import { Card , Loader, FormField } from '../components';
//import { set } from 'mongoose';


const RenderCard = ({data , title}) => {
  if(data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />)
  }

  return (
    <h2 className=' font-bold uppercase text-xl text-[#66449ff'>{title}</h2>
  )
}
const Home = () => {

  const [loading , setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('new image');
  const [searchResult ,setSearchResults] = useState('');
  const [searchTimeout ,setSearchTimeout] = useState(null);

  useEffect(()=>{
   
    const fetchPosts = async() => {
      setLoading(true);

      try {
        const response = await fetch("https://dallem.onrender.com/api/v1/post/",{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
          },

        })
        console.log(response.ok)
        if(response.ok){
          const result = await response.json();
          console.log(result["data"])
          setAllPosts(result.data);
        }
      } catch (error) {
        alert(error);
      }finally{
        setLoading(false);
      }
    }
    fetchPosts();
   
  },[]);

  const handleSearchChange = (e) =>{
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(()=>{
        const searchResult = allPosts.filter((item)=> item.name.toLowerCase().includes(searchText.toLowerCase()) || 
        item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        
        setSearchResults(searchResult);
      
      } , 500)
    );
    
  }
  return (
    <section className='max-w-7xl mx-auto'>
      <div >
        <h1 className='font-extrabold text-center font-mono  text-[#7330b2] text-[32px]'>
          AI IMAGE GALARY
        </h1>
        <p className='text-[16px] mt-2 font-mono text-center text-violat-700'>An Era of <span className='Text-md font-serif font-bold text-green-600'>ARTIFICIAL</span> creativity </p>

        
      </div>

      <div className='mt-16   max-w-7xl'>
        <FormField
          lebelName={"Search post"}
          tyoe='text'
          name='text'
          placeholder='search post'
          value ={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      
      <div className='mt-10'>
        { loading ? (
          <div className='flex justify-center item-center'>
            <Loader/>
          </div>
        ) : 
        <>
          { searchText && (
            <h2 className='text-[#3439d5] mb-3'>
              Showing result for || <span className='text-[#4c32cc]'>{searchText}</span>
            </h2>
          )}

          <div className='grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-3'>
            { searchText ? (
              <RenderCard 
                data={searchResult}
                title={'no search'}              
              />
            ) :
            (
              <RenderCard  
                data={allPosts}
                title='no post found'
              />
            )
            }

          </div>
        </>
        }
      </div>
    </section>
  )
}

export default Home
