import styled from 'styled-components';
import Navbar from '../components/Navbar';

const SetupTitleContainer = styled.div`
  width: 100%;
  height: 12vh;
  background-color: #262626;
  display: flex;
  padding: 2rem;
`;
const SetupTitle = styled.h2``;

const PostDetail = () => {
  return (
    <>
      <Navbar />
      <SetupTitleContainer>
        <SetupTitle>Setup Title</SetupTitle>
      </SetupTitleContainer>
    </>
  );
};

export default PostDetail;
