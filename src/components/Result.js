import React from 'react';
import { useStore } from 'easy-peasy';
import calculator from '../utils/calculator.js'

function Result() {
    const area = useStore(state => state.input.area)
    const buildingType = useStore(state => state.input.buildingType)
    const consumption = useStore(state => state.input.consumption)
    const setupType = useStore(state => state.input.setupType)
    const roofDegrees = useStore(state => state.input.roofDegrees)
    const orientation = useStore(state => state.input.orientation)
    
    let res = calculator(buildingType, consumption, setupType, area, roofDegrees, orientation)

    if(!res || !res.tasuvus){return <div></div>}
   

    return <div className="Result">
       
       <hr/>
       Paneelide arv: {res.paneelideArv} <Br/>
       Võimsus: {Math.round(res.võimsus * 100) / 100} kW <Br/>
       Tarbimine: {Math.round(res.esimeneAasta.tarbimine)} kWh<Br/>
       Aastane toodang: {Math.round(res.esimeneAasta.kogutoodang)} kWh <Br/>
       Sellest oma tarbeks: {Math.round(res.esimeneAasta.omaTarbeks)} kWh ({res.esimeneAasta.omatarbimiseProtsent}%)<Br/>
       Sellest võrku: {Math.round(res.esimeneAasta.müükVõrku)} kWh ({res.esimeneAasta.müükVõrkuProtsent}%)<Br/>
       <hr/>
       Maksumus (KM-ga): {Math.round(res.tasuvus.maksumus)} €<Br/>
       Eeldatav sääst 1. aastal: {Math.round(res.tasuvus.säästEsimeselAastal)} €<Br/>
       Eeldatav sääst eluea (25. aastat) peale: {Math.round(res.tasuvus.säästKokku)} €<Br/>
       Kasum eluea (25. aastat) peale: {Math.round(res.tasuvus.kasum)} €<Br/>
       Tasuvusaeg: {Math.round(res.tasuvus.tasuvusaeg * 10) / 10} aastat<Br/>
       <hr/>
       Andmed 1. aasta graafiku jaoks: {JSON.stringify(res.esimeneAasta.kalender)}<Br/>
       <hr/>
       Andmed 25 aasta tasuvusgraafiku jaoks: {JSON.stringify(res.tasuvus.data, null, 4)}
    </div>
}

function Br(){
    return <br></br>
}

export default Result;