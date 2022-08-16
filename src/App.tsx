
import "./components/styles/global.scss";
import { GetStarted } from "./components/pages/get-started";
import { Routes, Route } from "react-router-dom";
import Messaging from "./components/pages/messaging";
import NotFound from "./components/pages/notFound";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="chat_room" element={<Messaging />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
