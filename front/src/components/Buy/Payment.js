import { useState } from 'react';
import styled from 'styled-components';

import { useCoinContext } from 'context/CoinContext';

import useRate from 'hooks/useRate';
import PostCode from 'components/Buy/PostCode';
import PayButton from './PayButton';

function Payment() {
  const { coinList } = useCoinContext();
  const { jpyRate, cnyRate, usdRate } = useRate();

  const [userInfo, setUserInfo] = useState({
    buyer_name: '',
    buyer_tel: '',
    buyer_addr: '',
    detailAddress: '',
    buyer_postcode: '',
  });

  let jpy100 = 0;
  let jpy500 = 0;
  let cny1 = 0;
  let usd25 = 0;
  let usd10 = 0;

  coinList.map((el) => {
    if (el.selectNation === 'JPY') {
      jpy100 += parseInt(el.firstCoin);
      jpy500 += parseInt(el.secondCoin);
      return;
    }
    if (el.selectNation === 'CNY') {
      cny1 += parseInt(el.firstCoin);
      return;
    }
    if (el.selectNation === 'USD') {
      usd10 += parseInt(el.firstCoin);
      usd25 += parseInt(el.secondCoin);
      return;
    }
  });

  const reportCoinList = [];

  if (jpy100 > 0) {
    reportCoinList.push({
      coinId: process.env.REACT_APP_JPY100,
      dealAmount: jpy100,
    });
  }
  if (jpy500 > 0) {
    reportCoinList.push({
      coinId: process.env.REACT_APP_JPY500,
      dealAmount: jpy500,
    });
  }
  if (cny1 > 0) {
    reportCoinList.push({
      coinId: process.env.REACT_APP_CNY1,
      dealAmount: cny1,
    });
  }
  if (usd10 > 0) {
    reportCoinList.push({
      coinId: process.env.REACT_APP_USD10,
      dealAmount: usd10,
    });
  }
  if (usd25 > 0) {
    reportCoinList.push({
      coinId: process.env.REACT_APP_USD25,
      dealAmount: usd25,
    });
  }

  const rateToken = [];

  if (jpy100 > 0 || jpy500 > 0) rateToken.push(jpyRate?.[1]);
  if (cny1 > 0) rateToken.push(cnyRate?.[1]);
  if (usd10 > 0 || usd25 > 0) rateToken.push(usdRate?.[1]);

  const sumBuyCoin = Math.floor(
    (jpy100 + jpy500 * 5) * jpyRate?.[0].basePrice +
      cny1 * cnyRate?.[0].basePrice +
      (usd25 * 0.4 + usd10 * 0.1) * usdRate?.[0].basePrice
  );

  return (
    <StyledLayout>
      <StyledWrapper>
        <StyledPageTitle>????????????</StyledPageTitle>
        <StyledAddressWrapper>
          <StyledContentTitle>????????????</StyledContentTitle>
          <PostCode userInfo={userInfo} setUserInfo={setUserInfo}></PostCode>
        </StyledAddressWrapper>
        <StyledCoinList>
          <StyledContentTitle>????????????</StyledContentTitle>
          <div>
            {jpy100 ? (
              <StyledCoinWrapper>
                <StyledImg src="/JPY100.png"></StyledImg>
                <span>?????? 100???(??100)</span>
                <span>{`${jpyRate?.[0].basePrice.toLocaleString()} x ${jpy100}`}???</span>
                <span>
                  <strong>
                    {Math.floor(jpy100 * jpyRate?.[0].basePrice).toLocaleString()}
                  </strong>
                  ???
                </span>
              </StyledCoinWrapper>
            ) : null}
            {jpy500 ? (
              <StyledCoinWrapper>
                <StyledImg src="/JPY500.png"></StyledImg>
                <span>?????? 500???(??500)</span>
                <span>
                  {`${(5 * jpyRate?.[0].basePrice).toLocaleString()} x ${jpy500}`}???
                </span>
                <span>
                  <strong>
                    {Math.floor(jpy500 * 5 * jpyRate?.[0].basePrice).toLocaleString()}
                  </strong>
                  ???
                </span>
              </StyledCoinWrapper>
            ) : null}
            {cny1 ? (
              <StyledCoinWrapper>
                <StyledImg src="/CNY1.png"></StyledImg>
                <span>?????? 1??????(??1)</span>
                <span>{`${cnyRate?.[0].basePrice.toLocaleString()} x ${cny1}`}???</span>
                <span>
                  <strong>
                    {Math.floor(cny1 * cnyRate?.[0].basePrice).toLocaleString()}
                  </strong>
                  ???
                </span>
              </StyledCoinWrapper>
            ) : null}
            {usd10 ? (
              <StyledCoinWrapper>
                <StyledImg src="/USD10.png"></StyledImg>
                <span>?????? 10??????(10??)</span>
                <span>
                  {`${(usdRate?.[0].basePrice * 0.1).toLocaleString()} x ${usd10}`}???
                </span>
                <span>
                  <strong>
                    {Math.floor(usd10 * (usdRate?.[0].basePrice * 0.1)).toLocaleString()}
                  </strong>
                  ???
                </span>
              </StyledCoinWrapper>
            ) : null}
            {usd25 ? (
              <StyledCoinWrapper>
                <StyledImg src="/USD25.png"></StyledImg>
                <span>?????? 25??????(25??)</span>
                <span>
                  {`${(usdRate?.[0].basePrice * 0.25).toLocaleString()} x ${usd25}`}???
                </span>
                <span>
                  <strong>
                    {Math.floor(usd25 * (usdRate?.[0].basePrice * 0.25)).toLocaleString()}
                  </strong>
                  ???
                </span>
              </StyledCoinWrapper>
            ) : null}
          </div>
        </StyledCoinList>
      </StyledWrapper>
      <StyledPayWrapper>
        <StyledContentTitle>?????? ????????????</StyledContentTitle>
        <StyledContent>
          <span>????????????</span>
          <span>{(sumBuyCoin / 0.7).toLocaleString()}???</span>
        </StyledContent>
        <StyledContent>
          <span>?????????</span>
          <span>{0}???</span>
        </StyledContent>
        <StyledContent>
          <span>????????????</span>
          <span>{((sumBuyCoin / 0.7) * 0.3).toLocaleString()}???</span>
        </StyledContent>
        <StyledResultContent>
          <span>??????</span>
          <span>{sumBuyCoin.toLocaleString()}???</span>
        </StyledResultContent>

        <PayButton
          userInfo={userInfo}
          sumBuyCoin={sumBuyCoin}
          reportCoinList={reportCoinList}
          rateToken={rateToken}></PayButton>
      </StyledPayWrapper>
    </StyledLayout>
  );
}

