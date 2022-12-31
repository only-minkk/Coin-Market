import styled from 'styled-components';

import penguin from 'assets/images/penguin.png';

function StartSell() {
  return (
    <StyledWrapper>
      <StyledImg src={penguin}></StyledImg>
      <StyledP>
        여행 후 남은 동전을 <strong>4단계</strong>로 손쉽게 <strong>판매</strong>해
        보세요!
      </StyledP>
    </StyledWrapper>
  );
}

export default StartSell;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const StyledImg = styled.img`
  width: 200px;
  margin-bottom: 20px;
`;

const StyledP = styled.p`
  font-size: 28px;
  text-align: center;
  @media (max-width: 733px) {
    font-size: 23px;
  }
  @media (max-width: 600px) {
    font-size: 20px;
  }
  @media (max-width: 500px) {
    font-size: 14px;
  }
`;
