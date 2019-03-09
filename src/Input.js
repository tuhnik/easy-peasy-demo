import React from 'react';
import { useActions } from 'easy-peasy';

function Input(){
const add = useActions(actions => actions.add)

function handleInput(e){
  if(e.key === "Enter"){ 
    add(e.target.value)
    e.target.value = ""
    
 
  }
}
  return <input onKeyPress={handleInput}></input>

}

export default Input;