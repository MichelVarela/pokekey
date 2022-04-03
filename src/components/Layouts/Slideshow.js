import React, {useRef} from 'react';

import { MdWest, MdEast } from 'react-icons/md';

const Slideshow = ({children}) => {

    const slideshow = useRef(null);

    const next = () => {
        if (slideshow.current.children.length > 0) { // si el slideshow accediendo al current que nos devuelve la etiqueta y su contenido, tiene etiquetas hijas (es mayor a cero)
            
            const firstEl = slideshow.current.children[0]; // obtenemos primer elemento hijo
            
            slideshow.current.style.transition = `500ms ease-out all`; // establecemos transición para el slideshow

            const sizeSlide = slideshow.current.children[0].offsetWidth; // obtenemos el ancho del slide actual

            slideshow.current.style.transform = `translateX(-${sizeSlide}px)`; // movemos el slideshow

            const transition = () => { // reiniciamos la posicion del slideshow
                slideshow.current.style.transition = 'none';
                slideshow.current.style.transform = `translateX(0)`; // que vuelva a su posicion original (regresa a 0 al contrario de la linea 18)

                slideshow.current.appendChild(firstEl); // tomamos el primer elemento y lo enviamos al final

                slideshow.current.removeEventListener('transitionend', transition);
            };

            slideshow.current.addEventListener('transitionend', transition); // eventListener para cuando termina la animacion que pasamos como parametro
            
        }
    }
    
    const prev = () => {
        if (slideshow.current.children.length > 0) { // si el slideshow accediendo al current que nos devuelve la etiqueta y su contenido, tiene etiquetas hijas (es mayor a cero)

            const index = slideshow.current.children.length - 1; // obtenemos la cantidad de elementos -1
            
            const lastEl = slideshow.current.children[index]; // obtenemos el ultimo elemento hijo

            slideshow.current.insertBefore(lastEl, slideshow.current.firstChild); // insertamos el ultimo elemento antes de
            
            slideshow.current.style.transition = 'none';
            const sizeSlide = slideshow.current.children[0].offsetWidth; // obtenemos el ancho del slide actual
            slideshow.current.style.transform = `translateX(-${sizeSlide}px)`;

            setTimeout(() => {
                slideshow.current.style.transition = '500ms ease-out all';
                slideshow.current.style.transform = `translateX(0)`; // movemos el slideshow
            }, 30)
            
        }
    }


  return (
    <div className="contenedor-principal">
        <div className="contenedor-slideshow" ref={slideshow}>
            {children}
        </div>
        <div className='controles'>
            <button onClick={prev}> <MdWest/> </button>
            <button onClick={next}> <MdEast/> </button>
        </div>
    </div>
  )
}

export default Slideshow