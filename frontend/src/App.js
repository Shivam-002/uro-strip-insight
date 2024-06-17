import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";
import ImageUpload from "./components/ImageUpload";
import { GlobalStateProvider } from "./provider/GlobalStateProvider";

function App() {
  return (
    <GlobalStateProvider>
      <div className="app">
        <Header />
        <Body />
      </div>
    </GlobalStateProvider>
  );
}

export default App;
