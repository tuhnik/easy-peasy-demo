import React from 'react';
import { useStore, useActions } from 'easy-peasy';


function Area() {

    const area = useStore(state => state.input.area)
    const changeArea = useActions(actions => actions.input.changeArea)

    function handleInput(e) {
        let val = parseInt(e.target.value || 0)
        changeArea(val)
    }

    return <div className="Area">
        Pindala
        <input onChange={handleInput} value={area}></input>
    </div>
}

export default Area;
