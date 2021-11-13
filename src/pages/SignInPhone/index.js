import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
// import OTPInputView from '@twotalltotems/react-native-otp-input'
// import OtpInputs from 'react-native-otp-inputs';
import auth from '@react-native-firebase/auth';
// -----------------------------------------------------------------------------
import { signInRequest } from '~/store/modules/auth/actions';
import Background from '~/components/Background';
import logo from '~/assets/detective/detectiveBlack.png';
// import logo from '~/assets/detective/detective.svg';
import godtaskerFont from '~/assets/detective/godtaskerFontPlainGreySmall.png';
import {
  ButtonText,
  Container,
  Wrapper,
  FormWorker, FormInputWorkerPassword,
  GeneralButton, GeneralButtonText,
  ImageLogo, ImageGodtaskerFont,
  OtpMask, OtpDigit, OtpView,
  PhoneMask,
  SubmitButton, SignUpTouchable, SignUpText, StyledScrollView,
  Title,
} from './styles';
// -----------------------------------------------------------------------------
export default function SignInPhone({ navigation }) {
  const signed = useSelector(state => state.auth.signed);

  const [phonenumber, setPhonenumber] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [code, setCode] = useState('');
  const [digit1, setDigit1] = useState();
  const [digit2, setDigit2] = useState();
  const [digit3, setDigit3] = useState();
  const [digit4, setDigit4] = useState();
  const [digit5, setDigit5] = useState();
  const [digit6, setDigit6] = useState();
  const digit1Ref = useRef();
  const digit2Ref = useRef();
  const digit3Ref = useRef();
  const digit4Ref = useRef();
  const digit5Ref = useRef();
  const digit6Ref = useRef();

  function handleDigit1(text) {
    setDigit1(text)
    if(text=='') return
    digit2Ref.current.focus()
    console.log(digit1)
  }

  function handleDigit2(text) {
    setDigit2(text)
    if(text=='') return
    digit3Ref.current.focus()
    console.log(digit2)
  }

  function handleDigit3(text) {
    setDigit3(text)
    if(text=='') return
    digit4Ref.current.focus()
    console.log(digit3)
  }

  function handleDigit4(text) {
    setDigit4(text)
    if(text=='') return
    digit5Ref.current.focus()
    console.log(digit4)
  }

  function handleDigit5(text) {
    setDigit5(text)
    if(text=='') return
    digit6Ref.current.focus()
    console.log(digit5)
  }

  function handleDigit6(text) {
    setDigit6(text)
    if(text=='') return
    console.log(digit6)
  }

  function handleErase() {
    setDigit1(); setDigit2(); setDigit3();
    setDigit4(); setDigit5(); setDigit6();
    digit1Ref.current.focus()

  }

  async function handleSubmitPhone(phonenumber) {
    try {
      const countryCode = '+'+'55'
      const unmaskedPhonenumber = phonenumber.replace(/[()\s-]/g, '')
      // const parsedPhonenumber = countryCode+unmaskedPhonenumber;
      // const parsedPhonenumber = '+5511983495853'
      const confirmation = await auth().signInWithPhoneNumber(phonenumber);
      setConfirm(confirmation);
      Alert.alert('Código enviado por SMS!')
    }
    catch (error) {
      console.log(error)
    }
  }

  async function confirmCode() {
    const fullCode=digit1+digit2+digit3+digit4+digit5+digit6
    console.log(fullCode)
    // setDigit1();
    // setDigit2();
    // setDigit3();
    // setDigit4();
    // setDigit5();
    // setDigit6();
    try {
      // const unmaskedCode = (
      //   codeVar => codeVar.replace(/[()\s-]/g, '')
      // )
      const unmaskedCode = fullCode
      console.log(unmaskedCode)
      // const response = await confirm.confirm(unmaskedCode(code));
      const response = await confirm.confirm(fullCode);
      const countryCode = '+'+'55'
      const unmaskedPhonenumber = phonenumber.replace(/[()\s-]/g, '')
      console.log(unmaskedPhonenumber)
      navigation.navigate('SignIn',
        {
          phonenumber: countryCode+unmaskedPhonenumber,
        }
      )
    } catch (error) {
      Alert.alert('O código não confere.')
    }
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

            <Wrapper>
              <Title>Login</Title>
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
                        placeholderTextColor={'#999'}
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
                    {/* <OtpMask
                      type={'custom'}
                      options={{ mask: '9 9 9 9 9 9' }}
                      placeholder="9"
                      returnKeyType="next"
                      value={code}
                      onChangeText={text => setCode(text)}
                    /> */}
                    <OtpView>
                      <OtpDigit
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit1}
                        onChangeText={text => handleDigit1(text)}
                        ref={digit1Ref}
                        autoFocus={true}
                        clearTextOnFocus={true}
                      />
                      <OtpDigit
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit2}
                        onChangeText={text => handleDigit2(text)}
                        ref={digit2Ref}
                        clearTextOnFocus={true}
                      />
                      <OtpDigit
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit3}
                        onChangeText={text => handleDigit3(text)}
                        ref={digit3Ref}
                        clearTextOnFocus={true}
                      />
                      <OtpDigit
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit4}
                        onChangeText={text => handleDigit4(text)}
                        ref={digit4Ref}
                        clearTextOnFocus={true}
                      />
                      <OtpDigit
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit5}
                        onChangeText={text => handleDigit5(text)}
                        ref={digit5Ref}
                        clearTextOnFocus={true}
                      />
                      <OtpDigit
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit6}
                        onChangeText={text => handleDigit6(text)}
                        ref={digit6Ref}
                        clearTextOnFocus={true}
                      />
                    </OtpView>
                    <SubmitButton title="Confirm Code" onPress={() => confirmCode()}>
                      <ButtonText>Confirmar</ButtonText>
                    </SubmitButton>
                    <GeneralButton title="Confirm Code" onPress={() => handleErase()}>
                      <GeneralButtonText>Apagar</GeneralButtonText>
                    </GeneralButton>
                  </FormWorker>
                </>
              )}

            </Wrapper>

          </StyledScrollView>
      </Container>
    </Background>
  );
}
