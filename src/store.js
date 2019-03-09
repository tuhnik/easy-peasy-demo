
import { createStore, thunk } from 'easy-peasy';

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
    },
    fetchData: thunk(async (actions, payload) => {
        const saved = await request(payload)
        
        actions.add(saved.title);
      })
});

const request = async (i) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/' + i);
    return await response.json();
    
}

export default store