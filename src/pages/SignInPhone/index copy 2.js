import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextInput, Alert } from 'react-native';
// import PhoneInput, { getPickerData } from 'react-native-phone-input'
// import PhoneInput from "react-native-phone-number-input";
// import OTPInputView from '@twotalltotems/react-native-otp-input'
import OtpInputs from 'react-native-otp-inputs';

import auth from '@react-native-firebase/auth';
// -----------------------------------------------------------------------------
import { signInRequest } from '~/store/modules/auth/actions';
import Background from '~/components/Background';
import logo from '~/assets/detective/detectiveBlack.png';
import godtaskerFont from '~/assets/detective/godtaskerFontPlainGreySmall.png';
import {
  Container, ImageLogo, ImageGodtaskerFont,
  Title, Div1, Div2,
  FormWorker, OtpInput, OtpMask,
  SubmitButton, ButtonText, SignUpTouchable, SignUpText,
  FormInputWorkerPassword, PhoneMask, StyledScrollView
} from './styles';
// -----------------------------------------------------------------------------
export default function SignInPhone({ navigation }) {
  const [phonenumber, setPhonenumber] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [code, setCode] = useState('');

  async function handleSubmitPhone(phonenumber) {
    try {
      const countryCode = '+'+'55'
      const unmaskedPhonenumber = phonenumber.replace(/[()\s-]/g, '')
      // const parsedPhonenumber = countryCode+unmaskedPhonenumber;
      const parsedPhonenumber = '+5511983495853'
      const confirmation = await auth().signInWithPhoneNumber(parsedPhonenumber);
      setConfirm(confirmation);
      // console.tron.log(confirmation)
      Alert.alert('Código enviado por SMS!')
    }
    catch (error) {
      console.tron.log(error)
    }
  }

  async function confirmCode() {
    try {
      const unmaskedCode = (
        codeVar => codeVar.replace(/[()\s-]/g, '')
      )
      const response = await confirm.confirm(unmaskedCode(code));
      const countryCode = '+'+'55'
      const unmaskedPhonenumber = phonenumber.replace(/[()\s-]/g, '')
      console.tron.log(unmaskedPhonenumber)
      navigation.navigate('SignIn',
        // {
        //   phonenumber: countryCode+unmaskedPhonenumber,
        // }
      )
      console.tron.log(response);
    }
    catch (error) {
      Alert.alert('O código não confere.')
    }
  }
  // -----------------------------------------------------------------------------
  return (
    <Background>
      <Container>
        <StyledScrollView>
          <ImageLogo source={logo} />
          <ImageGodtaskerFont source={godtaskerFont} />
          <Div1>
            <Div2>
              <Title>Bem-vindo!</Title>
              { !confirm
                ? (
                  <>
                    <FormWorker>
                      <PhoneMask
                        type={'cel-phone'}
                        options={
                          {
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) ',
                          }
                        }
                        placeholder="Número de Whatsapp"
                        returnKeyType="next"
                        value={phonenumber}
                        onChangeText={setPhonenumber}
                        placeholderTextColor={'#ccc'}
                      />
                      <SubmitButton onPress={() => handleSubmitPhone(phonenumber)}>
                        <ButtonText>Entrar</ButtonText>
                      </SubmitButton>
                    </FormWorker>
                  </>
                )
              : (
                <>
                  <FormWorker>
                    {/* <OtpInput value={code} onChangeText={text => setCode(text)} /> */}
                    <OtpMask
                      type={'custom'}
                      options={
                        { mask: '9 9 9 9 9 9' }
                      }
                      placeholder=""
                      returnKeyType="next"
                      value={code}
                      onChangeText={text => setCode(text)}
                      placeholderTextColor={'#ccc'}
                    />
                    <SubmitButton title="Confirm Code" onPress={() => confirmCode()}>
                      <ButtonText>Confirmar</ButtonText>
                    </SubmitButton>
                  </FormWorker>
                </>
              )}

            </Div2>
          </Div1>
          </StyledScrollView>
      </Container>
    </Background>
  );
}
