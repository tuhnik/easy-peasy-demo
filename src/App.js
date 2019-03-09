import React from 'react';
import Input from './Input'
import { useStore, useActions } from 'easy-peasy';


function App(){
  const items = useStore(state => state.items)
  const full = useStore(state => state.full)
  const remove = useActions(actions => actions.remove)

  return <div className="App">
    {full && <div>"Sorry, but the list is full! Try deleting some items..."</div>}
     <Input/>
     {items.map((el, i)=>{
       return <div key={i}>{el}
       <button onClick={()=>remove(i)}>X</button>
       </div>
     })}
     </div>
}

export default App;
