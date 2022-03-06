class Pelicula{
    constructor(nombre, duracion, categoria, url){
        this.nombre = nombre;
        this.duracion = duracion;
        this.categoria = categoria;
        this.url = url;
    }
}

const pelicula1 = new Pelicula("Steve Jobs", "2 horas", "Drama", "https://www.cinevistablog.com/wp-content/uploads/2013/11/resena-de-jobs-la-pelicula.jpg");
const pelicula2 = new Pelicula("Red Social", "1 hora y 30 minutos", "Drama","https://assets.cinepolisklic.com/cmsklicia/movieimages/la-red-social/poster_originalsize_250X375.jpg");
const pelicula3 = new Pelicula("Matrix", "2 horas y 10 minutos", "ciencia ficción", "https://pics.filmaffinity.com/Matrix-155050517-large.jpg");


class comprador{
    constructor(id, nombre, telefono){
        this.id = id;
        this.nombre = nombre;
        this.telefono = telefono;
    }
}

let peliculasLista =[pelicula1, pelicula2, pelicula3];
let continuar = document.getElementById("form")
let peliculas = document.getElementById("peliculas");
let usuario = document.getElementById("usuario");
let opciones = document.getElementById("opciones");
let siguiente = document.getElementById("siguiente");
let siguiente2 = document.getElementById("siguiente2");
let comidaText = document.getElementById("comida");
let persona,cantidad1;
let pagar=[];


siguiente.classList.add("visually-hidden");
siguiente2.classList.add("visually-hidden");
opciones.classList.add("visually-hidden");
comidaText.classList.add("visually-hidden");


continuar.addEventListener('submit', (e)=>{
    e.preventDefault();
    opciones.classList.remove("visually-hidden");
    persona = new comprador(
        document.getElementById("identificacion").value,
        document.getElementById("nombre").value,
        document.getElementById("telefono").value
    );

    usuario.classList.add("visually-hidden")
    peliculas.innerHTML += `<h2 class="text-center">Peliculas</h2>`;
    peliculasLista.forEach((pel, indice) =>{
        peliculas.innerHTML += `
        <div class="col d-flex justify-content-evenly card m-4" id="pel${indice} style="width: 4rem; ">
            <img src=${pel.url} class="card-img-top imagen" style="width: 100px;"alt="...">
            <div class="card-body text-black">
                <h5 class="card-title ">${pel.nombre}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Categoria: ${pel.categoria}</li>
                <li class="list-group-item">Duración: ${pel.duracion}</li>
            </ul>
        </div>
       `
    })
    opciones.innerHTML+=`
            <div class="col-5 order-1">
                <h4 class="mb-3 ">Escoja su pelicula favorita</h4>
                <div class="form-check form-check-inline mb-3">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="pelicula1" value="option1">
                    <label class="form-check-label" for="inlineRadio1">Steve Jobs</label>
                </div>
                <div class="form-check form-check-inline mb-3">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="pelicula2" value="option2">
                    <label class="form-check-label" for="inlineRadio2">Red Social</label>
                </div>
                <div class="form-check form-check-inline mb-3">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="pelicula3" value="option3">
                    <label class="form-check-label" for="inlineRadio3">Matrix</label>
                </div>
                <h4 class="mb-3">Escoja su tipo de entrada</h4>
                <div class="form-check form-check-inline mb-3">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions2" id="tipo1" value="option1">
                    <label class="form-check-label" for="inlineRadio1">ECONOMICO -$50.000</label>
                </div>
                <div class="form-check form-check-inline mb-3">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions2" id="tipo2" value="option2">
                    <label class="form-check-label" for="inlineRadio2">NORMAL -$70.000</label>
                </div>
                <div class="form-check form-check-inline mb-3">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions2" id="tipo3" value="option3">
                    <label class="form-check-label" for="inlineRadio3">VIP -$100.000</label>
                </div>
            </div>
    `
    siguiente.classList.remove("visually-hidden");
})


let pelicula =0,tipo=0;
let cantidad, cantidadCombo;
let alerta=document.getElementById("alerta");
let continuar2 = document.getElementById("continuar2");
let vPelicula, vTipo, vComida ;
let lista=[];

continuar2.addEventListener('click',() =>{
    vPelicula= validarPelicula();
    vTipo = validarTipo();
    vComida = validarComida();
    if( vPelicula && vTipo && vComida){
        cantidad = document.getElementById("cantidad").value;
        tipoPelicula(vPelicula);
        tipoBoletas(vTipo);
        opciones.classList.add("visually-hidden");

        if(vComida==2){
            recibo();
        }else{
            comidaText.classList.remove("visually-hidden");
            comida();
        }
    }else{
        alerta.innerHTML=`<div class="alert alert-warning" role="alert"">Debe Ingresar todos los campos</div>`;
        setTimeout(() =>{alerta.innerHTML=``;}, 3000);
    }  
});

