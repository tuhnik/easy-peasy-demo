import React from 'react';
import Consumption from './components/Consumption'
import SetupType from './components/SetupType'
import Area from './components/Area'
import Roof from './components/Roof'
import Orientation from './components/Orientation'
import Result from './components/Result'
import Form from './components/Form'
import './App.css'


function App() {
  return <div className="App">
    <Consumption></Consumption>
    <SetupType></SetupType>
    <Area></Area>
    <Roof></Roof>
    <Orientation></Orientation>
    <Result></Result>
    {/* <Form></Form> */}
  </div>
}

export default App;
