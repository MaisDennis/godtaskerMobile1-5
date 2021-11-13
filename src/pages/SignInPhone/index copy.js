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

// import firebase from '~/services/firebase'
// -----------------------------------------------------------------------------
export default function SignInPhone({ navigation }) {
  const dispatch = useDispatch();
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector(state => state.auth.loading);
  const signed = useSelector(state => state.auth.signed);

  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [code, setCode] = useState('');
  // const phoneInput = useRef<PhoneInput>(null);

  function handleSubmit() {
    // const unmaskedPhoneNumber = (
    //   maskedPhoneNumber => '+55'+maskedPhoneNumber.replace(/[()\s-]/g, '')
    // )
    // console.tron.log(unmaskedPhoneNumber(phonenumber))
    dispatch(
      signInRequest(
        // unmaskedPhoneNumber(phonenumber), password
        '+5511983495853', '123123'
      )
    );
  }

  async function handleSubmitPhone(phonenumber) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phonenumber);
      setConfirm(confirmation);
      console.tron.log(confirmation)
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
      console.tron.log(response);
      navigation.navigate('SignIn')
    } catch (error) {
      console.tron.log('Invalid code.');
      Alert.alert('O código não confere.')
    }
  }

  function handleSignUp() {
    navigation.navigate('SignUp')
  }

  if (signed) {
    navigation.navigate('Home')
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
                      <SubmitButton onPress={() => handleSubmitPhone('+5511983495853')}>
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
                        {
                          mask: '9 9 9 9 9 9'
                        }
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
