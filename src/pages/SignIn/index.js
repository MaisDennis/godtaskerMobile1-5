import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// -----------------------------------------------------------------------------
import { signInRequest } from '~/store/modules/auth/actions';
import Background from '~/components/Background';
// import logo from '~/assets/detective/detectiveBlack.png';
import logo from '~/assets/detective/detective_remake.png'
// import godtaskerFont from '~/assets/detective/godtaskerFontPlainGreySmall.png';
import godtaskerFont from '~/assets/detective/font_remake.png';
import {
  AlignView,
  ButtonText,
  Container,
  FormWorker, FormInputWorkerPassword,
  ImageLogo, ImageGodtaskerFont,
  Label,
  PhoneMask,
  SubmitButton, SignUpButton, SignUpText, StyledScrollView,
  Title,
  Wrapper,
} from './styles';
// -----------------------------------------------------------------------------
export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector(state => state.auth.loading);
  const signed = useSelector(state => state.auth.signed);
  const passwordRef = useRef();

  // const test = route.params.phonenumber;
  // console.tron.log(route.params)

  function handleSubmit() {
    const unmaskedPhoneNumber = (
      maskedPhoneNumber => maskedPhoneNumber.replace(/[()\s-]/g, '')
    )
    const countryCode = '+55'
    const parsedUnmaskedPhoneNumber = countryCode+unmaskedPhoneNumber(phonenumber)
    // console.tron.log(parsedUnmaskedPhoneNumber)
    dispatch(
      signInRequest(
        parsedUnmaskedPhoneNumber, password
      )
    );
  }

  function handleSignUp() {
    navigation.navigate('SignUp',
      // {
      //   phonenumber: test
      // }
    )
  }

  if (signed) {
    navigation.navigate('Home')
  }
  // -----------------------------------------------------------------------------
  return (
    <Background>
      <Container>
        <StyledScrollView>
          <AlignView>
            <ImageLogo source={logo} />
            <ImageGodtaskerFont source={godtaskerFont} />
            <Title>Delegate tasks to anyone in a clear and organized way</Title>

            <Wrapper>
              <Label>Sign In</Label>

              <FormWorker
                  behavior={Platform.OS === "ios" ? "padding" : "padding"}
                  keyboardVerticalOffset = {Platform.OS === "ios" ? "100" : "100"}
              >
                <PhoneMask
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  }}
                  placeholder="Phone number"
                  placeholderTextColor={'#666'}
                  onSubmitEditing={() => passwordRef.current.focus()}
                  returnKeyType="next"
                  value={phonenumber}
                  onChangeText={setPhonenumber}
                />
                <FormInputWorkerPassword
                  // icon="unlock"
                  secureTextEntry={true}
                  placeholder="Sua senha"
                  placeholderTextColor={'#666'}
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit}
                  value={password}
                  onChangeText={setPassword}
                  ref={passwordRef}
                />
                <SubmitButton
                  loading={loading}
                  onPress={handleSubmit}
                >
                  <ButtonText>Login</ButtonText>
                </SubmitButton>

              </FormWorker>
              <Label>or</Label>
              <SignUpButton
              onPress={handleSignUp}
            >
              <SignUpText>Sign Up</SignUpText>
            </SignUpButton>
            </Wrapper>
          </AlignView>
        </StyledScrollView>
      </Container>
    </Background>
  );
}
