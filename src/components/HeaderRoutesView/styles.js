import styled from 'styled-components/native';

export const AlignView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  width: 90%;
  height: 100%;
  background: #fff;
  background: #ee3;
`;

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* height: 100%; */
  background: #F5F5;
`;

export const HeaderText = styled.Text`
color: #222;
font-size: ${Platform.OS === 'ios' ? '16px' : '14px'};
font-weight: bold;
margin: 0 auto;
padding: 2px;
/* background: #F5F5; */
`;

export const HeaderImage = styled.Image`
/* height: 46px;
width: 150px; */
/* height: 60px;
width: 44%; */
height: 40px;
/* width: 125px; */
width: 116px;
/* background: #f00; */
`;
