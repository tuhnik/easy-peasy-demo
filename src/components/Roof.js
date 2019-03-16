import React from 'react';
import { useStore, useActions } from 'easy-peasy';


function Roof() {

    const roofDegrees = useStore(state => state.input.roofDegrees)
    const changeRoofDegrees= useActions(actions => actions.input.changeRoofDegrees)

    function radioChanged(e){
        let val = parseInt(e.target.value)
        changeRoofDegrees(val)
    }

    return <div className="Roof">
        <form>
            <div className="radio"> <label><input onChange={radioChanged} type="radio" value="15" checked={ roofDegrees===15 } /> 15° </label> </div>
            <div className="radio"> <label><input onChange={radioChanged} type="radio" value="25" checked={ roofDegrees===25 } /> 25° </label> </div>
            <div className="radio"> <label><input onChange={radioChanged} type="radio" value="30" checked={ roofDegrees===30 } /> 30° </label> </div>
            <div className="radio"> <label><input onChange={radioChanged} type="radio" value="35" checked={ roofDegrees===35 } /> 35° </label> </div>
        </form>  
    </div>
}

export default Roof;
