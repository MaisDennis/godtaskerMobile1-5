import {
  KeyboardAvoidingView, Platform, SafeAreaView,
  TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { TextInputMask as InputMask } from 'react-native-masked-text'
// -----------------------------------------------------------------------------
import Input from '~/components/Input';
import Button from '~/components/Button';
// -----------------------------------------------------------------------------
export const AlignView = styled.View`
  margin: 16px 0;
  /* background-color: #444; */
`;

export const ButtonText = styled.Text`
font-size: ${Platform.OS === 'ios' ? '16px' : '14px'};
font-weight: bold;
/* background: #999; */
color: #fff;
`;

// export const Container = styled.KeyboardAvoidingView.attrs({
//   enabled: Platform.OS === 'ios',
//   behavior: 'position',
// })`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
// `;

export const Container = styled.SafeAreaView`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;

  /* background-color: #ff0; */
`;

export const Div1 = styled.View`
flex-direction: row;
width: 100%;
/* background: #5edc1f; */
`;

export const FormInputWorkerPassword = styled(TextInput)`
  height: 44px;
  width: 80%;
  border-radius: 8px;
  border-width: 1px;
  border-color: #000;
  margin: 8px auto;
  padding-left: 12px;
  color: #000;
  background-color: #ddd;
  /* background: #c4ce3b; */
`;

export const FormWorker = styled(KeyboardAvoidingView)`
  width: 100%;
  height: auto;
  margin: 0;
  /* background: #c4ce3b; */
`;

export const ImageLogo = styled.Image`
  /* width: 102px; */
  width: 75px;
  /* height: 98px; */
  height: 70px;
  margin: 4px auto;
`;

export const ImageGodtaskerFont = styled.Image`
  width: 210px;
  /* height: 72px; */
  height: 38px;
  margin: 12px auto 12px;
`;

export const Label = styled.Text`
font-size: 16px;
/* font-weight: bold; */
width: 340px;
text-align: center;
margin: 14px auto 10px;
/* background: #999; */
color: #1B2432;
`;

export const PhoneMask = styled(InputMask)`
  height: 44px;
  width: 80%;
  border-radius: 8px;
  /* border-top-left-radius: 8px;
  border-top-right-radius: 8px; */
  border-width: 1px;
  border-color: #1B2432;
  padding-left: 12px;
  margin: 8px auto;
  color: #1B2432;
  background-color: #ddd;
`;

export const SubmitButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 80%;
  border-radius: 8px;
  margin: 8px auto 0;
  background-color: #1B2432;
`;

export const SignUpButton = styled(Button)`
  height: 44px;
  width: 80%;
  border-radius: 8px;
  padding: 0 16px;
  margin-top: 8px;
  background-color: #18A0FB;
`;

export const SignUpText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? '16px' : '14px'};
  font-weight: bold;
  color: #fff;
  /* color: #44ccee; */

`;

export const StyledScrollView = styled.ScrollView`
/* background: #F5F; */
`;

export const Title = styled.Text`
font-size: 16px;
/* font-weight: bold; */
max-width: 64%;
text-align: center;
margin: 8px auto;
/* background: #999; */
color: #1B2432;
`;

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 80%;
  min-width: 320px;
  border-radius: 4px;
  padding-bottom: 12px;
  margin: 0 auto;
  /* background-color: #f5f5f5; */
`;
