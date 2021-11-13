import { Platform, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { TextInputMask as InputMask } from 'react-native-masked-text'
import Icon from 'react-native-vector-icons/Feather';
// -----------------------------------------------------------------------------
import Input from '~/components/Input';
import Button from '~/components/Button';
// import { ImageBackgroundView } from '../Messages/MessagesConversationPage/styles';
// -----------------------------------------------------------------------------
export const AllIcon = styled(Icon)`
  font-size: 16px;
  margin: 16px 0 4px;
  color: #ccc;
  /* color: #44ccee */
`;
export const ButtonText = styled.Text`
font-size: 14px;
font-weight: bold;
/* background: #999; */
color: #fff;
`;

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'height',
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  background-color: ${Platform.OS === 'ios' ? '#ddd' : '#f5f5f5'};
`;

export const Form = styled.ScrollView`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* background-color: #4433ee; */
`;
export const FormInput = styled.TextInput`
  height: 48px;
  width: 80%;
  padding-left: 16px;
  margin: 8px 0;
  border-radius: 4px;
  border-width: 1px;
  border-color: #999;
  color: #222;
  background-color: #fff;
`;

export const GenderDiv = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  margin: 16px 0 4px;
  /* background-color: #4433ee; */
`;

export const ImageWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 4px 0;
  /* background-color: #f5f5; */
`;

export const LabelText = styled.Text`
  max-width: 80%;
  font-size: 14px;
  font-weight: normal;
  color: #666;
  margin: 4px;
`;

export const PhoneMask = styled(InputMask)`
  height: 48px;
  width: 80%;
  padding-left: 16px;
  margin: 8px 0;
  border-radius: 4px;
  border-width: 1px;
  border-color: #999;
  color: #222;
  background-color: #fff;
`;

export const RadioButtonView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: auto;
  /* background-color: #4ee; */
`;
export const RadioButtonTag = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: auto;
  margin: 12px auto;
  /* background-color: #999; */
`;
export const RadioButtonTagConfirmPhoto = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: auto;
  margin: 8px;
  /* background-color: #999; */
`;

export const RadioButtonLabel = styled.Text`
  max-width: 100%;
  font-size: ${Platform.OS === 'ios' ? '13px' : '12px'};
  /* font-size: 14px; */
  font-weight: normal;
  /* color: #666; */
  /* margin: 4px; */

`;
export const RadioButtonLabelText = styled.Text`
  max-width: 100%;
  font-size: ${Platform.OS === 'ios' ? '13px' : '12px'};
  /* font-size: 14px; */
  font-weight: normal;
  color: #666;
  margin: 4px;
`;

export const RadioButtonOuter = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  border-width: 0.5px;
  border-color: #666;
  margin-top: 8px;
  background-color: #fff;

`;
export const RadioButtonInner1 = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background-color: ${props => props.switch === 'feminino' ? '#666' : '#fff'};
`;
export const RadioButtonInner2 = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background-color: ${props => props.switch === 'masculino' ? '#666' : '#fff'};
`;
export const RadioButtonInner3 = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background-color: ${props => props.switch === 'alien' ? '#666' : '#fff'};
`;
export const RadioButtonInner4 = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background-color: ${props => props.switch === 'outro' ? '#666' : '#fff'};
`;

export const SubmitButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 56px;
  width: 80%;
  border-radius: 4px;
  margin: 16px;
  background-color: #4433ee;

`;
export const SignUpErrorText = styled.Text`
  color: #f3c775;
  /* font-weight: bold; */
  font-size: 16px;
`;

export const UserImage = styled.Image`
  height: 76px;
  width: 76px;
  border-radius: 76px;
  border-width: 1px;
  border-color: #999;
  background-color: #fff;
`;

export const UserImageBackgroundView = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 80px;
  border-radius: 80px;
  border-width: 1px;
  border-color: #666;
  /* background-color: #f00; */
`;
