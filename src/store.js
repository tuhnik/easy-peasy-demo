
import { createStore } from 'easy-peasy';

const store = createStore({
    items: ["default item"],
    full: false,
    add: (state, payload) => {
     let {items} = {...state}

     if (items.length === 5){
        state.full = true
     }
  
     if(items.length < 5) {
        items.push(payload) 
     }
     
    },
    remove: (state, payload) => {
     state.items.splice(payload, 1);
     if(state.items.length < 5) {
        state.full = false
    }
    }
});

export default store