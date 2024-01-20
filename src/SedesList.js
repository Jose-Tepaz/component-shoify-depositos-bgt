import './SedesList.css';
import { Spin } from 'antd';



function SedesList (props) {

    let detectedDirection = props.direcciones != null ? ' hiddendiv' : '';
    let yesDirection = props.direcciones != null ? ' show-div' : 'hiddendiv ';




    return (
        <div className="list-sedes">
            
         {/* wrapp a load spin */}
         <div className={`showdiv${detectedDirection}`}>
         <Spin tip="Loading" size="large">
             <div className="content" />
         </Spin>
         </div >

            <div className={`${yesDirection}`} >
                <h3>Dirección de depósito</h3>
                <ul>
                    {props.children}
                </ul>
            </div>

             
        </div>
        
    );
}

export { SedesList};