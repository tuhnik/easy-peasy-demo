import React from 'react';
import { useStore, useActions } from 'easy-peasy';


function SetupType() {

    const setupType = useStore(state => state.input.setupType)
    const changeSetupType = useActions(actions => actions.input.changeSetupType)

    function handleChange(e) {
        let val = e.target.value
        changeSetupType(val)
    }

    return <div className="SetupType">
        Paigaldusviis
        <select onChange={handleChange} value={setupType}>
            <option value="1.7">Viilkatus</option>
            <option value="3">Lamekatus</option>
            <option value="1.5">Maapind</option>
        </select>
    </div>
}

export default SetupType;
