import {
  KeyboardAvoidingView, Platform,
  SafeAreaView,
  TextInput, TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import { TextInputMask as InputMask } from 'react-native-masked-text'
// -----------------------------------------------------------------------------
import Input from '~/components/Input';
import Button from '~/components/Button';
// -----------------------------------------------------------------------------

export const ButtonText = styled.Text`
font-size: 16px;
font-weight: bold;
color: #fff;
/* background-color: #f5f; */
`;

// export const Container = styled.KeyboardAvoidingView.attrs({
//   enabled: Platform.OS === 'ios',
//   behavior: 'position',
// })`
//   display: flex;
//   /* flex: 1; */
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   height: auto;
// `;

export const Container = styled.SafeAreaView`
  /* background-color: #f00; */
`;

export const FormWorker = styled.View`
  width: 100%;
  height: auto;
  margin: 0;
  /* background: #c4ce3b; */
`;

export const GeneralButton = styled(Button)`
  height: 56px;
  width: auto;
  margin: 0 auto;
  padding: 0 16px;
  /* width: 148px; */
  /* background-color: #f5f; */
  /* width: 50%; */
`;

export const GeneralButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #4433ee;
  /* background-color: #f5f; */
`;

export const ImageLogo = styled.Image`
  width: 148px;
  height: 148px;
  /* border-radius: 24px; */
  margin: 120px auto 4px;
`;

export const ImageGodtaskerFont = styled.Image`
  width: 240px;
  height: 80px;
  margin: auto auto 4px;
`;

export const OtpDigit = styled.TextInput`
  height: 56px;
  width: 15%;
  text-align: center;
  margin: 0;
  border: 1px solid #999;
  border-radius: 4px;
  color: #222;
  background-color: #fff;
`;

export const OtpView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 16px auto;
  /* background-color: #f5f; */
`;

export const OtpMask = styled(InputMask)`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  font-size: 21px;
  height: 56px;
  width: 15%;
  padding: 0 12px;
  border-radius: 4px;
  border: 1px solid #666;
  margin: 16px auto;
  color: #fff;
  background-color: #f5f5f5;
`;

export const PhoneMask = styled(InputMask)`
  height: 56px;
  width: 80%;
  border-radius: 4px;
  border: 1px solid #999;
  padding-left: 12px;
  margin: 16px auto;
  color: #222;
  background-color: #f5f5f5;
`;

export const SubmitButton = styled(Button)`
  height: 56px;
  width: 80%;
  margin: 8px auto;
  /* width: 148px; */
  background-color: #4433ee;
  /* width: 50%; */
`;

export const StyledKeyboardAvoiding = styled(KeyboardAvoidingView)`
  /* background: #58595B; */
  width: 100%;
`;

export const SignUpTouchable = styled(TouchableOpacity)`
display: flex;
align-items: center;
margin-top: 12px;

`;

export const SignUpText = styled.Text`
  /* color: #44ccee; */
  color: #4433ee;
`;
export const StyledScrollView = styled.ScrollView`
/* background: #F5F; */
`;

export const Title = styled.Text`
font-size: 21px;
font-weight: bold;
margin: 16px auto 8px;
color: #666;
/* background-color: #999; */
`;

export const Wrapper = styled.View`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: auto;
width: 100%;
min-width: 320px;
border-radius: 4px;
padding-bottom: 24px;
margin: 24px auto;
background-color: #f5f5f5;
`;
