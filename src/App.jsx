import { useEffect, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.css'

//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
function App() {
  const [movies, setMovies] = useState([])
  const [searchTerm,setSearchTerm] = useState('')
  const [spiner,setSpiner] = useState('d-none')
  

  const myFun =  async ()=>{
   try{
    const res = await fetch(`https://omdbapi.com/?s=${searchTerm}&apikey=16d7554f`)
    const data = await res.json()
    console.log(data.Search)
    setMovies(data.Search)
   
   }
   catch(error){
    console.log('Error')
   }
   
  }

  useEffect(()=>{
    setTimeout(()=>{
      setSpiner('d-none')
      myFun()
    },2000)
   
})
  return (
  <div className='bg-dark'>
     <div className='m-3 nav-sec'>
    <div className='p-3'>
    <h1 className='text-primary'>Movies List</h1>
    <input type="text" className='form-control w-100 mb-3' value={searchTerm} onChange={(e)=>{
      setSearchTerm(e.target.value)
      setSpiner('d-block')}} placeholder='Enter Movie Title' />
    </div>
    </div>
   <div className='bg-secondary d-flex flex-wrap justify-content-center overflow-auto' style={{'height':'80vh'}}>
   <div class={`spinner-border ${spiner} align-self-center`} role="status">
  <span class="visually-hidden ">Loading...</span>
</div>
   {
      movies && movies.map((movie,ind)=>{
       // console.log(movie.Title)
        return(
         
           <div key={ind} className='movie-con card m-3 d-flex flex-column'>
           <div className='card-header' style={{'height':'90%'}}>
           <img src={movie.Poster} alt={movie.Title}/>
            </div>
           <div className='card-body'>
           <h2>{movie.Title}</h2>
            </div>
          <div className='card-footer'>
            
          <h3 className=''>Realesed in {movie.Year}</h3>
          <p>Genre <b>{movie.Type}</b></p>
            </div>
         </div>
        )
      })
    }
   </div>
   
   
  </div>
  )
}
export default App
