import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, Alert } from 'react-native'
// -----------------------------------------------------------------------------
import {
  Container,
  FormScrollView,
  Input, ItemWrapperView,
  LabelText,
  PhoneMask,
  SubmitButton, SubmitButtonText,
} from './styles'
import { updateContacts } from '~/store/modules/contact/actions';
import { updateTasks } from '~/store/modules/task/actions';
import api from '~/services/api';

export default function ContactCreatePage({ navigation }) {
  const userId = useSelector( state => state.user.profile.id)
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [workerName, setWorkerName] = useState();
  const [department, setDepartment] = useState();
  const [phonenumber, setPhonenumber] = useState();



  function handleSubmit() {
    if(!workerName) {
      Alert.alert('O contato precisa de nome ou apelido.')
      return
    } else if(!phonenumber) {
      Alert.alert('Por favor informar o telefone.')
    } else {
      try {
        const unmaskPhoneNumber = (
          maskedPhoneNumber => maskedPhoneNumber.replace(/[()\s-]/g, '')
        )
        const unmaskedPhoneNumber = unmaskPhoneNumber(phonenumber)
        const countryCode = '+55'
        const parsedUnmaskedPhoneNumber = countryCode+unmaskedPhoneNumber
        const id = Math.floor(Math.random() * 1000000)

          const response = api.post(`users/${userId}/contact-list`, {
            worker_id: id,
            first_name: firstName,
            last_name: lastName,
            worker_name: workerName,
            department: department,
            phonenumber: parsedUnmaskedPhoneNumber,
          })
          // dispatch(updateContacts(new Date()));
          // navigation.navigate('Contacts')
          console.log(response)
          Alert.alert('Contato cadastrado com sucesso.')
      }
      catch (error) {
        console.log(error)
        Alert.alert('Erro. Por favor, verificar se o contato já possui cadastro no godtasker.')
      }
    }


  }
  // ---------------------------------------------------------------------------
  return (
    <Container>
      <FormScrollView contentContainerStyle={{ alignItems: 'center'}}>
        <ItemWrapperView>
          <LabelText>Nome:</LabelText>
          <Input
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Edson"
            placeholderTextColor='#ccc'
          ></Input>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Sobrenome:</LabelText>
          <Input
            value={lastName}
            onChangeText={setLastName}
            placeholder="Arantes de Nascimento"
            placeholderTextColor='#ccc'
          ></Input>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Conhecido como (nome ou apelido para delegar tarefas):</LabelText>
          <Input
            value={workerName}
            onChangeText={setWorkerName}
            placeholder="Pelé"
            placeholderTextColor='#ccc'
          ></Input>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Departamento:</LabelText>
          <Input
            value={department}
            onChangeText={setDepartment}
            placeholder="RH"
            placeholderTextColor='#ccc'
          ></Input>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Número de Whatsapp:</LabelText>
          <PhoneMask
            type={'cel-phone'}
            options={
              {
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }
            }
            placeholder="(11) 91234-1234"
            returnKeyType="next"
            value={phonenumber}
            onChangeText={setPhonenumber}
            placeholderTextColor={'#999'}
            placeholderTextColor='#ccc'
          />
        </ItemWrapperView>
        <ItemWrapperView>
          <SubmitButton onPress={handleSubmit}>
            <SubmitButtonText>Enviar</SubmitButtonText>
          </SubmitButton>
        </ItemWrapperView>
      </FormScrollView>
    </Container>
  )
}
