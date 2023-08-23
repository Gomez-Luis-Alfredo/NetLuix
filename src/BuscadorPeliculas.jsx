import { useState } from "react"


export const BuscadorPeliculas = () => {
    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const apiKey = 'c66980a0f9ad275a7fabfadfb376125f'

    const [busqueda, setBusqueda] = useState('')
    const [peliculas, setPeliculas] = useState([])

    const handleInputChange = (e) =>{
        setBusqueda(e.target.value)
    }

    const handlesubmit = (e) =>{
        e.preventDefault()
        fetchPeliculas()

    }

    const fetchPeliculas = async () =>{
        try{
            const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${apiKey}`)
            const data = await response.json()
            console.log(data.results)
            setPeliculas(data.results)
            

        }catch(error){
            console.error('Ha ocurrido un error', error )

        }
    }

  return (
    
    <div className="container">
        <div><h1 className="neon-text">netflix</h1><hr /></div>
     <h1 className="title">🎦Buscador de Películas</h1>
     <form onSubmit={handlesubmit}>
        <input 
        type="text" 
        placeholder="Nombre de la Película"
        value={busqueda}
        onChange={handleInputChange}
        />
        <button type="submit" className="search-button">Buscar</button>
     </form>
     
     <div className="movie-list">
     {peliculas.map( (pelicula) => (
        
            <div key={pelicula.id} className="movie-card">
                <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title}/>
                
                <h2>{pelicula.title}</h2>
                <p>{pelicula.overview}</p>

            </div>
        
     ))}

     </div>
     
    </div>
    
  )
}
