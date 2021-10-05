import "./App.css";

import { Provider } from "react-redux";
import store from "./Redux/ReduxStore";
import Routes from "./components/Routes/Routes";
import { Route } from 'react-router-dom';

import {ToastContainer} from "react-toastify"

function App() {
  return (
    <Provider store={store}>
      <ToastContainer/>
      <div className="App">
        <Route component = {Routes}/>
      </div>
    </Provider>
  );
}

export default App;
