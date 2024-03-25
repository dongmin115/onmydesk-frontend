import React from 'react';

import styled from 'styled-components';

// 상단바 컴포넌트
let 상단바 = styled.header` 
    background-color: rgba(0, 0, 0, 0.2);
    width:100%;
    height:7%;
    text-align:center;
    font-size:30px;
    font-family: 'Courier New', Courier, monospace;
    top: 0;`


function Header() {
  return (
   <상단바>OnMyDesk</상단바>
     );
}

export default Header;