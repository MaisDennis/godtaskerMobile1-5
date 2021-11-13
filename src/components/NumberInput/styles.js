import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  width: 50%;
  border-radius: 8px;
  border-width: 1px;
  border-color: #1B2432;
  margin: 8px 0;
  background-color: #eee;
  /* background: #F5F5; */
`;

export const MinusButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;

  align-items: center;
  height: 100%;
  width: 25%;
  /* background: #43ee; */
`;
export const PlusButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 25%;
/* background: #F5F5; */

`;
export const Input = styled.Text`
  text-align: center;
  font-size: 14px;
  width: 50%;
  color: #1B2432;
  /* background: #F5F5; */
`;
export const NumberIcon = styled(Icon)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: auto;
  width: auto;
  font-size: 20px;
  font-weight: bold;
  margin: auto;
  color: #1B2432;
/* background: #4433ee; */
`;
