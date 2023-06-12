//AOS scroll animation
//Choreographer gradient scroll animation
//Granim gradient animation

 //Importar Choreographer
 /* import '../node_modules/choreographer-js/dist/choreographer.min.js';  */
 //ó usar
 import Choreographer from 'choreographer-js'; //Webpack soluciona los errores de importación del módulo
 
 import './style.css';
 import IMGimagenProducto from './HeaderHorizontalIMG2.svg'; 
 import IMGlogo from './Logo.svg'; 
 import IMGarrowScroll from './Scroll_Arrow.svg';
import cajaImagen0 from './IMG_8557.JPG';
 import cajaImagen1 from './IMG_8179.png';
 import cajaImagen2 from './IMG_8166.png';
 import cajaImagen3 from './IMG_8205.png';
 import cajaImagen4 from './IMG_8150.png';

//Asignar imagenes
const imagenProducto = document.getElementById('imagenProducto');
imagenProducto.src = IMGimagenProducto;
const logo = document.getElementById('Logo');
logo.src = IMGlogo;
const arrowScroll = document.getElementById('arrow-scroll');
arrowScroll.src = IMGarrowScroll;
const cajaImagen = document.getElementById('caja-productos').querySelectorAll('img');
 cajaImagen[0].src = cajaImagen0; 
 cajaImagen[1].src = cajaImagen1;
 cajaImagen[2].src = cajaImagen2; 
 cajaImagen[3].src = cajaImagen3; 
 cajaImagen[4].src = cajaImagen4;  



//Animaciones
var imageHeader = new Choreographer({
  animations: [
    {
      range: [-1, window.innerHeight * 0.5],
      selector: '#imagenProducto',
      type: 'scale',
      style: 'opacity',
      from: 1,
      to: 0.5
    }
  ]
});

var scrollArrow = new Choreographer({
  animations: [
    {
      range: [-1, window.innerHeight * 0.8],
      selector: '#arrow-scroll',
      type: 'scale',
      style: 'opacity',
      from: 1,
      to: 0
    }
  ]
});

var productBoxGradient = new Choreographer({
  animations: [
    {
      range: [window.innerHeight * 0.4, window.innerHeight * 0.9],
      selector: '#Producto1',
      type: 'scale',
      style: 'opacity',
      from: 0,
      to: 1
    },
    {
      range: [window.innerHeight * 1, window.innerHeight * 1.5],
      selector: '#Producto2',
      type: 'scale',
      style: 'opacity',
      from: 0,
      to: 1
    }
  ]
});

var productBoxLeft = new Choreographer({
  animations: [
    {
      range: [window.innerHeight * 0.4, window.innerHeight * 0.9],
      selector: '#Producto1',
      type: 'scale',
      style: 'transform:translateX',
      from: -10,
      to: 0,
      unit: '%'
    }
  ]
});

var productBoxRight = new Choreographer({
  animations: [
    {
      range: [window.innerHeight * 1, window.innerHeight * 1.5],
      selector: '#Producto2',
      type: 'scale',
      style: 'transform:translateX',
      from: 10,
      to: 0,
      unit: '%'
    }
  ]
});
      
window.addEventListener('scroll', () => {
  // then, use the scroll position (pageYOffset) to base the animations off of
  imageHeader.runAnimationsAt(window.pageYOffset)
  scrollArrow.runAnimationsAt(window.pageYOffset)
  productBoxGradient.runAnimationsAt(window.pageYOffset)
  productBoxLeft.runAnimationsAt(window.pageYOffset)
  productBoxRight.runAnimationsAt(window.pageYOffset)
});




//Ajustar imagenProducto
function getResolutionHeight() {
  return document.documentElement.clientHeight;
/*     var width = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  var height = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight; */
}

function getResolutionWidth() {
   return document.documentElement.clientWidth; 
}

imagenProducto.onload = function(){ //Si no se espera a cargar, toma que su width es 0 porque el webpack aún no lo ha renderizado
  imagenProducto.height = getResolutionHeight();

  //Centrar imagen en pantalla
  imagenProducto.style.marginLeft = -1 * (imagenProducto.width - getResolutionWidth())/2 + "px";
}



const loading = document.getElementById('loading');
loading.style.height = getResolutionHeight() + 'px';




//Gradient al seleccionar los productos
const productosLista = document.getElementById('Productos-lista').getElementsByClassName('producto-informacion');

//Izquierda
productosLista[0].addEventListener("mouseover", productosListaOpacityUp);

//Centro
productosLista[1].addEventListener("mouseover", productosListaOpacityUp);

//Derecha
productosLista[2].addEventListener("mouseover", productosListaOpacityUp);

function productosListaOpacitydown(){
  for(let i=0; i < productosLista.length; i++){
    /* productosLista[i].style.opacity = 0.5; */
    productosLista[i].animate( //Opacidad 0.5 con gradiante
      {opacity: "0.5"},
      {
        duration:200,
        fill:"forwards",
      }
    )
  }
}

function productosListaOpacityUp(){
productosListaOpacitydown();
/* this.style.opacity = 1; */
this.animate( //Opacidad 1 con gradiante
  {opacity: "1"},
  {
    duration:200,
    fill:"forwards", //Se mantiene en el último estado de la animación
  }
)
}

 




/* Service Worker - Caché */
if('serviceWorker' in navigator){ 
  window.addEventListener('load', ()=>{ 
      navigator.serviceWorker.register('./service-worker.js').then(registration =>{
          console.log("SW registrado", registration);
      }).catch(err=>{
          console.log("SW no registrado", err)
      }); 
  });
}