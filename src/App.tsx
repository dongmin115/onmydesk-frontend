import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './page/Home';
import Mypage from './page/Mypage';
import SetupBoard from './page/SetupBoard';
import ProductDetail from './page/ProductDetail';
import PostDetail from './page/PostDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/setupboard" element={<SetupBoard />} />
      <Route path="/postdetail" element={<PostDetail />} />
      <Route path="/productdetail" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;
