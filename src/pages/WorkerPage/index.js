import React, { useState, useEffect } from 'react';
import { Linking, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { v4 as uuidv4 } from 'uuid';
// -----------------------------------------------------------------------------
import {
  BioText, BlockLarge,
  Container, ContentView,
  FirstNameWrapper, FollowButton, FollowText,
  FollowingButton, FollowingText,
  FollowersView, FormScrollView, FollowersWrapper,
  HeaderTabView,
  Iicon,
  Label, LabelBold, LabelBold2,
  LabelNormal,
  MessageButton, MessageIcon,
  SocialMediaText, SocialMediaView, SocialMediaWrapper, StatusView,
  UserNameText, UserInfoView,
  UserProfileView, UserImage, UserImageBackgroundView, UserView,
} from './styles'
import api from '~/services/api';
import insert from '~/assets/insert_photo-24px.svg';

export default function WorkerPage({ navigation, route }) {
  const user_id = useSelector(state => state.user.profile.id);
  const user_name = useSelector(state => state.user.profile.user_name);
  const userData = useSelector(state => state.user.profile);

  const data = route.params;
  const worker_id = data.id;
  const worker_name = data.worker_name;
  const first_name = data.first_name;
  const last_name = data.last_name;
  const worker_photo = data.avatar;
  const instagram_username = data.instagram ? data.instagram : '-'
  const linkedin_username = data.linkedin ? data.linkedin : '-'
  const bio = data.bio ? data.bio : 'There is no bio'

  const [countFollowers, setCountFollowers] = useState();
  const [countFollowing, setCountFollowing] = useState();
  const [followIndividual, setFollowIndividual] = useState();

  useEffect(() => {
    loadData()
    // console.log(data)
  }, [])
  const formattedDate = fdate =>
  fdate == null
    ? '-'
    : format(fdate, "dd 'de' MMMM',' yyyy", { locale: pt });
  // const todayDate = formattedDate(new Date())

  async function loadData() {
    const followingResponse = await api.get(`/users/${user_id}/following/count`)
    const followedResponse = await api.get(
      `/workers/${worker_id}/followed/count`
    )

    const followIndividualResponse = await api.get(
      `/users/following/individual`, {
        params: { user_id: user_id, worker_id: worker_id }
      }
    )

    setCountFollowing(followingResponse.data)
    setCountFollowers(followedResponse.data)
    setFollowIndividual(followIndividualResponse.data[0])
  }

  async function handleStartFollow() {
    await api.post(
      `/users/${user_id}/following`, {
        worker_id: worker_id,
      }
    )

    const followIndividualResponse = await api.get(
      `/users/following/individual`, {
        params: { user_id: user_id, worker_id: worker_id }
      }
    )

    const followedResponse = await api.get(
      `/workers/${worker_id}/followed/count`
    )

    setCountFollowers(followedResponse.data)
    setFollowIndividual(followIndividualResponse.data[0])
  }

  async function handleStopFollow() {
    await api.put(
      `/users/${user_id}/following`, {
        worker_id: worker_id,
      }
    )

    const followIndividualResponse = await api.get(
      `/users/following/individual`, {
        params: { user_id: user_id, worker_id: worker_id }
      }
    )

    const followedResponse = await api.get(
      `/workers/${worker_id}/followed/count`
    )

    setCountFollowers(followedResponse.data)
    setFollowIndividual(followIndividualResponse.data[0])
  }

  function handleFollow() {
    navigation.navigate('Follow')
  }

  async function handleMessageConversation() {
    const response = await api.get('/messages', {
      params: {
        user_id: user_id,
        worker_id: worker_id,
      },
    })
    // const messageData = response.data
    // console.log(response.data.message)
    if(response.data.message === null) {
      const chat_id = Math.floor(Math.random() * 1000000)

      navigation.navigate('MessagesConversationPage', {
        // id: data.id,
        user_id: user_id,
        user_name: user_name,
        userData: userData,
        worker_id: worker_id,
        worker_name: worker_name,
        workerData: data,
        chat_id: chat_id,
        avatar: worker_photo,
        first_message: true,
      });
      return
    }
    // console.log(response.data)
    // if(response.data.inverted) {
    //   navigation.navigate('MessagesConversationPage', {
    //     // id: data.id,
    //     user_id: worker_id,
    //     user_name: worker_name,
    //     userData: data,
    //     worker_id: user_id,
    //     worker_name: user_name,
    //     workerData: userData,
    //     avatar: userData.avatar,
    //     chat_id: response.data.message.chat_id,
    //     inverted: response.data.inverted,
    //   });
    //   return
    // }
    navigation.navigate('MessagesConversationPage', {
      // id: data.id,
      user_id: user_id,
      user_name: user_name,
      userData: userData,
      worker_id: worker_id,
      worker_name: worker_name,
      workerData: data,
      avatar: worker_photo,
      chat_id: response.data.message.chat_id,
      inverted: response.data.inverted,
    });
  }

  function handleLinkToInstagram() {
    try {
      Linking.openURL(`instagram://user?username=${instagram_username}`)
    }
    catch(error) {
      console.log(error)
    }
  }

  function handleLinkToLinkedIn() {
    try {
      Linking.openURL(`https://linkedin.com/in${linkedin_username}`)
    }
    catch(error) {
      console.log(error)
    }
  }

  // ---------------------------------------------------------------------------
  return (
    <Container>
      <FormScrollView>

        <HeaderTabView>
          <MessageButton onPress={handleMessageConversation}>
            <MessageIcon name='message-square'></MessageIcon>
          </MessageButton>
          { followIndividual !== undefined
            ? (
              <FollowingButton onPress={handleStopFollow}>
                <FollowingText>Following</FollowingText>
              </FollowingButton>
            )
            : (
              <FollowButton onPress={handleStartFollow}>
                <FollowText>Follow</FollowText>
              </FollowButton>
            )
          }
        </HeaderTabView>

        <UserView>
          {/* <UserProfileView> */}
            { worker_photo === undefined || worker_photo.url === null
              ? (
                <>
                  <UserImageBackgroundView>
                    <UserImage
                      source={require('~/assets/insert_photo-24px.svg')}
                    />
                  </UserImageBackgroundView>
                  {/* <UserText>n/a</UserText> */}
                </>
              )
              : (
                <UserImageBackgroundView>
                  <UserImage
                    source={
                      worker_photo
                        ? { uri: worker_photo }
                        : insert
                    }
                  />
                </UserImageBackgroundView>
              )
            }
            <UserInfoView>
            <UserNameText>{worker_name}</UserNameText>
            <FirstNameWrapper>
              <LabelBold2>{first_name}</LabelBold2>
              <LabelBold2>{last_name}</LabelBold2>
            </FirstNameWrapper>
              <FollowersWrapper>
                <FollowersView onPress={handleFollow}>
                  <LabelBold>{countFollowers}</LabelBold>
                  <LabelNormal>Followers</LabelNormal>
                </FollowersView>
                <FollowersView onPress={handleFollow}>
                  <LabelBold>{countFollowing}</LabelBold>
                  <LabelNormal>Following</LabelNormal>
                </FollowersView>
              </FollowersWrapper>
            </UserInfoView>

          {/* </UserProfileView> */}
        </UserView>

        <ContentView>
          <SocialMediaWrapper>
            <SocialMediaView onPress={handleLinkToInstagram}>
              <Iicon name='instagram' size={20}/>
              <SocialMediaText>{instagram_username}</SocialMediaText>
            </SocialMediaView>
            <SocialMediaView onPress={handleLinkToLinkedIn}>
              <Iicon name='linkedin' size={20}/>
              <SocialMediaText>{linkedin_username}</SocialMediaText>
            </SocialMediaView>
          </SocialMediaWrapper>
        </ContentView>

        <ContentView>
          <StatusView>
            <Label>Bio:</Label>
          </StatusView>

          <StatusView>
            <BlockLarge>
              <BioText>
                {bio}
              </BioText>
            </BlockLarge>
          </StatusView>
        </ContentView>
      </FormScrollView>
    </Container>
  )
}
