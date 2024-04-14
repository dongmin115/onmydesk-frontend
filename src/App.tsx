import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './page/Home';
import Mypage from './page/Mypage';
import SetupBoard from './page/SetupBoard';
import ProductDetail from './page/ProductDetail';
import PostDetail from './page/PostDetail';
import Post_reg from './page/Post_registration';
import GoodsBoard from './page/GoodsBoard';
import Signup from './page/Signup';
import Login from './page/Login';
import FavoriteBoard from './page/FavoriteBoard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/setupboard" element={<SetupBoard />} />
      <Route path="/Post_registration" element={<Post_reg />} />
      <Route path="/goodsboard" element={<GoodsBoard />} />
      <Route path="/postdetail/:id" element={<PostDetail />} />
      <Route path="/productdetail" element={<ProductDetail />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mypage/favoriteboard" element={<FavoriteBoard />} />
    </Routes>
  );
}

export default App;
