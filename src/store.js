
import { createStore } from 'easy-peasy';

const store = createStore({
    input: {
      orientation: 0,
      roofDegrees: 15,
      area: 158,
      setupType: 3,
      consumption: 10000,
      buildingType: 'elektriküte',
      changeOrientation: (state, payload) => {
        state.orientation = payload
      },
      changeRoofDegrees: (state, payload) => {
        state.roofDegrees = payload
      },
      changeArea: (state, payload) => {
        state.area = payload
      },
      changeSetupType: (state, payload) => {
        state.setupType = payload
      },
      changeConsumption: (state, payload) => {
        state.consumption = payload
      },
      changeBuildingType: (state, payload) => {
        state.buildingType = payload 
      }
    }
});

export default store