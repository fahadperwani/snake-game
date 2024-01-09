import "./App.css";
import CanvasComponent from "./components/CanvasComponent";

function App() {
  return (
    <div className="App">
      <h1>Snake Game</h1>
      <div className="game-container">
        <CanvasComponent />
      </div>
    </div>
  );
}

export default App;
