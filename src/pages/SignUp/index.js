import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
// import * as Yup from 'yup';
// -----------------------------------------------------------------------------
import Background from '~/components/Background';
// import logo from '~/assets/detective/detectiveBlack.png';
// import godtaskerFont from '~/assets/detective/godtaskerFontPlainGreySmall.png';
import {
  AllIcon,
  ButtonText,
  Container,
  EyeButton, EyeIcon,
  Form, FormInput,
  GenderDiv,
  IconView,
  LabelText,
  // ImageGodtaskerFont, ImageLogo,
  PhoneMask,
  RadioButtonView, RadioButtonTag,
  RadioButtonLabel, RadioButtonOuter, RadioButtonInner0,
  RadioButtonInner1, RadioButtonInner2, RadioButtonInner3,
  RadioButtonInner4, RadioButtonLabelText,
  SignUpErrorText,
  SubmitButton,
  Wrapper,
} from './styles';
import { signUpRequest } from '~/store/modules/auth/actions';
// import { goBack } from '../../services/NavigationService';
// -----------------------------------------------------------------------------
export default function SignUp({ navigation, route }) {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phonenumber, setPhonenumber] = useState();
  const [email, setEmail] = useState();
  const [birthDate, setBirthDate] = useState();
  const [gender, setGender] = useState("feminino");
  const [signUpError, setSignUpError] = useState();
  const [secureText, setSecureText] = useState(true);
  // const test = route.params.phonenumber;
  // console.log(test)

  const genderOptions = [ 'feminino', 'masculino', 'alien', 'outro', '']
  const placeHolderColor = '#999';

  function handleSubmit() {
    // if (!firstName || !lastName) {
    //   Alert.alert(
    //     'Please complete your name and lastname',
    //     'Your bio will show your full name',
    //     [{ style: "default" }],
    //     { cancelable: true },
    //   );
    //   return;
    // }
    // if (!userName) {
    //   Alert.alert(
    //     'Please complete username',
    //     'Your username is unique to you in Godtasker',
    //     [{ style: "default" }],
    //     { cancelable: true },
    //   );
    //   return;
    // }
    // if (!email) {
    //   Alert.alert(
    //     'Please enter e-mail address',
    //     '',
    //     [{ style: "default" }],
    //     { cancelable: true },
    //   );
    //   return;
    // }
    // if (!phonenumber || (phonenumber.length < 15)) {
    //   Alert.alert(
    //     'Please enter a valid phonenumber',
    //     'Ex. (99) 91234-1234',
    //     [{ style: "default" }],
    //     { cancelable: true },
    //   );
    //   return;
    // }
    // if (!birthDate || (birthDate.length < 10)) {
    //   Alert.alert(
    //     'Please enter a valid birth date',
    //     'Ex. 01/01/2001',
    //     [{ style: "default" }],
    //     { cancelable: true },
    //   );
    //   return;
    // }
    // if ((password.length < 8) || (confirmPassword.length < 8)) {
    //   Alert.alert(
    //     'Please enter a password and confirm password',
    //     'Mininum 8 charaters',
    //     [{ style: "default" }],
    //     { cancelable: true },
    //   );
    //   return;
    // }
    // if (password  !== confirmPassword) {
    //   Alert.alert(
    //     'Password and confirm password do not match',
    //     'Use "eye" to visualize password, if needed',
    //     [{ style: "default" }],
    //     { cancelable: true },
    //   );
    //   return;
    // }

    try {
    const unmaskedPhoneNumber = (
      maskedPhoneNumber => maskedPhoneNumber.replace(/[()\s-]/g, '')
    )
    const countryCode = '+55'
    const parsedPhonenumber = countryCode+unmaskedPhoneNumber(phonenumber)

      dispatch(signUpRequest(
        firstName, lastName, userName, password,
        parsedPhonenumber, email, birthDate, gender
      ));
      // navigation.goBack();
    }
    catch (error) {
      Alert.alert(
        'Error in data',
        `${error}`
      )
    }
  }

  function handleSecureText() {
    setSecureText(!secureText)
  }
  // -----------------------------------------------------------------------------
  return (
    <Background>
      <Container>
        {/* <ImageLogo source={logo} />
        <ImageGodtaskerFont source={godtaskerFont} /> */}
        <Form contentContainerStyle={{ alignItems: 'center' }}>
          <Wrapper>
            <IconView>
              <AllIcon name='user'/>
            </IconView>
            <FormInput
              autoCorrect={false}
              placeholder="Name"
              placeholderTextColor={placeHolderColor}
              returnKeyType="next"
              value={firstName}
              onChangeText={setFirstName}
            />
            <FormInput
              autoCorrect={false}
              placeholder="Lastname"
              placeholderTextColor={placeHolderColor}
              returnKeyType="next"
              value={lastName}
              onChangeText={setLastName}
            />
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Username"
              placeholderTextColor={placeHolderColor}
              returnKeyType="next"
              value={userName}
              onChangeText={setUserName}
            />
            {/* <HrLine/> */}
            <IconView>
              <AllIcon name='info'/>
            </IconView>

            <FormInput
              keboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="e-mail"
              placeholderTextColor={placeHolderColor}
              value={email}
              onChangeText={setEmail}
            />
            <PhoneMask
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              placeholder="Phonenumber"
              placeholderTextColor={placeHolderColor}

              returnKeyType="next"
              value={phonenumber}
              onChangeText={setPhonenumber}
            />
            <PhoneMask
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY',
              }}
              placeholder="Birthdate (DD/MM/YYYY)"
              placeholderTextColor={placeHolderColor}
              returnKeyType="next"
              value={birthDate}
              onChangeText={setBirthDate}
            />
            <GenderDiv>
              <LabelText>Gender</LabelText>
              <RadioButtonView>
                <RadioButtonTag onPress={() => setGender('feminino')}>
                  <RadioButtonLabel>female</RadioButtonLabel>
                  <RadioButtonOuter>
                    <RadioButtonInner1 switch={gender}/>
                  </RadioButtonOuter>
                </RadioButtonTag>
                <RadioButtonTag onPress={() => setGender('masculino')}>
                  <RadioButtonLabel>male</RadioButtonLabel>
                  <RadioButtonOuter>
                    <RadioButtonInner2 switch={gender}/>
                  </RadioButtonOuter>
                </RadioButtonTag>
                <RadioButtonTag onPress={() => setGender('alien')}>
                  <RadioButtonLabel>alien</RadioButtonLabel>
                  <RadioButtonOuter>
                    <RadioButtonInner3 switch={gender}/>
                  </RadioButtonOuter>
                </RadioButtonTag>
                <RadioButtonTag onPress={() => setGender('outro')}>
                  <RadioButtonLabel>other</RadioButtonLabel>
                  <RadioButtonOuter>
                    <RadioButtonInner4 switch={gender}/>
                  </RadioButtonOuter>
                </RadioButtonTag>
              </RadioButtonView>
            </GenderDiv>
            {/* <HrLine/> */}

            <IconView>
              <AllIcon name='unlock'/>
              <EyeButton onPress={handleSecureText}>
                {secureText
                  ? (<EyeIcon name='eye'/>)
                  : (<EyeIcon name='eye-off'/>)
                }
              </EyeButton>
            </IconView>
          <FormInput
            secureTextEntry = {secureText}
            autoCapitalize="none"
            placeholder="Password"
            placeholderTextColor={placeHolderColor}
            returnKeyType="send"
            value={password}
            onChangeText={setPassword}
          />
          <FormInput
            secureTextEntry = {secureText}
            autoCapitalize="none"
            placeholder="Confirm password"
            placeholderTextColor={placeHolderColor}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {signUpError && (
            <SignUpErrorText>{signUpError}</SignUpErrorText>
          )}
          <SubmitButton onPress={handleSubmit}>
            <ButtonText>Send</ButtonText>
          </SubmitButton>
          </Wrapper>
        </Form>
      </Container>
    </Background>
  );
}
