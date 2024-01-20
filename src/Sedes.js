import './Sedes.css';

function Sedes (props) {
    return(
        

        <li>
            <label form={props.name} className='WrappSedeSelect'> 
            <input 
            type="radio" 
            id={props.name} 
            value={props.name} 
            name="sedes"
            onClick={
                (event) => {
                    props.setAdressSelect(event.target.value);
                  
                }
            }
            />
            <span className='TextSelect'>
            {props.name} 
            </span>
            </label>        
        </li>
        
    );
}

export {Sedes};