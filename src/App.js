import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ChatApp from "./pages/ChatApp/ChatApp";
import Login from "./pages/Login/Login";
import MainApp from "./pages/MainApp/MainApp";
import Signup from "./pages/Signup/Signup";
import "./styles/variables.scss"

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}></Route>
          <Route path="/messenger" element={<ChatApp />} />
          <Route path="/" element={<MainApp />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
