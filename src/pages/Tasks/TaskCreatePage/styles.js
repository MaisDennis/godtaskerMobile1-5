import styled from 'styled-components/native';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-date-picker' // https://github.com/henninghall/react-native-date-picker
import Icon from 'react-native-vector-icons/Feather';
import Button from '~/components/Button';

export const AlignCheckBoxView = styled.View`
  display: flex;
  flex-direction:column;
  align-items: flex-start;
  width: 100%;
  margin: 8px 0 0;
  /* background-color: #ee4; */
`;

export const ButtonView = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 100%;
  border-radius: 8px;
  margin: 8px auto;
  padding: 0 16px;
  background-color: #403F4C;
`;

export const ButtonView2 = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 100%;
  border-radius: 8px;
  margin: 8px auto 8px;
  padding: 0 16px;
  background-color: #009966;
`;

export const ButtonText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? '15px' : '13px'};
  font-weight: bold;
  color: #fff;
`;

export const CheckBoxWrapper = styled.ScrollView`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 12px;
  border-radius: 8px;
  /* border: 1px solid #ccc; */
  background-color: #fff;
  /* background-color: #ee3; */
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
  background-color: ${Platform.OS === 'ios' ? '#ddd' : '#f5f5f5'};
  /* background-color: #4433ee; */
`;

export const DateOptionsView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  border-width: 1px;
  border-color: #1B2432;
  padding: 12px;
  margin: 8px 0;
  /* background-color: #4433ee; */
  background-color: #eee;

`;
export const DateOptions = styled(DatePicker)`
  width: 100%;
  height: 120px;
  margin: 0;
  /* background-color: #f5f; */
`;

export const DescriptionSpan = styled.Text`
  font-weight: normal;
  font-size: 14px;
  text-align: justify;
  line-height: 20px;
  margin: 4px;
  color: #222;
`;

export const FormScrollView = styled.ScrollView`
  display: flex;
  width: 100%;
  padding: 12px 0;
  background-color: #fff;
  /* background-color: #f00; */
`;

export const HrLine = styled.View`
width: 100%;
border: 0.5px #ddd;
margin: 8px auto;
`;

export const Input = styled.TextInput`
  display: flex;
  min-height: 44px;
  height: auto;
  width: 100%;
  font-size: ${Platform.OS === 'ios' ? '14px' : '12px'};
  line-height: ${Platform.OS === 'ios' ? '20px' : '18px'};
  padding: 4px 12px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #1B2432;
  margin: 8px 0;
  color: #1B2432;
  background-color: #eee;
`;

export const IosKeyboardAvoidingView = styled(KeyboardAvoidingView)`

`;

export const ItemWrapperView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  height: auto;
  margin: 8px 0;
  /* background-color: #ff0; */
`;

export const LabelText = styled.Text`
  font-weight: bold;
  font-size: ${Platform.OS === 'ios' ? '14px' : '12px'};
  margin-right: 8px;
  color: #1B2432;
`;

export const ModalView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: auto;
  width: 100%;
  margin-bottom: 12px;
  /* padding: 12px; */
  align-items: flex-start;
  /* background-color: #ff0; */
`;

export const RadioButtonView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: auto;
  margin: 8px 0;
  /* background-color: #4ee; */
`;
export const RadioButtonTag = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: auto;
  margin: 0 8px;
  /* background-color: #999; */
`;
export const RadioButtonTagConfirmPhoto = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: auto;
  margin: 0 8px;
  /* background-color: #999; */
`;

export const RadioButtonLabel = styled.Text`
  max-width: 100%;
  font-size: ${Platform.OS === 'ios' ? '14px' : '12px'};
`;

export const RadioButtonLabelText = styled.Text`
  max-width: 100%;
  font-weight: bold;
  font-size: ${Platform.OS === 'ios' ? '14px' : '12px'};
  color: #1B2432;
