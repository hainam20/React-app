import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import "./index.css";
import Control from "./components/control/Control";

function App() {
  return (
    <div>
      <Topbar />
      <div className="flex">
        <Sidebar />
        <div className="flex w-full">
          <Home />
          <Control />
        </div>
      </div>
    </div>
  );
}

export default App;
