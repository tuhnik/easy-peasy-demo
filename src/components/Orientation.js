import React from 'react';
import { useStore, useActions } from 'easy-peasy';


function Orientation() {

    const orientation = useStore(state => state.input.orientation)
    const changeOrientation = useActions(actions => actions.input.changeOrientation)

    function handleInput(e) {
        let val = parseInt(e.target.value || 0)
        changeOrientation(val)
    }

    return <div className="Orientation">
        Orientatsioon: 
        <input type="range" min={-90} max={90} step="30" value={orientation} onChange={handleInput} className="slider"/>
        {orientation} kraadi
    </div>
}

export default Orientation;
