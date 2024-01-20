import './Idinput.css';



function IdInput({
    searchValue,
    setSearchValue,
}) {
    return (
        <div className='Component-input'>
            <h3>ID de cliente</h3>
            <input 
            placeholder = "Introduce ID" 
            value={searchValue}
            onChange={
                (event) => {
                    setSearchValue(event.target.value);
                  
                }
            }
            />
            <div className='divider'></div>
        </div>     
        );       
}

export { IdInput};