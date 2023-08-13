import React, { useState } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';

import { preview , download} from '../assets';

import { getRandomPrompt} from "../util";
import { FormField , Loader } from '../components';
const CreatePost = () => {


  const navigate = useNavigate();
  const [ form , setForm] = useState({
    name:'mrinmoy',
    prompt:'',
    photo:''
  });

  const [genImg , setGenImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSurpriseMe, setIsSurprisMe] = useState(true);

  const generatImage = async ()=>{
    if(form.prompt){
      try {
        setGenImg(true);
        const response = await fetch('https://dallem.onrender.com/api/v1/dalle',{
          method:'POST',
          headers:{
            'content-type':'application/json',
          },
          body:JSON.stringify({prompt:form.prompt})
        })
        

        const data = await response.json();

        setForm({...form , photo:`data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error);
      }finally{
        setGenImg(false);
      }
    }else{
      alert('please enter a prompt')
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(form.prompt && form.name){
      setLoading(true);

      try {
        const response = await fetch("https://dallem.onrender.com/api/v1/post/",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify(form)
        })
        console.log(JSON.stringify(form));
        await response.json();
        navigate("/");
      } catch (error) {
        alert(error);
      } finally{

        setLoading(false);

      }
    }else{
      alert(" enter your prompt please...");
    }
  }

  const handleChangeN = (e) => {
    setForm({...form , name: e.target.value})
  }

  const handleChangeP = (e) => {
    setForm({...form , prompt: e.target.value})
  }

  const handleSurpriseMe = () => {
    const randomP = getRandomPrompt(form.prompt);
    setForm({ ...form , prompt:randomP});
  }

  return (
   <section className=''>
     <div className='max-w-7xl'>
        <h1 className='font-extrabold font-mono -mt-4 text-center text-[#5c289c] text-[32px]'>
          LET YOUR CRAZZY IMAGINATION take WINGS
        </h1>
        <p className='text-[16px] mt-2 text-center font-mono text-violet-600'>Build your FUTURE with AI APPLICATION</p>

      </div>

      <div className=' flex  justify-center'>
        
      <form className='max-w-3xl mt-6  ' onSubmit={handleSubmit}> 
        <FormField
          lebelName='your name'
          name="name"
          type='text'
          placeholder='john Doe'
          handleChange={handleChangeN} 
          value={form.name} 
        />

        <FormField 
          lebelName='prompt'
          name="prompt"
          type='text'
          placeholder='your name is thios'
          handleChange={handleChangeP} 
          value={form.prompt}   
          isSurpriseMe
          handleSurpriseMe= {handleSurpriseMe}
        />

        <div className="relative bg-grey-50 border border-grey-300 text-grey-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 h-64 mt-4 p-3 flex justify-center
            item-center "
        >
              {form.photo ? (
                <img
                src={form.photo}
                alt={form.photo}
                className='w-full h-full object-contain'
              />
             
                
              ):(
              
                <img
                src={preview}
                alt='prevew'
                className='w-9/12 h- 9/12object-contain opacity-40'
              />
              )}

              {genImg && (
                <div className='flex inset-0 z-0 justify-center item-center
                bg-[rgba(0,0,0,0.5)] rounded-lg absolute'>
                  <Loader/>
                </div>
              )}
          </div>
   
          <div className='mt-5 flex gap-5'>
            <button 
              type='button'
              onClick={generatImage}  
              className='text-white bg-green-700 font-medium rounded-md
              text-sm w-full  px-5 py-2.5 text-center' 
            >
              {genImg ? "generating.....":"generate"}
            </button>
          </div>

          <div className='mt-10'>
            <p className='text-[#666e75] text-[14px] mt-2'>you have created the imag you want, you can share it with other in the comunity</p>
            <button
              type='submit'
              className='w-full text-white font-medium text-sm bg-[#6469ff] rounded-md px-5 py-2.5 text-center mt-3'
            >
              { loading ? 'sharing.....' : 'share with comunity'}
            </button>
          </div>
        
        </form>
      </div>
      

    

   

    
   </section>
  )
}

export default CreatePost
