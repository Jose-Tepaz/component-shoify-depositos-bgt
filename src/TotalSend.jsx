import './TotalSend.css';

// !!-- Se oculta al enviar a produccion --!
//const totalsend = "5"
// !!--------------------------!!//

function TotalSend () {
    return (
        <div>
            <div className='wrapp-head-total'>
            <p className='title-card_component'>Total a cotizar </p>
            <p className='title-card_component'>{totalsend} productos</p>
            </div>
            
        </div>
    )
}
export {TotalSend};
// <button className='BtnSend'>Pedir cotización</button> 