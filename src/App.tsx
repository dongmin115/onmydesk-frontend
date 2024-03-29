import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './page/Home';
import Mypage from './page/Mypage';
import SetupBoard from './page/SetupBoard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/setupboard" element={<SetupBoard />} />
    </Routes>
  );
}

export default App;
