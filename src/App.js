import "./App.css";

import { Provider } from "react-redux";
import store from "./Redux/ReduxStore";
import Routes from "./components/Routes/Routes";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes />
      </div>
    </Provider>
  );
}

export default App;
