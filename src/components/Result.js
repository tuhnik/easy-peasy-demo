import React from 'react';
import { useStore } from 'easy-peasy';
import calculator from '../utils/calculator.js'
import {Doughnut, Bar, Line} from 'react-chartjs-2';

function Result() {
    const area = useStore(state => state.input.area)
    const buildingType = useStore(state => state.input.buildingType)
    const consumption = useStore(state => state.input.consumption)
    const setupType = useStore(state => state.input.setupType)
    const roofDegrees = useStore(state => state.input.roofDegrees)
    const orientation = useStore(state => state.input.orientation)
    
    let res = calculator(buildingType, consumption, setupType, area, roofDegrees, orientation)
    

    const data = {
        labels: ['Oma tarbeks - '+ res.esimeneAasta.omatarbimiseProtsent + '%', 'Müük võrku - '+(100 - res.esimeneAasta.omatarbimiseProtsent)+ '%'],
        
        datasets: [{
            data: [res.esimeneAasta.omatarbimiseProtsent, 100 - res.esimeneAasta.omatarbimiseProtsent],
            backgroundColor: ['#e89722', '#5cbd4c'] }]
    }

    let years = [2019]
    for(let i=1; i<26; i++){
        years.push(2019+i)
    }

    const tasuvusandmed = {
        labels: years,
        datasets: [{data: res.tasuvus.data.map(el=>Math.round(el)), 
            label: "EUR",
            backgroundColor: "#ff889fc7"
        },        
        ]
    }
    console.log(res)
    const tasuvusoptions = {
        scales: {
            yAxes: [{
                ticks: {min: -Math.floor(res.tasuvus.maksumus), callback: function(value, index, values) {
                    return value + " €";
                }}
            }]
        }
    }

    let cal = res.esimeneAasta.kalender
    let cal_months = []
    let cal_tarbimine = []
    let cal_omatarbimine = []
    let cal_võrku = []

    for (let el in cal){
        cal_months.push(el)
        cal_tarbimine.push(cal[el].tarbimine)
        cal_omatarbimine.push(cal[el].omatarbimine)
        cal_võrku.push(cal[el].võrku)
    }

    const aastaoptions = {
        scales: {
            yAxes: [{
                ticks: {callback: function(value, index, values) {
                    return value + " kWh"
                }}
            }]
        }
    }
    const aastaandmed = {
        labels: cal_months,
        datasets: [
        {data: cal_tarbimine.map(el=>Math.round(el)), 
            label: "Senine tarbimine (kWh)",
            type: "bar",
            backgroundColor: "#03a9f444",
            borderColor: "#03a9f4",
            borderWidth: 1
        },
        {data: cal_omatarbimine.map(el=>Math.round(el)), 
            label: "Ise tarbitud (kWh)",
            type: "line",
            backgroundColor: "#e89722"
        },
        {data: cal_võrku.map(el=>Math.round(el)), 
            label: "Võrku müüdud (kWh)",
            type: "line",
            backgroundColor: "#5cbd4ca6"
        }   
        ]
    }
   
    return <div className="Result">
       <hr/>
      <div className="result-first">
        <div>
        Paneelide arv: {res.paneelideArv} <Br/>
        Võimsus: {Math.round(res.võimsus * 100) / 100} kW <Br/>
        Tarbimine: {Math.round(res.esimeneAasta.tarbimine)} kWh<Br/>
        Aastane toodang: {Math.round(res.esimeneAasta.kogutoodang)} kWh <Br/>
        Sellest oma tarbeks: {Math.round(res.esimeneAasta.omaTarbeks)} kWh ({res.esimeneAasta.omatarbimiseProtsent}%)<Br/>
        Sellest võrku: {Math.round(res.esimeneAasta.müükVõrku)} kWh ({res.esimeneAasta.müükVõrkuProtsent}%)<Br/>
        </div>
        <div style={{}}>
            <Doughnut data={data} options={{cutoutPercentage: 60,
                maintainAspectRatio: false,
                tooltips: {enabled: false},
                legend: {position: "right"}
            }}/>
            </div>
            </div> 
       <hr/>
       Maksumus (KM-ga): {Math.round(res.tasuvus.maksumus)} €<Br/>
       Eeldatav sääst 1. aastal: {Math.round(res.tasuvus.säästEsimeselAastal)} €<Br/>
       Eeldatav sääst eluea (25 aastat) peale: {Math.round(res.tasuvus.säästKokku)} €<Br/>
       Kasum eluea (25 aastat) peale: {Math.round(res.tasuvus.kasum)} €<Br/>
       Tasuvusaeg: {Math.round(res.tasuvus.tasuvusaeg * 10) / 10} aastat<Br/>
       <hr/>
       <div className="graphs">
        <div className="graph"> Esimese aasta toodangu jagunemine<Br/>       
            <Bar data={aastaandmed} options={aastaoptions}/>
        </div>
        <div className="graph"> Tasuvus 25 aasta jooksul <Br/> 
            <Line data={tasuvusandmed} options={tasuvusoptions}/>
        </div>
       </div>
       
    
       <hr/>
  
    </div>
}

function Br(){
    return <br></br>
}

export default Result;

// colorScheme={['#e89722', '#ebf3ed']}


