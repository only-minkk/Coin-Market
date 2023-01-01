import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';

import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

import StartSell from 'components/Sell/StartSell';
import UploadImage from 'components/Sell/UploadImage';
import SellStepOne from 'components/Sell/SellStepOne';
import ROUTE from 'utils/ROUTE';
import CheckCoin from 'components/Sell/CheckCoin';

function SellCoin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('ACCESS_TOKEN')) {
      alert('로그인이 필요합니다.');
      navigate(ROUTE.LOGIN);
    }
  }, [navigate]);

  const [currentStep, setCurrentStep] = useState(0);
  const stepComment = [
    '판매하실 동전 사진을 찍어주세요.',
    '사진을 업로드 해주세요.',
    '금액을 확인 해주세요.',
    '동전을 택배로 보내주세요',
  ];

  return (
    <>
      <Header backColor="#2AC1BC" logoImage="white" color="white"></Header>
      <StyledMain>
        {currentStep !== 0 && currentStep <= 4 && (
          <StyledTitle>
            <TitleLabel>STEP {currentStep}</TitleLabel>
            <TitleContent>{stepComment[currentStep - 1]}</TitleContent>
          </StyledTitle>
        )}
        {currentStep === 0 && <StartSell></StartSell>}
        {currentStep === 1 && <SellStepOne></SellStepOne>}
        {currentStep === 2 && (
          <UploadImage
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}></UploadImage>
        )}
        {currentStep === 3 && (
          <CheckCoin
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}></CheckCoin>
        )}

        {currentStep < 2 && (
          <StyledBtnWrapper>
            {currentStep !== 0 && (
              <StyledBtn
                onClick={() => {
                  currentStep > 0 && setCurrentStep((preState) => preState - 1);
                }}>
                이전
              </StyledBtn>
            )}
            <StyledBtn
              onClick={() => {
                currentStep < 3 && setCurrentStep((preState) => preState + 1);
              }}>
              {currentStep === 0 ? '판매하기' : '다음'}
            </StyledBtn>
          </StyledBtnWrapper>
        )}
      </StyledMain>
      <Footer></Footer>
    </>
  );
}

export default SellCoin;

const StyledMain = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;

  min-height: calc(100vh - 200px);
  min-width: 600px;

  @media (max-width: 600px) {
    min-width: 440px;
  }
  @media (max-width: 450px) {
    min-width: 380px;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  margin: 20px auto;
  width: 440px;
  @media (max-width: 450px) {
    width: 390px;
  }
`;

const TitleLabel = styled.div`
  position: relative;
  padding: 10px;
  border-radius: 10px;
  font-size: 25px;
  font-weight: bold;
  color: white;
  background-color: #2ac1bc;
  margin-left: 10px;

  &:after {
    border-top: 15px solid #2ac1bc;
    border-left: 30px solid transparent;
    content: '';
    top: 50px;
    right: 10px;
    position: absolute;
  }
  @media (max-width: 450px) {
    font-size: 20px;
  }
`;

const TitleContent = styled.div`
  background-color: rgba(42, 193, 188, 0.2);
  position: relative;
  top: 40px;
  left: 10px;
  width: 300px;
  line-height: 50px;
  text-indent: 20px;
  font-weight: bold;
  @media (max-width: 450px) {
    font-size: 13px;
    width: 250px;
  }
`;

const StyledBtn = styled.button`
  width: 100px;
  height: 50px;
  border: 0;
  border-radius: 10px;
  background-color: rgba(42, 193, 188, 0.5);
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: rgba(42, 193, 188, 0.3);
  }
`;

const StyledBtnWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;

  margin: 40px 0;
`;
