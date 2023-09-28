// variables
// Los elementos HTML seran en su mayoria const.
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = [];
        limpiarHTML();
    });
}

//FUNCIONES
function agregarCurso(e){
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);

    }
    
}

//Elimina un curso del carrito
function  eliminarCurso (e){
    
    if (e.target.classList.contains('borrar-curso')){
        //Elimina del arreglo articulosCarrito[] por data-id
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );


        carritoHTML(); // Iterar nuevamente sobre el carrito despues de filtrar.
    }
}

// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
     
    //Crear Objeto con el contenido del curso actual.
     const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,

     }

     // Revisa si ya existe el curso seleccionado en el carrito.
     const existe = articulosCarrito.some( curso => curso.id ===  infoCurso.id );

     if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //Guarda el objeto actualizado en arreglo "cursos"
            }else{
                return curso; // Guarda el objeto sin actualizar en arreglo "cursos"
            }
        } );

        articulosCarrito = [...cursos]
     }else{
        //Agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
     }

     

     carritoHTML();
}

//Muestra el carrito de compras en el HTML.
function carritoHTML(){

    // Limpiar el HTML Previo
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach ( curso =>{
        const {imagen, titulo, precio, cantidad, id} = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src="${imagen}" width=100> </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href=# class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody.
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos del Tbody
function limpiarHTML(){
    //Forma Lenta
    // contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}