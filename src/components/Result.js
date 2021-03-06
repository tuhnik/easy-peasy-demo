import React, {useEffect} from 'react';
import { useStore } from 'easy-peasy';
import calculator from '../utils/calculator.js'
import {Doughnut, Bar, Line, Chart} from 'react-chartjs-2';

function Result() {
    useEffect(()=>{
        Chart.pluginService.register({
            beforeDraw: textToCenter
        });
        
    }, [])
   
    const area = useStore(state => state.input.area)
    const buildingType = useStore(state => state.input.buildingType)
    const consumption = useStore(state => state.input.consumption)
    const setupType = useStore(state => state.input.setupType)
    const roofDegrees = useStore(state => state.input.roofDegrees)
    const orientation = useStore(state => state.input.orientation)
    
    let res = calculator(buildingType, consumption, setupType, area, roofDegrees, orientation)
    
    const donut1data = {
        labels: ['Oma tarbeks - '+ res.esimeneAasta.omatarbimiseProtsent + '%', 'Müük võrku - '+(100 - res.esimeneAasta.omatarbimiseProtsent)+ '%'],
        
        datasets: [{
            data: [res.esimeneAasta.omatarbimiseProtsent, 100 - res.esimeneAasta.omatarbimiseProtsent],
            backgroundColor: ['rgb(232,151,34)', ] }],
        percentageText: res.esimeneAasta.omatarbimiseProtsent + "%",
        kwhText: Math.round(res.esimeneAasta.omaTarbeks),
        unitText: "kWh"
    }
    
    const donut2data = {
        labels: ['Oma tarbeks - '+ res.esimeneAasta.omatarbimiseProtsent + '%', 'Müük võrku - '+(100 - res.esimeneAasta.omatarbimiseProtsent)+ '%'],
        datasets: [{
            data: [100 - res.esimeneAasta.omatarbimiseProtsent,  res.esimeneAasta.omatarbimiseProtsent],
            backgroundColor: ['rgb(92,189,76)'] }],
        percentageText: res.esimeneAasta.müükVõrkuProtsent + "%",
        kwhText: Math.round(res.esimeneAasta.müükVõrku),
        unitText: "kWh"
    }

    let years = [2019]
    for(let i=1; i<26; i++){
        years.push(2019+i)
    }

    const tasuvusandmed = {
        labels: years,
        datasets: [{data: res.tasuvus.data.map(el=>Math.round(el)), 
            label: "EUR",
            backgroundColor: "rgba(139, 195 ,74 , 0.75)"
        },    
        ]
    }
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
                }},
                stacked: true
            }]
        }
    }
    const aastaandmed = {
        labels: cal_months,
        datasets: [
        {data: cal_tarbimine.map(el=>Math.round(el)), 
            label: "Senine tarbimine (kWh)",
            type: "bar",
            backgroundColor: "rgba(3, 169, 244, 0.5)",
            borderColor: "#03a9f4",
            borderWidth: 1
        },
        {data: cal_omatarbimine.map(el=>Math.round(el)), 
            label: "Oma tarbeks (kWh)",
            type: "line",
            backgroundColor: "rgba(232, 151, 34, 0.75)"
        },
        {data: cal_võrku.map(el=>Math.round(el)), 
            label: "Müük võrku (kWh)",
            type: "line",
            backgroundColor: "rgba(92, 189, 76, 0.5)"
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
        <div className="donut-container">
            <span>Oma tarbeks</span>
            <Doughnut height={100} width={100} data={donut1data} options={{
                cutoutPercentage: 70,
                tooltips: {enabled: false},
                legend: {display: false},
                hover: {mode: null},
                aspectRatio: 1
            }}/>
         </div>
         <div className="donut-container">
            <span>Müük võrku</span>
            <Doughnut height={100} width={100} data={donut2data} plugins={[{textToCenter}]} options={{
                cutoutPercentage: 70,
                tooltips: {enabled: false},
                legend: {display: false},
                hover: {mode: null},
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

function textToCenter(chart, easing) {
    let ctx = chart.ctx;
    let width = chart.width;
    let height = chart.height;
    ctx.clearRect(0, 0, width, height)
    let fontSize = (height / 114).toFixed(2);
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#4c5b68";

    ctx.font = "bold " +fontSize + "em Verdana";
    let percentageText = chart.config.data.percentageText || ""
    let textX = Math.round((width - ctx.measureText(percentageText).width) / 2)
    let textY = height / 2
    ctx.fillText(percentageText, textX, textY - fontSize * 10);
    ctx.font = (fontSize - fontSize/5)+ "em Verdana";
    let kwhText = chart.config.data.kwhText || ""
    let kwhTextX = Math.round((width - ctx.measureText(kwhText).width) / 2)
    ctx.fillText(kwhText, kwhTextX, textY + fontSize * 5);

    ctx.font = (fontSize - fontSize/2.5)+ "em Verdana";
    let unitText = chart.config.data.unitText || ""
    let unitTextX = Math.round((width - ctx.measureText(unitText).width) / 2)
    ctx.fillText(unitText, unitTextX, textY + fontSize * 18);
}
