import styled from 'styled-components';
import Navbar from '../components/Navbar';

// 컨테이너 스타일
const Container = styled.div`
  display: flex;
  flex-direction: column;
  item-align: center;
  width: 100wh;
`;

export default function SetupBoard() {
  return (
    <Container>
      <Navbar />
    </Container>
  );
}
