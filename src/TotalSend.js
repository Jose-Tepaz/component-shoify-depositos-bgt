import './TotalSend.css';

// !!-- Se oculta al enviar a produccion --!
//const totalsend = "5"
// !!--------------------------!!//

function TotalSend () {
    return (
        <div>
            <div className='wrapp-head-total'>
            <p>Total a cotizar </p>
            <p>{totalsend} productos</p>
            </div>
            
        </div>
    )
}
export {TotalSend};
// <button className='BtnSend'>Pedir cotización</button> 