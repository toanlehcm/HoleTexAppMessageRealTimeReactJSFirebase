import './App.css';
import Chatroom from './components/ChatRoom';
import Login from './components/Login';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import AuthProvider from './Context/AuthProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Chatroom />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
