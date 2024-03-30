import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './page/Home';
import Mypage from './page/Mypage';
import SetupBoard from './page/SetupBoard';
import ProductDetail from './page/ProductDetail';
import PostDetail from './page/PostDetail';
import Post_reg from './page/Post_registration';
import GoodsBoard from './page/GoodsBoard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/setupboard" element={<SetupBoard />} />
      <Route path="/Post_registration" element={<Post_reg />} />
      <Route path="/goodsboard" element={<GoodsBoard />} />
      <Route path="/postdetail" element={<PostDetail />} />
      <Route path="/productdetail" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;
