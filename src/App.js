import './App.css';
import Login from './components/login';
import ChatRoom from "./components/chatroom"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthProvider from './Context/authProvider';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<ChatRoom />} path="/" />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
