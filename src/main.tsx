import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {store} from "./lib/store.ts";
import {hydrate} from "./features/calendar/calendarSlice.ts";

const storeConfig = store

storeConfig.subscribe(()=>{
  localStorage.setItem('states_management', JSON.stringify(store.getState()))
})

const getStatesFromLocalStorage = () => {
  try {
    const persistedState = localStorage.getItem('states_management')
    if (persistedState)
      return JSON.parse(persistedState)
  }
  catch (e){
    console.log(e)
  }
}

const states = getStatesFromLocalStorage()

if(states){
  console.log(storeConfig.dispatch.name)
  storeConfig.dispatch(hydrate(states.calendar))
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={storeConfig}>
      <App />
    </Provider>
  </StrictMode>,
)
