import React, { useState } from 'react';
import BackButton from '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useSnackbar}  from 'notistack'; //npm i notistack

export default function CreateBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handlesavebook = () => {
    const data = {
      title,
      author,
      publishYear
    };
    setloading(true);
    axios.post('http://localhost:5000/books', data)
    .then(() => {
      setloading(false);
      enqueueSnackbar(`Book "${data.title}" Created Successfully`, { variant: 'success'})
      navigate('/')
    })
    .catch((err) => {
      setloading(false);
      // alert('An error has occure. Please check the console');
      enqueueSnackbar('Operation Unsuccessful', {variant: 'error'});
      console.log(err)
    })
  }

   return (
    <div className='p-4'>
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-yellow-500 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label htmlFor="" className="text-xl mr-4 text-gray-500">Title</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-grey-500 px-4 py-2 w-full'
            />
        </div>
        <div className="my-4">
          <label htmlFor="" className="text-xl mr-4 text-gray-500">Author</label>
          <input 
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-grey-500 px-4 py-2 w-full'
            />
        </div>
        <div className="my-4">
          <label htmlFor="" className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input 
            type="number"
            value={publishYear}
            placeholder='1996'
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-grey-500 px-4 py-2 w-full'
            />
        </div>
        <button className="p-2 bg-yellow-500 m-8" onClick={handlesavebook}>Save</button>
      </div>
    </div>
  )
}
