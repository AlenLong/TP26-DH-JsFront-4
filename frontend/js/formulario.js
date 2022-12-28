/* const { production } = require("../../src/database/config/config"); */

window.onload = () => {

    let $ = (e) => document.querySelector(e);

/*     let url = window.location.href
    console.log(url);
     */

    const getMovie = async () => {
        try {
            let urlMovies = "http://localhost:3031/api/movies/22";
            let response = await fetch(urlMovies);
            let result = await response.json();
            console.log(result);
            traerPeli(result.data)
            eliminarPeli(result.data.id)
            editarPeli(result.data.id)
        } catch (error) {
            console.log(error);
        }
    };

    let formulario = $('form')
    let titulo = $('#title')
    let calificacion = $('#rating')
    let premios = $('#awards')
    let fechaCreacion = $('#release_date')
    let duracion = $('#length')

    let btnEditar = $('#btn-editar')
    let btnCrear = $('#btn-crear')
    let btnEliminar = $('#btn-eliminar')


    const traerPeli = async (data) =>{

        let fecha = data.release_date
        let nueva = fecha.substring(0,10)


        titulo.value = data.title
        calificacion.value = data.rating
        premios.value = data.awards
        fechaCreacion.value = nueva
        duracion.value = data.length
    }

    const eliminarPeli = async (id) => {
        let urlEliminar = `http://localhost:3031/api/movies/delete/${id}`
        btnEliminar.addEventListener('click', async (e) =>{
            e.preventDefault()
            console.log('Hiciste click', id);
            let pregunta = confirm('Estas seguro de eliminar el elemento?')
            console.log(pregunta);
            if(pregunta){
                console.log(urlEliminar);
                let eliminarPelicula = await fetch(urlEliminar, {
                    method : 'DELETE'
                })
                let result = await eliminarPelicula.data
                alert('El elemento fue eliminado ' + result)
            }
        })
    }

        btnCrear.addEventListener('click', async (e) => {
            e.preventDefault()

            let peli = {
                title : titulo.value,
                rating : calificacion.value,
                awards : premios.value,
                release_date : new Date,
                length : duracion.value,
                genre_id : 1
            }
            let urlCrear = `http://localhost:3031/api/movies/create`
            console.log(peli);
            console.log('Creaste una nueva Pelicula!');
            let pregunta = confirm('Esta seguro de crear la Pelicula ' + peli.title)
            if (pregunta) {
                console.log(urlCrear);
                let crearPelicula = await fetch(urlCrear, {
                    method : 'POST',
                    body : JSON.stringify(peli),
                    headers : {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                let result = await crearPelicula.data
                alert('Creaste una nueva Pelicula! ' + result)
            }
        })
    




        const editarPeli = async(id) =>{

        btnEditar.addEventListener('click', async (e) => {
            e.preventDefault()

            let peli = {
                title : titulo.value,
                rating : calificacion.value,
                awards : premios.value,
                release_date : new Date,
                length : duracion.value,
                genre_id : 1
            }
            let urlEditar = `http://localhost:3031/api/movies/update/${id}`
            console.log(peli);
            console.log('Editaste la Pelicula! ' + peli.title);
            let pregunta = confirm('Esta seguro de editar la Pelicula ' + peli.title)
            if (pregunta) {
                console.log(urlEditar);
                let editarPelicula = await fetch(urlEditar, {
                    method : 'PUT',
                    body : JSON.stringify(peli),
                    headers : {
                        'Content-Type': 'application/json'
                    },
                })
                let result = await editarPelicula.data
                alert('Creaste una nueva Pelicula! ' + result)
            }
            
        })
        
    }
    getMovie()
};
