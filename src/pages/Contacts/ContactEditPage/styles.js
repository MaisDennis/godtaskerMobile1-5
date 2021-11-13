import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TextInputMask as InputMask } from 'react-native-masked-text'

export const AlignView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const AlignCheckBoxView = styled.View`
  display: flex;
  flex-direction:column;
  align-items: flex-start;
  width: 100%;
  /* background-color: #ee4; */
`;

export const CheckBoxView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 80%;
  margin: 4px 0;
`;
export const Container = styled.SafeAreaView`
  display: flex;
  height: 100%;

  /* background-color: #4433ee; */
`;
export const CheckBoxWrapper = styled.ScrollView`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 300px;
  padding: 12px;
  border-radius: 12px;
  /* border: 1px solid #ccc; */
  background-color: #fff;
`;
export const DescriptionSpan = styled.Text`
  font-weight: normal;
  font-size: 14px;
  text-align: justify;
  line-height: 20px;
  margin: 4px;
  color: #222;
`;
export const DateOptionsView = styled.View`
  display: flex;
  width: 100%;
  border-radius: 12px;
  /* border: 1px solid #ccc; */
  background-color: #fff;
`;

export const FormScrollView = styled.ScrollView`
  display: flex;
  width: 100%;
  padding: 12px 0;

  background-color: #f5f5f5;
`;

export const Input = styled.TextInput`
  display: flex;
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #999;
  background-color: #fff;
`;

export const ItemWrapperView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  margin-bottom: 12px;
  /* padding: 12px; */
  align-items: flex-start;
  /* background-color: #ff0; */
`;

export const LabelText = styled.Text`
  font-size: 14px;
  font-weight: normal;
  color: #666;
  margin: 4px;
`;

export const ModalButtonWrapper = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 33%;
margin-top: 12px;
`;

export const PhoneMask = styled(InputMask)`
  display: flex;
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #999;
  background-color: #f5f5f5;
`;

export const SubTaskView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
  border-radius: 12px;
  /* background-color: #f5f; */
`;
export const SubTaskLabelText = styled.Text`
  font-size: 14px;
  font-weight: normal;
  color: #666;
  width: 5%;
  /* margin: 4px; */
`;
export const SubTaskInput = styled.TextInput`
  display: flex;
  height: auto;
  width: 95%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
  background-color: #fff;
`;
export const SubmitButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 56px;
  width: 100%;
  margin: 16px 0 24px 0;
  border-radius: 4px;
  background-color: #4433ee;
`;

export const SubmitButtonText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #fff;
`;
export const SubmitWrapper = styled.View`
height: 100px;
width: 100%;
background-color: #4433ee;
`;

export const TitleText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: #222;
`;
