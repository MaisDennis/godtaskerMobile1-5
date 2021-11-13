import React, { useState } from 'react';
import { Alert, TouchableOpacity, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
// import * as Yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
// -----------------------------------------------------------------------------
import Background from '~/components/Background';
import {
  AllIcon,
  ButtonText,
  Container,
  Form, FormInput,
  GenderDiv,
  ImageWrapper,
  LabelText,
  // Options,
  PhoneMask,
  RadioButtonView, RadioButtonTag,
  RadioButtonLabel, RadioButtonOuter,
  RadioButtonInner1, RadioButtonInner2, RadioButtonInner3,
  RadioButtonInner4,
  SignUpErrorText,
  SubmitButton,
  UserImage, UserImageBackgroundView,
} from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';
import api from '~/services/api';
// import { UserImageBackgroundView } from '../../components/Messages/styles';
// -----------------------------------------------------------------------------
export default function UpdateProfile({ navigation, route }) {
  const user = useSelector(state => state.user.profile);
  const userData = useSelector(state => state.user.profile)
  // const previewImage = useSelector(state => state.image.image);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [userName, setUserName] = useState(user.user_name);
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const phonenumber = user.phonenumber;
  const [email, setEmail] = useState(user.email);
  const [birthDate, setBirthDate] = useState(user.birth_date);
  const [gender, setGender] = useState(user.gender);
  const [signUpError, setSignUpError] = useState();
  const [imagePath, setImagePath] = useState();
  const [previewImage, setPreviewImage] = useState();

  // const genderOptions = [ 'feminino', 'masculino', 'alien', 'outro', '']

  async function handleUpdatePhoto() {
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(async image => {
      // console.log(image.path)
      setImagePath(image.path)
      const formData = new FormData();
      formData.append('profileImage', {
        uri: Platform.OS === 'ios' ? image.sourceURL : image.path,
        type: "image/jpg",
        name: `profile_${user.id}.jpg`,
      });

      try {
        const response = await api.post('files', formData);
        const { image } = response.data;
        setPreviewImage(image)
      }
      catch(err) {
        Alert.alert(
          'Erro ao carregar a foto.',
          [
            {
              text: 'OK',
              onPress: () => console.log('OKBJ')
            }
          ],
          {cancelable: false }
        )
      }
    })
  }

  function handleSubmit() {
    try {
      dispatch(updateProfileRequest({
        first_name: firstName,
        last_name: lastName,
        user_name: userName,
        oldPassword,
        password,
        confirmPassword,
        phonenumber,
        email: email,
        birth_date: birthDate,
        gender,
        image: previewImage,
        // preview,
      }));
      // navigation.goBack();
      console.log('dispatch profile OK')
    }
    catch {
      setSignUpError('erro nos dados');
    }

  }
  // -----------------------------------------------------------------------------
  return (
    // <Background>
      <Container>
        <Form contentContainerStyle={{ alignItems: 'center' }}>
        <AllIcon name='user'/>
          <ImageWrapper>
            { imagePath
              ? (
                <UserImageBackgroundView onPress={() => handleUpdatePhoto()}>
                  <UserImage
                    source={{uri: imagePath}}
                  />
                </UserImageBackgroundView>
              )
              : (
                <>
                  { userData === undefined || userData.avatar === null
                    ? (
                      <UserImageBackgroundView onPress={() => handleUpdatePhoto()}>
                        <UserImage
                          source={require('~/assets/insert_photo-24px.svg')}
                        />
                        {/* <Text>n/a</Text> */}
                      </UserImageBackgroundView>
                    )
                    : (
                      <UserImageBackgroundView onPress={() => handleUpdatePhoto()}>
                        <UserImage
                          source={
                            userData.avatar
                              ? { uri: userData.avatar.url }
                              : null
                          }
                        />
                      </UserImageBackgroundView>
                    )
                  }
                </>
              )
            }
          </ImageWrapper>
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome"
            placeholderTextColor="#999"
            returnKeyType="next"
            value={firstName}
            onChangeText={setFirstName}
          />
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Sobrenome"
            placeholderTextColor="#999"
            // onSubmitEditing={() => userNameRef.current.focus()}
            value={lastName}
            onChangeText={setLastName}
            // ref={lastNameRef}
          />
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome de usuário"
            placeholderTextColor="#999"
            // onSubmitEditing={() => passwordRef.current.focus()}
            value={userName}
            onChangeText={setUserName}
            // ref={userNameRef}
          />
          {/* <HrLine/> */}
          <AllIcon name='info'/>

          <PhoneMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            placeholder="Data de nascimento (DD/MM/YYYY)"
            placeholderTextColor="#999"
            returnKeyType="next"
            value={birthDate}
            onChangeText={setBirthDate}
            // ref={birthDateRef}
          />

          {/* <Options
            selectedValue={gender}
            onValueChange={setGender}
            placeholder="Gênero"
          >
            { genderOptions.map(g => (
              <Options.Item key={g} label={g} value={g}/>
            ))}
          </Options> */}
          <FormInput
            keboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="e-mail"
            placeholderTextColor="#999"
            // onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
            // ref={emailRef}
          />
          <GenderDiv>
            <LabelText>Gênero</LabelText>
            <RadioButtonView>
              <RadioButtonTag onPress={() => setGender('feminino')}>
                <RadioButtonLabel>fem.</RadioButtonLabel>
                <RadioButtonOuter>
                  <RadioButtonInner1 switch={gender}/>
                </RadioButtonOuter>
              </RadioButtonTag>
              <RadioButtonTag onPress={() => setGender('masculino')}>
                <RadioButtonLabel>masc.</RadioButtonLabel>
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
                <RadioButtonLabel>outro</RadioButtonLabel>
                <RadioButtonOuter>
                  <RadioButtonInner4 switch={gender}/>
                </RadioButtonOuter>
              </RadioButtonTag>
            </RadioButtonView>
          </GenderDiv>
          {/* <HrLine/> */}
          <AllIcon name='unlock'/>
          <FormInput
            secureTextEntry
            placeholder="Sua antiga senha"
            placeholderTextColor="#999"
            returnKeyType="send"
            // onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
            // ref={passwordRef}
          />
          <FormInput
            secureTextEntry
            placeholder="Sua nova senha"
            placeholderTextColor="#999"
            returnKeyType="send"
            // onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={password}
            onChangeText={setPassword}
            // ref={passwordRef}
          />
          <FormInput
            secureTextEntry
            placeholder="Confirmar a nova senha"
            placeholderTextColor="#999"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            // ref={confirmPasswordRef}
          />
          {signUpError && (
            <SignUpErrorText>{signUpError}</SignUpErrorText>
          )}
          <SubmitButton onPress={handleSubmit}>
            <ButtonText>Enviar</ButtonText>
          </SubmitButton>

        </Form>

      </Container>
    // </Background>
  );
}
