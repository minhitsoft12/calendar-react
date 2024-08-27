import './App.css'
import Calendar from "./features/calendar/Calendar.tsx";
import {Provider} from "react-redux";
import {store} from "./lib/store.ts";

function App() {
  return (
    <Provider store={store}>
      <Calendar />
    </Provider>
  )
}

export default App
