import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Linking } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';
// import * as Yup from 'yup';
// -----------------------------------------------------------------------------
import {
  AllIcon,
  Container,
  EyeButton, EyeIcon,
  ForgotPasswordLink, ForgotPasswordText, Form, FormInput,
  IconView,
  MarginView02, MarginView04, MarginView08,
  SignUpText, SignUpTextView, TermsText,
  Wrapper,
} from '../SignIn/styles';
import Button from '~/components/Button'
import { signUpRequest, signUpToggleOut, signOut } from '~/store/modules/auth/actions';
// -----------------------------------------------------------------------------
export default function SignUp({navigation}) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const signedUp = useSelector(state => state.auth.signedup);

  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false)
  const [secureText, setSecureText] = useState(true);

  const placeHolderColor = '#999';

  function handleSubmit() {
    if (!userName) {
      Alert.alert(t("FillUsername"))
      return
    }
    if (!email) {
      Alert.alert(t("FillEmail"))
      return
    }
    if (!password) {
      Alert.alert(t("FillPassword"))
      return
    }
    if (!confirmPassword) {
      Alert.alert(t("FillConfirmPassword"))
      return
    }

    try {
      setLoading(true)
      const bio = t("SignUpBio", { userName: `${userName}` })
      const dispatchResponse = dispatch(signUpRequest(
        userName,
        password,
        email,
        bio,
        t,
        navigation,
      ));
      console.log(dispatchResponse)
      if (dispatchResponse) {
        // navigation.navigate('SignIn')
        setLoading(false)
      }

        // if (dispatchResponse) {
      //   auth()
      //   .createUserWithEmailAndPassword(email, password)
      //   .then((response) => {
      //     response.user.sendEmailVerification();
      //   })
      //   .catch(error => {
      //     if (error.code === 'auth/email-already-in-use') {
      //       console.log(error.message);
      //       Alert.alert(
      //         t("EmailAlreadyInUse"),
      //       )
      //     } else if (error.code === 'auth/invalid-email') {
      //       console.log(error.message);
      //       Alert.alert(
      //         t("InvalidEmail"),
      //       )
      //     } else {
      //       console.error(error);
      //       Alert.alert(
      //         t('SomeError'),
      //       )
      //     }
      //   });

      //   console.log('User account created & signed in!');
      //   Alert.alert(
      //     t("ThankYou"),
      //     t("AnEmailHasBeenSent", { email: `${email}` })
      //   )
      //   navigation.navigate('SignIn')
      // } else {
      //   Alert.alert(
      //     t('ErrorInData'),
      //   )
      // }





    // auth()
    // .createUserWithEmailAndPassword(email, password)
    // .then((response) => {
    //   response.user.sendEmailVerification();
    //   const bio = t("SignUpBio", { userName: `${userName}` })
    //   const res = dispatch(signUpRequest(
    //     userName,
    //     password,
    //     email,
    //     bio,
    //   ));

    //   if (res) {
    //     console.log('User account created & signed in!');
    //     Alert.alert(
    //       t("ThankYou"),
    //       t("AnEmailHasBeenSent", { email: `${email}` })
    //     )
    //   } else {
    //     Alert.alert(
    //       t('ErrorInData'),
    //     )
    //   }
    // })
    // .catch(error => {
    //   if (error.code === 'auth/email-already-in-use') {
    //     console.log(error.message);
    //     Alert.alert(
    //     t("EmailAlreadyInUse"),
    //   )
    //   }

    //   if (error.code === 'auth/invalid-email') {
    //     console.log(error.message);
    //     Alert.alert(
    //       t("InvalidEmail"),
    //     )
    //   } else {
    //     console.error(error);
    //     Alert.alert(
    //       ':(',
    //     )
    //   }

    // });

    }
    catch (error) {
      Alert.alert(
        t('ErrorInData'),
        `${error}`
      )
      setLoading(false)
    }
  }

  function handleTerms() {
    try {
      Linking.openURL(`https://godtasker.com/`)
    }
    catch(error) {
      console.log(error)
    }
  }

  function handlePrivacy() {
    try {
      Linking.openURL(`https://godtasker.com/`)
    }
    catch(error) {
      console.log(error)
    }
  }

  function handleEula() {
    try {
      Linking.openURL(`https://godtasker.com/`)
    }
    catch(error) {
      console.log(error)
    }
  }

  if (signedUp) {
    // navigation.navigate('SignIn');
    // dispatch(signUpToggleOut());
  }

  function handleUser() {
    // auth()
    //   .signOut()
    //   .then(() => console.log('User signed out!'));

    auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.emailVerified;
        const signed = user.signed
        console.log(signed)
        // ...
      } else {
        // User is signed out
        // ...
      }
    })
  }

  function handleSecureText() {
    setSecureText(!secureText)
  }
  // -----------------------------------------------------------------------------
  return (
    <Container>
      <Form
        // contentContainerStyle={{ alignItems: 'center' }}
        // behavior={Platform.OS === "ios" ? "padding" : "position"}
        // keyboardVerticalOffset = {Platform.OS === "ios" ? "100" : null }
      >
        <Wrapper contentContainerStyle={{ alignItems: 'center', justifyContent: 'center'}}>
          <MarginView08/>
          <MarginView08/>
          <MarginView08/>
          <MarginView08/>
          <MarginView08/>
          <MarginView08/>
          <IconView>
            <AllIcon name='user'/>
          </IconView>
          <MarginView04/>
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder={t('UserName')}
            placeholderTextColor={placeHolderColor}
            returnKeyType="next"
            value={userName}
            onChangeText={setUserName}
          />
          <MarginView04/>
          <FormInput
            keboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="e-mail"
            placeholderTextColor={placeHolderColor}
            value={email}
            onChangeText={setEmail}
          />
          <MarginView08/>
          <MarginView04/>
          <IconView>
            <AllIcon name='unlock'/>
            <EyeButton onPress={handleSecureText}>
              {secureText
                ? (<EyeIcon name='eye'/>)
                : (<EyeIcon name='eye-off'/>)
              }
            </EyeButton>
          </IconView>
          <MarginView08/>
          <FormInput
            secureTextEntry = {secureText}
            autoCapitalize="none"
            placeholder={t('Password')}
            placeholderTextColor={placeHolderColor}
            returnKeyType="send"
            value={password}
            onChangeText={setPassword}
          />
          <MarginView04/>
          <FormInput
            secureTextEntry = {secureText}
            autoCapitalize="none"
            placeholder={t('ConfirmPassword')}
            placeholderTextColor={placeHolderColor}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <MarginView08/>
          <Button
            loading={loading}
            onPress={handleSubmit}
            backgroundColor={'#18A0FB'}
            icon={'check-circle'}
            iconSize={20}
            textColor={'#fff'}
          >
            {t('Submit')}
          </Button>
          <MarginView08/>
          <SignUpText>{t('UponSignup')}</SignUpText>
          <MarginView02/>
          <SignUpTextView>

            <ForgotPasswordLink
              onPress={handleTerms}
            >
              <TermsText>
                {t('Terms')}
              </TermsText>
            </ForgotPasswordLink>
            <ForgotPasswordLink
              onPress={handlePrivacy}
            >
              <TermsText>
              {t('Privacy')}
              </TermsText>
            </ForgotPasswordLink>
            <ForgotPasswordLink
              onPress={handleEula}
            >
              <TermsText>
              EULA
              </TermsText>
            </ForgotPasswordLink>
          </SignUpTextView>
          <MarginView08/>
          <MarginView08/>
          <MarginView08/>
        </Wrapper>
      </Form>
    </Container>

  );
}
