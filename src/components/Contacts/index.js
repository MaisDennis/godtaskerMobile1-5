import React from 'react';
// -----------------------------------------------------------------------------
import {
  Body,
  Container,
  Image, ImageBackgroundView,
  TextBio, TextFirstName, TextFollowedBy,
  TextLastName, TextNameView, TextWorkerName, TextView,
  UserInfoView,
} from './styles'
import { updateContacts } from '~/store/modules/contact/actions';
import api from '~/services/api';


export default function Contacts({ navigation, data }) {
  function handleWorkerPage() {
    navigation.navigate('WorkerPage', {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      worker_name: data.worker_name,
      department: data.department,
      // phonenumber: data.phonenumber,
      instagram: data.instagram,
      linkedin: data.linkedin,
      bio: data.bio,
      avatar: data.avatar ? data.avatar.url : ''
    })
  }

  // ---------------------------------------------------------------------------
  return (
    <Container onPress={handleWorkerPage}>
      <Body>
        <UserInfoView>
          { data === undefined || data.avatar === null
            ? (
              <ImageBackgroundView>
                <Image/>
              </ImageBackgroundView>
            )
            : (
              <ImageBackgroundView>
                <Image source={{ uri: data.avatar.url }}/>
              </ImageBackgroundView>
            )
          }
          <TextView>
            <TextWorkerName>{data.worker_name}</TextWorkerName>
            <TextNameView>
              <TextFirstName>{data.first_name}</TextFirstName>
              <TextLastName>{data.last_name}</TextLastName>
            </TextNameView>
            <TextBio
              numberOfLines={1}
            >
              {data.bio}
              {/* Accountant, Tax Specialist, humanitarian movement coordinator */}
            </TextBio>
            {/* <TextFollowedBy>Followed by nina_ + 5 more</TextFollowedBy> */}
          </TextView>

        </UserInfoView>
      </Body>
    </Container>
  )
}
