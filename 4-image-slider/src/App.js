import "./App.css";
import ImageSlider from "./components";

function App() {
  return (
    <div>
      <ImageSlider url={"https://picsum.photos/v2/list"} limit={"10"} />
    </div>
  );
}

export default App;
