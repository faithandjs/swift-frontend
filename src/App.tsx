
import "./components/styles/global.scss";
import { GetStarted } from "./components/pages/get-started";
import { Routes, Route } from "react-router-dom";
import Messaging from "./components/pages/messaging";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="chat_room" element={<Messaging />} />
      </Routes>
    </>
  );
}

export default App;
