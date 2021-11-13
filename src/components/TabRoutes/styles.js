import styled from 'styled-components/native';
// import Button from '~/components/Button';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  height: 100%;
`;
export const Header = styled.View`
  margin: 10px 30px 0px 30px;
  /* background: #F5F; */
`;

export const TopHeaderView = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 4px;
  /* background: #F5F; */
`;

export const ExitButton = styled(RectButton)`
background: #58595B;
color: #fff;
width: 44px;
height: 44px;
border-radius: 4px;
margin-top: 4px;
align-items: center;
justify-content: center;
`;

export const ExitButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

export const TagView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* background: #444; */
`;

export const Span1 = styled.Text`
  font-weight: bold;
  font-size: 14px;
  margin-right: 8px;
  /* margin-bottom: 5px; */
  /* color: #888; */
`;

export const Span2 = styled.Text`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
  /* color: #888; */
`;

export const TitleWorkerName = styled.Text`
  font-size: 21px;
  color: #222;
  font-weight: bold;
  align-self: center;
`;

export const BottomHeaderView = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 0px;
`;

export const TitleTask = styled.Text`
  font-size: 21px;
  color: #222;
  font-weight: bold;
`;
