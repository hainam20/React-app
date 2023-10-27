import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import Control from "./components/control/Control";

import "./index.css";

function App() {
    return (
        <div className="!h-screen">
            <Topbar />
            <div className="flex h-full content-container">
                <Sidebar />
                <div className="flex w-full h-full">
                    <Home />
                    {/* <Control /> */}
                </div>
            </div>
        </div>
    );
};

export default App;
