import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Routes from './components/Routes/Routes'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes />
    </BrowserRouter>

    </div>
  );
}

export default App;
