import React, { useState } from 'react';
import BackButton from '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx'
import axios from 'axios';
import { useNavigate, useParams  } from 'react-router-dom';
import {useSnackbar}  from 'notistack'; //npm i notistac

export default function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

   const handledeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar(`Deleted Successfully`, { variant: 'success'})
        navigate('/');
      })
      .catch((err) => {
        setLoading(false)
        enqueueSnackbar('error', {variant: 'error'});
        // alert('An error occured. Pllease check console');
        console.log(err)
      })
   }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className="text-3xl my-4"> Delete book</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col items-center border-2 border-yellow-500 rounded-xl w-[600px] p-8 m-auto">
        <h3 className="text-2xl">Are You Sure You Want to Delete This Book?</h3>
        <button 
        className="p-4 bg-red-600 text-white m-8 w-full"
        onClick={handledeleteBook}
        >Yes, Delete it</button>
      </div>

    </div>
  )
}
