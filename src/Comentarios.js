import React from 'react';
import arrow from '../assets/arrow-cmentarios.svg';
import './Comentarios.css';



function Comentarios({
    mesajeValue,
    setMesajeValue,
} ) {

    const [showInput, setShowInput] = React.useState(false);

    function changeClass() {
        setShowInput(showInput => !showInput);
    }

    let toggleClass = showInput ? ' wrapp-input-text-area': '';
    let toggleClassArrow = showInput ? ' imgArrow--active': '';

    const [insertMesaje, setInsertMesaje] = React.useState(null);

    //Guarde el vaolor del text area en un nuevo estado y lo pinta
    function addvaluetoState (dataValues) {
        //setMesajeValue(dataValues)
        setInsertMesaje(dataValues);
    }

    //Oculta el text area despues de guardar el dato del estado
    
    let changeclass = insertMesaje != null ? ' wrapp-inpitMesaje--hide' : '';

    let hiddeBtn = insertMesaje == null ? ' editBtn--hidde' : '';
    




    return (
        <div>
            <div 
            className='wrapp-tile-narrow'
            onClick={changeClass}>
            <h3>Agregar comentarios <span>(Opcional)</span></h3>
            <img 
            className={`imgArrow${toggleClassArrow}`}
            src={arrow}/>
            </div>
            <div className={`wrapp-input-text-area--hidde${toggleClass}`}>
                <h3>{insertMesaje}</h3>
                <div className={`wrapp-inpitMesaje${changeclass}`} >
                <textarea 
                className='text-area-input'
                type='text-area' 
                placeholder='Introduce tus comentarios' 
                value={insertMesaje}
                rows='4' 
                onChange={ (evetn) => {
                    setMesajeValue(evetn.target.value)
                } }
                />
                <button className='guardarComents'
                onClick={ 
                    () => {
                        addvaluetoState (mesajeValue),
                        console.log("se activo")                     
                    }                  
                }
                >
                Guardar
                </button>

                </div>
                
                <div>
                
                <p className={`editBtn${hiddeBtn}`}
                onClick={
                    () => {
                        setInsertMesaje(null);
                    }
                }
                >Editar comentarios</p>

            </div>
                
            </div>
            
        </div>
        
    );
}

export { Comentarios };







