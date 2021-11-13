import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView, TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const TestList = styled(FlatList)`
  height: 300px;
  background-color: #333;
`;

export const Container = styled(SafeAreaView)`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${Platform.OS === 'ios' ? '#ddd' : '#f5f5f5'};
  /* background-color: #F5F5; */
`;
export const ConversationView = styled(KeyboardAvoidingView)`
display: flex;
flex-direction: column;
height: 100%;
width: 100%;
overflow: scroll;
/* margin-bottom: 40%; */
/* background-color: #4433ee; */
`;

export const HrDivider = styled.View`
width: 100%;
border-width: 0.5px;
border-color: #ddd;
margin: 0 auto;
`;

// export const ParsedKeyboardAvoidingView = styled.KeyboardAvoidingView`
// display: flex;
// flex-direction: column;
// align-items: center;
// height: auto;
// width: 100%;
// background-color: #4433ee;
// `;

export const ReplyContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* height: auto; */
  width: 100%;
  margin: 0;
  background-color: #f00;
`;

export const ReplyView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  /* height: 48px; */
  height: auto;
  width: 100%;
  padding: 0 8px;
  margin: 0;
  background-color: #fff;
`;

export const SendInput = styled.TextInput`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${Platform.OS === 'ios' ? '14px' : '12px'};
  height: auto;
  min-height: 40px;
  width: 80%;
  border-radius: 12px;
  border-width: 1px;
  border-color: #403F4C;
  margin: 16px 0;
  padding: ${Platform.OS === 'ios' ? '10px 20px' : '0 20px'};
  color: #1B2432;
  background-color: #eee;
`;

export const SendButton = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border: 1px solid #fff;
  border-radius: 40px;
  margin: 0;
  background-color: #18A0FB;
`;


export const SendButtonView = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 36px;
  border: 1px solid #1B2432;
  margin: 0;
  /* background-color: #4ee; */
`;

export const SpaceView = styled.View`
  height: 32px;
  width: 32px;
  border-radius: 32px;
`;

export const TemporaryMessageContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: auto;
  width: 100%;
  padding: 8px;
  background-color: #f5f5f5;
`;
export const TemporaryMessageView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: auto;
  width: 90%;
  border-radius: 8px;
  border-width: 1px;
  border-color: #999;
  padding: 6px 20px;
  background-color: #fff;
  /* background-color: #f00; */
`;
export const TemporaryMessageText = styled.Text`
  color: #1B2432;
  text-align: left;
  margin: 0 auto;
`;

export const TemporaryMessageIcon = styled(Icon)`
  font-size: 21px;
  color: #AE1919;
  /* background-color: #fff; */
`;
export const TemporaryMessageIconView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 10%;
  /* background-color: #999; */
`;