`;

export const RadioButtonOuter = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  border-width: 1px;
  border-color: #1B2432;
  margin-top: 8px;
  background-color: #fff;

`;
export const RadioButtonInner0 = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background-color: ${props => props.switch === 0 ? '#1B2432' : '#ddd'};
`;
export const RadioButtonInner1 = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background-color: ${props => props.switch === 1 ? '#1B2432' : '#ddd'};
`;
export const RadioButtonInner2 = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background-color: ${props => props.switch === 2 ? '#1B2432' : '#ddd'};
`;
export const RadioButtonInner3 = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background-color: ${props => props.switch === 3 ? '#1B2432' : '#ddd'};
`;
export const RadioButtonInner4 = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background-color: ${props => props.switch === 4 ? '#1B2432' : '#ddd'};
`;

export const SubmitButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 100%;
  border-radius: 8px;
  margin: 0 auto 40px;
  padding: 0 16px;
  background-color: #18A0FB;
`;
export const SubmitButtonText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? '15px' : '13px'};
  font-weight: bold;
  color: #fff;
`;

export const SubTaskButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 50%;
  /* background-color: #666; */
`;

export const SubTaskButtonView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 32px;
  width: 100%;
  /* background-color: #44ccee; */
`;

export const SubTaskCancelIcon = styled(Icon)`
  height: auto;
  width: auto;
  font-size: 20px;
  font-weight: normal;
  /* text-align: center; */
  margin: auto;
  color: #AE1919;
  /* background-color: #111; */
`;

export const SubTaskEditIcon = styled(Icon)`
  height: auto;
  width: auto;
  font-size: 18px;
  font-weight: normal;
  /* text-align: center; */
  margin: auto;
  color: #1B2432;
  /* background-color: #111; */
`;

export const SubTaskInput = styled.TextInput`
  display: flex;
  height: auto;
  width: 100%;
  font-size: ${Platform.OS === 'ios' ? '14px' : '12px'};
  line-height: ${Platform.OS === 'ios' ? '20px' : '18px'};
  padding: 4px 12px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #1B2432;
  margin: 8px 0;
  background-color: #eee;

`;

export const SubTaskLabelText = styled.Text`
  width: 10%;
  font-size: ${Platform.OS === 'ios' ? '14px' : '12px'};
  font-weight: bold;
  color: #1B2432;
  /* margin: 4px; */
`;

export const SubTaskLeftView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  /* background-color: #f5f; */
`;

export const SubTaskRightView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  /* background-color: #f5f; */
`;

export const SubTaskTag = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
  height: auto;
  width: 100%;
  /* margin: 8px 0; */
  /* background-color: #44ccee; */
`;

export const SubTaskText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? '14px' : '12px'};
  line-height: ${Platform.OS === 'ios' ? '20px' : '18px'};
  font-weight: normal;
  /* height: 100%; */
  width: 90%;

  /* margin: 4px; */
  color: #1B2432;
  /* background-color: #f5f; */
`;

export const SubTaskWeigeText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? '14px' : '12px'};
  line-height: ${Platform.OS === 'ios' ? '20px' : '18px'};
  font-weight: normal;
  width: auto;
  color: #1B2432;
  /* background-color: #4433ee; */
`;

export const SubTaskWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: auto;
  width: 100%;
  border-radius: 8px;
  padding: 0 8px;
  margin: 8px 0;
  /* background-color: #999; */
`;

export const SubTaskView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 100%;
  /* background-color: #f5f; */
`;

export const TitleText = styled.Text`
  font-weight: 600;
  font-size: ${Platform.OS === 'ios' ? '16px' : '14px'};
  color: #1B2432;
`;

export const WeigeView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: auto;
  width: 100%;
  /* margin: 8px 0; */
  /* background-color: #f00; */
`;

export const WeigeTagView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 32px;
  width: 100%;
  padding: 0 12px;
  /* background-color: #999; */
`;

export const WeigeText = styled.Text`
font-weight: bold;
  font-size: ${Platform.OS === 'ios' ? '14px' : '12px'};
  margin-right: 8px;
  color: #1B2432;
  /* background-color: #f00; */
`;