function validarPelicula(){
    for(let i =1; i<4; i++){
        pelicula=document.getElementById(`pelicula${i}`);
        if(pelicula.checked){
            return i;
        }
    }
}
function validarTipo(){
    for(let i =1; i<4; i++){
        tipo=document.getElementById(`tipo${i}`);
        if(tipo.checked){
            return i;
            
        }
    }
}
function validarComida(){
    for(let i =1; i<3; i++){
        tipo=document.getElementById(`comida${i}`);
        if(tipo.checked){
            return i;       
        }
    }
}


function tipoPelicula(valor){
    switch(valor){
        case 1:
            lista.push(pelicula1.nombre);
            break;
        case 2:
            lista.push(pelicula2.nombre);
            break;
        case 3:
            lista.push(pelicula3.nombre);
            break;
    }
}

function tipoBoletas(valor){
    switch(valor){
        case 1:
            lista.push("Economico");
            pagar.push(50000*cantidad);
            break;
        case 2:
            lista.push("Normal");
            pagar.push(70000*cantidad);
            break;
        case 3:
            lista.push("VIP");
            pagar.push(100000*cantidad);
            break;
    }
}


function comida(){
    siguiente.classList.add("visually-hidden");
    siguiente2.classList.remove("visually-hidden");
    comidaText.innerHTML+=`
            <div class="col-5 order-1">
                <h4 class="mb-3 ">Combos</h4>
                <div class="form-check form-check-inline mb-3">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="combo1" value="option1">
                    <label class="form-check-label" for="inlineRadio1">Gaseosa-papas($15000)</label>
                </div>
                <div class="form-check form-check-inline mb-3">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="combo2" value="option2">
                    <label class="form-check-label" for="inlineRadio2">Gaseosa-Hamburguesa($25000)</label>
                </div>
                <div class="form-check form-check-inline mb-3">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="combo3" value="option3">
                    <label class="form-check-label" for="inlineRadio3">Agua-ensalada($12000)</label>
                </div>
                <div class="form-check form-check-inline mb-3">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="combo4" value="option4">
                    <label class="form-check-label" for="inlineRadio4">Gaseosa-crispetas$($20000)</label>
                </div>
            </div>
            `
}

siguiente2.addEventListener('click',()=>{
    cantidadCombo = document.getElementById("cantidadCombo").value;
    combosComida()
})

let combo, tipoCombo=0,ctext;

function combosComida(){
    for(let i =1; i<5; i++){
        combo=document.getElementById(`combo${i}`);
        if(combo.checked){
            tipoCombo=i;       
        }
    }
    switch(tipoCombo){
        case 1:
            pagar.push(15000*cantidadCombo);
            ctext ="Gaseosa-papas";
            break;
        case 2:
            pagar.push(25000*cantidadCombo);
            ctext ="Gaseosa-Hamburguesa";
            break;
        case 3:
            pagar.push(12000*cantidadCombo);
            ctext ="Agua-ensalada";
            break;
        case 4:
            pagar.push(20000*cantidadCombo);
            ctext ="Gaseosa-crispetas";
            break;  
    }
    if(tipoCombo!=0){
        lista.push(cantidadCombo);
        lista.push(ctext);
    }
    siguiente2.classList.add("visually-hidden");
    comidaText.classList.add("visually-hidden");
    recibo();
}


let reciboText = document.getElementById("recibo");
let totalText = document.getElementById("total");
let valorTotal= 0;


function recibo(){
    //Ordena los numeros del array
    pagar.sort(function(a, b){return a - b});
    
    siguiente.classList.add("visually-hidden");
    peliculas.innerHTML=``;
    reciboText.innerHTML=`<h2 class="text-center">Recibo de Pago</h2>`;
    reciboText.innerHTML+=`
    <br>
    <h3 class="text-center">Señ@r ${persona.nombre} identificad@ con el numero ${persona.id}</h3>
    <br>
    <h3 class="text-start ms-5">Ha seleccionado:</h3>
    <h3 class="text-center ">La pelicula ${lista[0]}</h3>
    <h3 class="text-center ">${cantidad} boletos de tipo ${lista[1]}</h3>
    `;
    if(tipoCombo!=0){
        reciboText.innerHTML+=`
    <h3 class="text-center ">${lista[2]} combos de ${lista[3]}</h3>
    `;
    }
    reciboText.innerHTML+=`
    <h3 class="text-start ms-5">Cuenta:</h3>
    `;
    pagar.forEach(valor=>{
        valorTotal += valor;
        totalText.innerHTML+= `
        <h3 class="text-center">$${valor}</h2>`;
    });
    totalText.innerHTML+= `
        <hr>
        <h3 class="text-start ms-5">Total a pagar:</h3>
        <h3 class="text-center">$${valorTotal}</h2>`;
}