export default Payment;

const StyledLayout = styled.div`
  display: flex;
  @media (max-width: 855px) {
    flex-direction: column;
    align-items: center;
  }
`;
const StyledWrapper = styled.div`
  width: 620px;
  padding: 40px;
  box-sizing: border-box;
  @media (max-width: 630px) {
    width: 500px;
  }
  @media (max-width: 500px) {
    width: 450px;
  }
  @media (max-width: 420px) {
    width: 400px;
  }
`;

const StyledPageTitle = styled.h1`
  font-size: 35px;
  font-weight: bold;
  padding-bottom: 20px;
  margin-bottom: 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const StyledCoinList = styled.div`
  margin-bottom: 50px;
`;

const StyledContentTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  margin-bottom: 15px;
  padding-bottom: 15px;
`;

const StyledAddressWrapper = styled.div`
  margin-bottom: 90px;
`;

const StyledPayWrapper = styled.div`
  position: sticky;
  height: 100px;
  top: -70px;
  padding-top: 170px;
  width: 200px;
  @media (max-width: 855px) {
    position: static;
    width: 550px;
    top: 0;
    padding: 0;
    height: 300px;
    margin-bottom: 30px;
  }

  @media (max-width: 630px) {
    width: 430px;
  }
  @media (max-width: 500px) {
    width: 370px;
  }
  @media (max-width: 420px) {
    width: 330px;
  }
`;

const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledResultContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  color: red;
  align-items: center;
  padding-bottom: 25px;
  border-bottom: 1px dotted rgba(0, 0, 0, 0.1);

  & span + span {
    font-size: 30px;
    font-weight: bold;
  }
`;

const StyledImg = styled.img`
  width: 90px;
  @media (max-width: 420px) {
    width: 50px;
  }
`;

const StyledCoinWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  & span:nth-child(2),
  & span:nth-child(3),
  & span:nth-child(4) {
    width: 130px;
    text-align: right;
  }

  & span:nth-child(4) strong {
    font-size: 25px;
  }
`;
