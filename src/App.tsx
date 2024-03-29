import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './page/Home';
import Mypage from './page/Mypage';
import SetupBoard from './page/SetupBoard';
import PostDetail from './page/PostDetail';
import GoodsBoard from './page/GoodsBoard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/setupboard" element={<SetupBoard />} />
      <Route path="/goodsboard" element={<GoodsBoard />} />
      <Route path="/postdetail" element={<PostDetail />} />
    </Routes>
  );
}

export default App;
