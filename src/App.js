import './App.css';
import Login from './components/login';
import ChatRoom from "./components/chatroom"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthProvider from './Context/authProvider';
import AppProvider from './Context/appProvider';
import AddRoomModal from './components/modals/AddRoomModal';
import InviteMemberModal from './components/modals/InviteMemberModal';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<ChatRoom />} path="/" />
          </Routes>
          <AddRoomModal />
          <InviteMemberModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
