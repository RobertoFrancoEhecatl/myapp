
import { useState } from 'react'
import { useEffect } from 'react';
import Moveable from "react-moveable";

import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  /* Variables donde se almacenara la imagen */
  const [imageUrl, setImageUrl] = useState();

  
  /* Porque se recomienda el uso del arreglo vacío en useEffect? */
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((dog) => {
        setImageUrl(dog.message); // ⬅️ Guardar datos
        setIsLoading(false); // ⬅️ Desactivar modo "cargando"
      });
    }, []);

    
    if (isLoading) { // ⬅️ si está cargando, mostramos un texto que lo indique
      return (
        <div className="App">
          <h1>Cargando...</h1>
        </div>
      );
    }

    return (
      <div className="App">
        <Moveable target={document.querySelector(".image")}
          container={null}
          origin={true}

          /* Resize event edges */
          edge={false}

          /* draggable */
          draggable={true}
          throttleDrag={0}
          onDragStart={({ target, clientX, clientY }) => {
              console.log("onDragStart", target);
          }}
          onDrag={({
              target,
              beforeDelta, beforeDist,
              left, top,
              right, bottom,
              delta, dist,
              transform,
              clientX, clientY,
          }: OnDrag) => {
              console.log("onDrag left, top", left, top);
              // target!.style.left = `${left}px`;
              // target!.style.top = `${top}px`;
              console.log("onDrag translate", dist);
              target!.style.transform = transform;
          }}
          onDragEnd={({ target, isDrag, clientX, clientY }) => {
              console.log("onDragEnd", target, isDrag);
          }}

          /* When resize or scale, keeps a ratio of the width, height. */
          keepRatio={true}

          /* resizable*/
          /* Only one of resizable, scalable, warpable can be used. */
          resizable={true}
          throttleResize={0}
          onResizeStart={({ target , clientX, clientY}) => {
              console.log("onResizeStart", target);
          }}
          onResize={({
              target, width, height,
              dist, delta, direction,
              clientX, clientY,
          }: OnResize) => {
              console.log("onResize", target);
              delta[0] && (target!.style.width = `${width}px`);
              delta[1] && (target!.style.height = `${height}px`);
          }}
          onResizeEnd={({ target, isDrag, clientX, clientY }) => {
              console.log("onResizeEnd", target, isDrag);
          }}

          /* scalable */
          /* Only one of resizable, scalable, warpable can be used. */
          scalable={true}
          throttleScale={0}
          onScaleStart={({ target, clientX, clientY }) => {
              console.log("onScaleStart", target);
          }}
          onScale={({
              target, scale, dist, delta, transform,
              clientX, clientY,
          }: OnScale) => {
              console.log("onScale scale", scale);
              target!.style.transform = transform;
          }}
          onScaleEnd={({ target, isDrag, clientX, clientY }) => {
              console.log("onScaleEnd", target, isDrag);
          }}
        />
        <img className='image' src={imageUrl} alt="Imagen de perrito aleatoria" />

    </div>
    );

}

export default App
