import React, {useState} from 'react'
import shortid from 'shortid'



function App() {


  //state para guardar string al state
  const arre = ''
  const [tarea, setTarea] = useState(arre)

  //state para guardar ese string a un arreglo y mostrarlo en lista
  const [lista, setLista] = useState([])

  //state para poner en verdadero la edicion
  const [editar, setEditar] = useState(false)


  const [id, setId] = useState('')


  const [error, setError] = useState(null)

  const agregarTarea = (e) =>{
    e.preventDefault()
    if(tarea.trim().length <= 4){
      setError('Escriba algo por favor....')
      return
    }
    
    console.log(tarea)

    setLista([
      ...lista,
      {id: shortid.generate(), listaTarea: tarea}
    ])
    setTarea('')
    setError(null)
  }



  const eliminarTarea = (id) =>{
    //filter va a filtrar todo lo distinto al id que estamos mandando
    //si el id es igual ... pa fueraa
    const arrayFiltrado = lista.filter(devolver => devolver.id !== id )
    setLista(arrayFiltrado)
  }



  //el dev nos va a capturar el id y el contenido
  const editarTarea = (dev) =>{

    setEditar(true) //activa para que el state de editar sea verdadero
    setTarea(dev.listaTarea)//modificar el contenido de tarea
    setId(dev.id)//modiricar el id del state id
  }


  const editarInput = (e) =>{
    e.preventDefault()
    if(tarea.trim().length <= 4){
      setError('Escriba algo por favor....')
      return
    }

    const arrayEditar = lista.map( recorrer => recorrer.id === id ? {id, listaTarea: tarea}: recorrer)
    setLista(arrayEditar)

    setEditar(false) 
    setTarea('')
    setId('')
    setError(null)
  }

  return (
    <div className="container mt-5">

      <h1 className = "text-center">Crud en React JS</h1>

      <hr />

      <div className="row">

        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>

          <ul className="list-group">

            {


              lista.length === 0 ? (
                   <li className="list-group-item"> No hay tareas </li>
              ) : (
                lista.map(devolver =>(

                  <li className="list-group-item" key={devolver.id}>
                    <span className="lead">{devolver.listaTarea}</span>
                    <button className="btn btn-danger btn-sm float-end mx-2"
  
                    onClick = {()=> eliminarTarea(devolver.id)}
                    >
                      Eliminar
                    </button>
  
                    <button className="btn btn-warning btn-sm float-end"
                    onClick={()=> editarTarea(devolver)}
                    >
                      Editar
                    </button>
  
                  </li>
                ))
              )

              
            }
            
          </ul>

        </div>


        <div className="col-4">

          <h4 className="text-center">
            {
              editar ? 'Editar Tarea' : 'Agregar tarea'
            }
          </h4>

         {
           error ? <span className="text-danger">{error}</span> : null
         }
          <form onSubmit = { editar ? editarInput : agregarTarea}>
            <input 
                type="text" 
                className="form-control mb-2" 
                placeholder = "Escriba su tarea"
                onChange = {e=> setTarea(e.target.value)}
                value = {tarea}
            />

            {
              editar ? (
                <button className="btn btn-warning btn-block " type="submit">Editar</button>
              ) : (
                <button className="btn btn-dark btn-block " type="submit">Agregar</button>
              )
            }

          </form>
          
        </div>

      </div>
    </div>
  );
}

export default App;
