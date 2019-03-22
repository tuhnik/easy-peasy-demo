import data from "./data.js"

function calculator(hooneTüüp, tarbimine, paigaldusviis, pindala, kalle, orientatsioon){
    //remove later
    if(pindala < 4){
        pindala = 4
    }
    //konstandid
    let inflatsioon = 0.02

    let elektrihind = 5 //s/kWh
    let taastuvenergiatasu = 1.04 //s/kWh
    let elektriaktsiis = 0.447 //s/kWh
    let taastuvenergiatoetus = 5.37 //skWh
    let võrgutasu //s/kWh

    if (hooneTüüp === "elektriküte") võrgutasu = 3.5
    if (hooneTüüp === "suvila") võrgutasu = 5.5
    if (hooneTüüp === "muu") võrgutasu = 4.5

    let paneelideArv = Math.floor(pindala/paigaldusviis*0.8)
    let võimsus = paneelideArv * 0.285
    let maksumus = võimsus * (1.1084*Math.pow(võimsus,-0.103)) * 1000
    let maksumusKM = maksumus * 1.2
    let hoolduskulu = maksumus*(1.5/100) * 1.2

    let esimeneAasta = projektiaasta(võimsus, 1)
    let tasuvus = tasuvusAeg(25)

    return {paneelideArv, võimsus, esimeneAasta, tasuvus}

    function projektiaasta(võimsus, aasta){
        
        let tootlikkus = leiaTootlikkus(orientatsioon, kalle)
        let näidisvõimsus = 31
        let näidistoodang = data["näidistootmine"].reduce((a, b) => a + b)
        let näidistootlikkus = näidistoodang/näidisvõimsus

        let prognoos = data["näidistootmine"].map(el=>{
            return el * ((tootlikkus/näidistootlikkus)/(näidisvõimsus/võimsus))
        }) 

        let kogutoodang = prognoos.reduce((a, b) => a + b)

        let profiil = data.tarbimisprofiilid[hooneTüüp]
        let profiilitarbiminekokku = profiil.reduce((a, b) => a + b)
        
        if(tarbimine > 0) {
            profiil = profiil.map(el=>{return el * (tarbimine/profiilitarbiminekokku)})
        }
        
        let omatarbimine = prognoos.map((el, i)=>{
        if(el >= profiil[i]) {return profiil[i]}
        else {return el}
        })
        let võrku = prognoos.map((el, i)=>{
        if(el > profiil[i]) {return el - profiil[i]}
        else {return 0}
        })

        let omatarbimiseProtsent = omatarbimine.reduce((a, b) => a + b) / kogutoodang

        let aastaneToodanguLangus = [1, 0.975,0.968,0.961,0.954,0.947,0.940,0.933,0.926,0.919,0.912,0.905,0.898,0.891,0.884,0.877,0.870,0.863,0.856,0.849,0.842,0.835,0.828,0.821,0.814,0.807]
        kogutoodang *= aastaneToodanguLangus[aasta]

        let omaTarbeks = kogutoodang * omatarbimiseProtsent
        let müükVõrku = kogutoodang - omaTarbeks 

        let kalender = kuuKaupa(profiil, omatarbimine, võrku)
        let hoolduskulud = lisaInflatsioon(hoolduskulu, aasta)

        let tulud = {}
            tulud.hinnavõit = (elektrihind + võrgutasu + taastuvenergiatasu + elektriaktsiis) * 1.2
            tulud.hinnavõit = lisaInflatsioon(tulud.hinnavõit, aasta)
            tulud.sääst = omaTarbeks * tulud.hinnavõit/100
            tulud.elektrihind = lisaInflatsioon(elektrihind, aasta)
            tulud.müükVõrku = müükVõrku * tulud.elektrihind/100

        if(aasta < 13) tulud.taastuvenergiatoetus = müükVõrku * taastuvenergiatoetus / 100
        else {tulud.taastuvenergiatoetus = 0}
        tulud.kokku = tulud.sääst + tulud.müükVõrku + tulud.taastuvenergiatoetus
        
        let rahavoog = tulud.kokku - hoolduskulud

        omatarbimiseProtsent =  Math.round(omatarbimiseProtsent * 100)
        let müükVõrkuProtsent= 100-omatarbimiseProtsent

        return {tarbimine: profiil.reduce((a, b) => a + b), kogutoodang, omaTarbeks, müükVõrku, hoolduskulud, tulud, rahavoog, kalender, omatarbimiseProtsent, müükVõrkuProtsent}
    }
    function tasuvusAeg(aastad){
        let arr = [-maksumusKM ]
        let rahavoog = [-maksumusKM]
        for (let i=1; i<aastad+1; i++ ){
            let data = projektiaasta(võimsus, i)
            arr.push(arr[i-1] + data.rahavoog)
            rahavoog.push(data.rahavoog)
        }

        let obj = {}
        obj.maksumus = maksumusKM
        obj.säästEsimeselAastal = rahavoog[1]
        obj.säästKokku = rahavoog.slice(1).reduce((a, b) => a + b)
        obj.kasum = rahavoog.reduce((a, b) => a + b)

        for (let i = 0; i<arr.length; i++){
            if(arr[i]>0) {
                obj.tasuvusaeg = (i-1) + Math.abs(arr[i-1])/rahavoog[i]
                obj.data = arr
            return obj
            }
            if(arr[i] < 0 && i === arr.length -1){
                obj.tasuvusaeg = 0
                obj.data = []
                return obj
            }
        } 
    }

    function lisaInflatsioon(n, aasta){
        return n * Math.pow(1 + inflatsioon/1, aasta-1)
    }

    function kuuKaupa(profiil, omatarbimine, võrku){
        return {
            "Jaanuar": {
                tarbimine: profiil.slice(0,744).reduce((a, b) => a + b),
                omatarbimine: omatarbimine.slice(0,744).reduce((a, b) => a + b),
                võrku: võrku.slice(0,744).reduce((a, b) => a + b), 
            },
            "Veebruar": {
                tarbimine: profiil.slice(744,1416).reduce((a, b) => a + b),
                omatarbimine: omatarbimine.slice(744,1416).reduce((a, b) => a + b),
                võrku: võrku.slice(744,1416).reduce((a, b) => a + b), 
            },
            "Märts": {
                tarbimine: profiil.slice(1416,2160).reduce((a, b) => a + b),
                omatarbimine: omatarbimine.slice(1416,2160).reduce((a, b) => a + b),
                võrku: võrku.slice(1416,2160).reduce((a, b) => a + b), 
            },
            "Aprill": {
                tarbimine: profiil.slice(2160,2880).reduce((a, b) => a + b),
                omatarbimine: omatarbimine.slice(2160,2880).reduce((a, b) => a + b),
                võrku: võrku.slice(2160,2880).reduce((a, b) => a + b), 
            },
            "Mai": {
                tarbimine: profiil.slice(2880,3624).reduce((a, b) => a + b),
                omatarbimine: omatarbimine.slice(2880,3624).reduce((a, b) => a + b),
                võrku: võrku.slice(2880,3624).reduce((a, b) => a + b), 
            },
            "Juuni": {
                tarbimine: profiil.slice(3624, 4344).reduce((a, b) => a + b),
                omatarbimine: omatarbimine.slice(3624, 4344).reduce((a, b) => a + b),
                võrku: võrku.slice(3624, 4344).reduce((a, b) => a + b), 
            },
            "Juuli": {
                tarbimine: profiil.slice(4344, 5088).reduce((a, b) => a + b),
                omatarbimine: omatarbimine.slice(4344, 5088).reduce((a, b) => a + b),
                võrku: võrku.slice(4344, 5088).reduce((a, b) => a + b), 
            },
            "August": {
                tarbimine: profiil.slice(5088, 5832).reduce((a, b) => a + b),
                omatarbimine: omatarbimine.slice(5088, 5832).reduce((a, b) => a + b),
                võrku: võrku.slice(5088, 5832).reduce((a, b) => a + b), 
            },
            "September": {
                tarbimine: profiil.slice(5832, 6552).reduce((a, b) => a + b),
                omatarbimine: omatarbimine.slice(5832, 6552).reduce((a, b) => a + b),
                võrku: võrku.slice(5832, 6552).reduce((a, b) => a + b), 
            },
            "Oktoober": {
                tarbimine: profiil.slice(6552, 7296).reduce((a, b) => a + b),
                omatarbimine: omatarbimine.slice(6552, 7296).reduce((a, b) => a + b),
                võrku: võrku.slice(6552, 7296).reduce((a, b) => a + b), 
            },
            "November": {
                tarbimine: profiil.slice(7296, 8016).reduce((a, b) => a + b),
                omatarbimine: omatarbimine.slice(7296, 8016).reduce((a, b) => a + b),
                võrku: võrku.slice(7296, 8016).reduce((a, b) => a + b), 
            },
            "Detsember": {
                tarbimine: profiil.slice(8016, 8760).reduce((a, b) => a + b),
                omatarbimine: omatarbimine.slice(8016, 8760).reduce((a, b) => a + b),
                võrku: võrku.slice(8016, 8760).reduce((a, b) => a + b), 
            }
        }
    }

function leiaTootlikkus(orientatsioon, kalle){
        let data = {
            "-90": {
                "5": 829.17,
                "10": 817.18,
                "15": 770.15,
                "20": 792.52,
                "25": 779.91,
                "30": 766.96,
                "35": 736.66
            },
            "-60": {
                "5": 850.62,
                "10": 859.49,
                "15": 858.46,
                "20": 870.89,
                "25": 872.42,
                "30": 871.31,
                "35": 854.95
            },
            "-30": {
                "5": 868.12,
                "10": 893.01,
                "15": 907.55,
                "20": 930.84,
                "25": 942.79,
                "30": 950.2,
                "35": 945.79
            },
            "0": {
                "5": 877.23,
                "10": 910.48,
                "15": 906.51,
                "20": 960.99,
                "25": 978.33,
                "30": 990.24,
                "35": 987.12
            },
            "30": {
                "5": 875.58,
                "10": 907.07,
                "15": 922.95,
                "20": 955.7,
                "25": 972.01,
                "30": 983.72,
                "35": 970.21
            },
            "60": {
                "5": 863.56,
                "10": 883.47,
                "15": 883.63,
                "20": 912.37,
                "25": 921.6,
                "30": 926.53,
                "35": 894.35
            },
            "90": {
                "5": 844.21,
                "10": 845.07,
                "15": 768.38,
                "20": 839.2,
                "25": 833.61,
                "30": 826.78,
                "35": 770.61
            },
        }
        return data[orientatsioon][kalle]
    }
}


export default calculator