import React from 'react';
import { useStore, useActions } from 'easy-peasy';


function Consumption() {

    const consumption = useStore(state => state.input.consumption)
    const changeConsumption = useActions(actions => actions.input.changeConsumption)
    const type = useStore(state => state.input.buildingType)
    const changeBuildingType = useActions(actions => actions.input.changeBuildingType)

    function handleInput(e){
        changeConsumption(e.target.value)
    }

    function handleSelect(e){
        changeBuildingType(e.target.value)
    }

    return <div className="Consumption">
        <b>Hoone tüüp:</b>
        <select onChange={handleSelect} value={type}>
            <option value="suvila">Suvila</option>
            <option value="elektriküte">Elektriküttega eramu</option>
            <option value="muu">Muu kütteliigiga eramu</option>
        </select><br/>
        Täpsemaks arvutuseks sisesta tarbimine: 
        <input onChange={handleInput} value={consumption} style={{width: "10em"}}></input>
    </div>
}

export default Consumption;
