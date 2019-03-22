import React, { useContext } from 'react';
import { useStore, useActions } from 'easy-peasy';
import { I18nContext } from '../i18n';

function Consumption() {
    const { t } = useContext(I18nContext);
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
        <b>{t('hoone_tüüp')}:</b>
        <select onChange={handleSelect} value={type}>
            <option value="suvila">{t('suvila')}</option>
            <option value="elektriküte">{t('elektriküttega_eramu')}</option>
            <option value="muu">{t('muu_kütteliigiga_eramu')}</option>
        </select><br/>
        Täpsemaks arvutuseks sisesta tarbimine: 
        <input onChange={handleInput} value={consumption} style={{width: "10em"}}></input>
    </div>
}

export default Consumption;
