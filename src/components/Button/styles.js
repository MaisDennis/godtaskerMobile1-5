import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
// -----------------------------------------------------------------------------
const primaryFont = 'OpenSans-Bold';
const secondaryFont = 'OpenSans-Regular';

export const ButtonWrapper = styled(TouchableOpacity)`
flex-direction: row;
align-items: center;
  justify-content: center;
  height: ${props => props.small == true ? '36px' : '40px'};
  width: ${props => props.small == true ? '108px' : '100%'};
  border-radius: 4px;
  border: ${props => props.type == 'inverted' ? '2px' : 'none'};
  border-color: ${props => props.textColor ? props.textColor : '#403F4C'};
  margin: 0 auto;
  background-color: ${props => props.backgroundColor
    ? props.backgroundColor
    : (props => props.type == 'inverted' ? 'transparent' : '#999')
  };
  /* background-color: #18A0FB; */
`;

export const ButtonIcon = styled(Icon)`
  padding-right: 8px;
  color: #fff;
`;

export const ButtonText = styled.Text`
  font-size: ${Platform.OS === 'ios'
  ? (props => props.text == 'secondary' ? '14px' : '15px')
  : (props => props.text == 'secondary' ? '12px' : '13px')
  };
  font-weight: bold;
  color: ${props => props.textColor ? props.textColor : "#403F4C"} ;
`;

export const Container = styled.View`
  width: ${props => props.small == true ? 'auto' : '100%'};
  height: auto;
  margin: 0 auto;
  /* background-color: #f5f; */
`;
