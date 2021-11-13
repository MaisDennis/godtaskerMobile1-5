import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native'
// -----------------------------------------------------------------------------
import {
  AlignView,
  Container,
  FormScrollView,
  Input, ItemWrapperView,
  LabelText,
  PhoneMask,
  SubmitButton, SubmitButtonText,
} from './styles'
import { updateContacts } from '~/store/modules/contact/actions';
import api from '~/services/api';

export default function EditContactPage({ navigation, route }) {
  const data = route.params
  const dispatch = useDispatch();
  const userId = useSelector( state => state.user.profile.id)

  const [firstName, setFirstName] = useState(data.first_name);
  const [lastName, setLastName] = useState(data.last_name);
  const [workerName, setWorkerName] = useState(data.worker_name);
  const [department, setDepartment] = useState(data.department);
  const id = data.id
  const phonenumber = data.phonenumber;
  const defaultFirstName = data.first_name;
  const defaultLastName = data.last_name;
  const defaultWorkerName = data.worker_name;
  const defaultDepartment = data.department;

  async function handleSubmit() {

    try {
      await api.put(`users/${userId}/contact-list`, {
        worker_id: id,
        first_name: firstName,
        last_name: lastName,
        worker_name: workerName,
        department: department,
        phonenumber: phonenumber,
      })
    } catch(error) {
      console.log(error);
    }

    dispatch(updateContacts(new Date()))
    navigation.goBack()
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
            placeholder={defaultFirstName}
            placeholderTextColor='#ccc'
          ></Input>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Sobrenome:</LabelText>
          <Input
            value={lastName}
            onChangeText={setLastName}
            placeholder={defaultLastName}
            placeholderTextColor='#ccc'
          ></Input>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Conhecido como (nome ou apelido para delegar tarefas):</LabelText>
          <Input
            value={workerName}
            onChangeText={setWorkerName}
            placeholder={defaultWorkerName}
            placeholderTextColor='#ccc'
          ></Input>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Departamento:</LabelText>
          <Input
            value={department}
            onChangeText={setDepartment}
            placeholder={defaultDepartment}
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
            returnKeyType="next"
            value={phonenumber}
            editable={false}
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
