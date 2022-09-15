import { useRef, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Visualizer from "./components/Visualizer";

function App() {
    const [algorithm, setAlgorithm] = useState("dijkstra");
    const [visualizeClick, setVisualizeClick] = useState(false);
    const [shouldClearGrid, setShouldClearGrid] = useState(false);

    const visualizeSpeed = useRef(50);

    return (
        <div className="App">
            <Header
                visualizeClick={visualizeClick}
                setVisualizeClick={setVisualizeClick}
                algorithm={algorithm}
                setAlgorithm={setAlgorithm}
                setClearGrid={setShouldClearGrid}
                visualizeSpeed={visualizeSpeed}
            />
            <Visualizer
                visualizeClick={visualizeClick}
                setVisualizeClick={setVisualizeClick}
                selectedAlgorithm={algorithm}
                shouldClearGrid={shouldClearGrid}
                setShouldClearGrid={setShouldClearGrid}
                visualizeSpeed={visualizeSpeed}
            />
        </div>
    );
}

export default App;
