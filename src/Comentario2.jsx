import React, { useState, useEffect } from 'react';
import './Comentarios.css';
import arrow from '../assets/arrow-cmentarios.svg';
import Swal from 'sweetalert2';

const Comentario2 = ({mesajeValue, setMesajeValue,}) => {
  const [selectedSKU, setSelectedSKU] = useState('Todo el pedido'); //Guarda el SKU
  const [comment, setComment] = useState(''); //Guarta el dato del text area
  const [comments, setComments] = useState([]); //Une el Sku y el Text area
  const [editIndex, setEditIndex] = useState(null); // Para controlar qué comentario está siendo editado
  const [disabledSKUs, setDisabledSKUs] = useState([]); // Para rastrear los SKU deshabilitados

  //despliega todo el componente de select
  const [isOpenComponentComent, setIsOpenComponentComent] = useState(false);

  //Despliega el componente select + textArea
  const [isOpenSelectTextArea, setIsOpenSelectTextArea] = useState(true);

 

  //Descpliega el select
  const [isOpen, setIsOpen] = useState(false);

  //Descpliega el select
  const [nuevoComentario, setNuevoComentario] = useState(false);


  const [finalOptions, setFinalOptions] = useState([
    'Todo el pedido',
    
  ]);

//Opciones de SKU, este array debe de construirse en shopify, por lo tanto antes de mandar a shopify, ocultamos esto
  //const skuOptions = [
  //  'SKU 1513-1531',
  //  'SKU 1513-1532',
  //  'SKU 1513-1533',
  //  'SKU 1513-1534',
  //  'SKU 1513-1535',
  //];

  useEffect(() => {
    
    setFinalOptions((prevOptions) => [...prevOptions, ...skuOptions]);

},[]);

  // Función para manejar el select de SKU
  const handleSKUSelect = (e) => {
    setSelectedSKU(e.target.value);
  };

  const handleSKUSelect2 = (option) => {
    setSelectedSKU(option);
    setIsOpen(!isOpen)

  };


  // Función para manejar el textarea de comentarios
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Función para guardar el SKU y el comentario
  const handleSave = () => {
    if (selectedSKU && comment) {
      if (editIndex !== null) {
        // Si estamos en modo edición, actualizamos el comentario en esa posición
        const updatedComments = [...comments];
        updatedComments[editIndex] = { sku: selectedSKU, comment };
        setComments(updatedComments);
        setMesajeValue(updatedComments); //Envia el comentario al componente principal
        setEditIndex(null); // Salimos del modo de edición
        setIsOpenSelectTextArea(!isOpenSelectTextArea) //Oculta / muestra select + textatea
        setNuevoComentario(!nuevoComentario) //Muestra botón agregar nuevo comentario
        
      } else {
        // Si no estamos en modo edición, agregamos un nuevo comentario
        setComments([...comments, { sku: selectedSKU, comment }]);
        setMesajeValue([...comments, { sku: selectedSKU, comment }]); //Envia el comentario al componente principal
        setDisabledSKUs([...disabledSKUs, selectedSKU]); // Deshabilitamos el SKU seleccionado
        setIsOpenSelectTextArea(!isOpenSelectTextArea) //Oculta / muestra select + textatea
        setNuevoComentario(!nuevoComentario) //Muestra botón agregar nuevo comentario
      }
      setSelectedSKU(''); // Limpiar selección de SKU
      setComment(''); // Limpiar textarea de comentario
    } else {
      alert('Por favor selecciona un SKU y agrega un comentario.');
    }
  };

  // Función para manejar la edición de un comentario
  const handleEdit = (index) => {
    const commentToEdit = comments[index];
    setSelectedSKU(commentToEdit.sku);
    setComment(commentToEdit.comment);
    setEditIndex(index); // Almacenamos el índice del comentario que estamos editando
    setIsOpenSelectTextArea(true) //Oculta / muestra select + textatea
    setNuevoComentario(false);
  };

  // Función para eliminar un comentario

const alertWhantDelet =() => {
  alertaDelete();
}

  const handleDelete = () => {

    const commentToDelete = comments[editIndex];
    
    const updatedComments = comments.filter((_, i) => i !== editIndex);
    setComments(updatedComments);
    setMesajeValue(updatedComments); //Envia el comentario al componente principal

     // Rehabilitamos el SKU eliminado
     setDisabledSKUs(disabledSKUs.filter((sku) => sku !== commentToDelete.sku));

    setSelectedSKU('');
    setComment('');
    setEditIndex(null);

    setIsOpenSelectTextArea(false) //Oculta / muestra select + textatea
    setNuevoComentario(true);


    
  };

  const isNuevoComentario = () => {
    setIsOpenSelectTextArea(!isOpenSelectTextArea)
    setNuevoComentario(!nuevoComentario)

  }

  const alertaDelete=()=>{
    Swal.fire({
    title: "¿Quieres eliminar el comentario?",
    html: "Se eliminará y no se enviará en tu cotización.",
    imageUrl: "https://cdn.shopify.com/s/files/1/0588/7721/4871/files/icon-soft-alert.svg?v=1728425808",
    imageWidth: 60,
    imageHeight: 60,
    showCancelButton: true,
    cancelButtonText: `Cancelar`,
    showCloseButton: false,
    confirmButtonText: `Si, eliminar`,
    reverseButtons: true,
    customClass: {
      popup: 'popAlert',
      title: 'titlePopup',
      htmlContainer: 'textpopup',
      confirmButton: 'confirmBtn',
      cancelButton: 'closeBtn',
    }
}).then((result) => {
    if (result.isConfirmed) {
      handleDelete();
    }  else{
      
    }
    
  
});
}

  return (
    
    
    <div style={{  padding: '0', width: '100%' }}>

      <div className='wrapp-tile-narrow' onClick={() => setIsOpenComponentComent(!isOpenComponentComent)}>
        <h3 className='title-card_component'>Agregar comentarios</h3>

        <div
                  style={{
                    transform: isOpenComponentComent ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    marginLeft: '10px',
                    marginBottom: '0px',
                  }}
                >
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://org/2000/svg">
                    <path d="M1 1L7 7L13 1" stroke="#9E9E9E" stroke-widstroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                </div>
        
      </div>



      {/* Mostrar la lista de SKU y comentarios */}
      {isOpenComponentComent && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            
            {comments.length > 0 ? (
              comments.map((entry, index) => (
            <div 
            key={index} 
            className='cardComentAdded'
            >
              <p style={{ flex: 1 }}>
                <span>{entry.sku}</span>: {entry.comment}
              </p>
              <div>
                <button
                  onClick={() => handleEdit(index)}
                  style={{
                    padding: '0',
                    marginLeft: '10px',
                    cursor: 'pointer',
                    border: 'none',
                    background: 'transparent',
                    marginRight: '5px',
                  }}
                >
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 3H2.66667C2.22464 3 1.80072 3.17559 1.48816 3.48816C1.17559 3.80072 1 4.22464 1 4.66667V16.3333C1 16.7754 1.17559 17.1993 1.48816 17.5118C1.80072 17.8244 2.22464 18 2.66667 18H14.3333C14.7754 18 15.1993 17.8244 15.5118 17.5118C15.8244 17.1993 16 16.7754 16 16.3333V10.5"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.9227 1.52798C15.2607 1.18992 15.7193 1 16.1973 1C16.6754 1 17.134 1.18992 17.472 1.52798C17.8101 1.86605 18 2.32456 18 2.80265C18 3.28075 17.8101 3.73926 17.472 4.07732L9.39912 12.1502L6 13L6.84978 9.60088L14.9227 1.52798Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                </button>
              </div>
            </div>
          ))
          ) : (
          <p></p>
          )}
          </div>

          {isOpenSelectTextArea && (
            <div className='wrapp-select-textArea'>
              <div className='wrapp-select-sku'>
              <p className='title-card_component'>El comentario   refiere a</p>
              <p className='nonInfo'>Selecciona un SKU para vincularlo.</p>
              </div>
              <div className='wrapp-all-component-select' >
              <div
                onClick={() => setIsOpen(!isOpen)}
                className='wrapp-select'

              >
                {selectedSKU || 'Selecciona una opción'}
        
                <div
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    marginLeft: '10px',
                    marginBottom: '0px',
                  }}
                >
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://org/2000/svg">
                    <path d="M1 1L7 7L13 1" stroke="#9E9E9E" stroke-widstroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                </div>

              </div>
              {isOpen && (
                <ul className='options-select'>
                  {finalOptions.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => 
                        handleSKUSelect2(option)
                        }
                      style={{
                        backgroundColor: selectedSKU === option ? '#F5F5F5' : 'transparent',
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}

              </div>
               {/* Textarea para agregar comentario */}
              <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Escribe tu comentario"
               className='text-area-input'
               rows='4' 
              ></textarea>

              {/* Botón para guardar o actualizar */}
              <div className='wrapp-btns-comentas'>
              <button onClick={handleSave} className='guardarComentsBtn'>
                {editIndex !== null ? 'Guardar cambios' : 'Guardar'}
              </button>
              
                <button
                //onClick={() => handleDelete()}
                onClick={() => alertWhantDelet()}
                style={{
                  display: editIndex !== null ? 'block' : 'none',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  color: '#1C83E3',
                  border: 'none',
                  borderRadius: '4px',
                  fontFamily: 'Neue Montreal',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
                >
                  Eliminar
                </button>

              
              
              </div>
            </div>
          )}
          {nuevoComentario && (
            <button
                onClick={() => isNuevoComentario()}
                style={{
                  
                  padding: '8px 16px',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  color: '#1C83E3',
                  border: 'none',
                  borderRadius: '4px',
                  fontFamily: 'Neue Montreal',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
                >
                  Agregar comentario
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export { Comentario2 };