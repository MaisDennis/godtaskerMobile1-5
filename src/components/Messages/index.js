import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native'
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import firestore from '@react-native-firebase/firestore';
// -----------------------------------------------------------------------------
import {
  AlignView,
  BodyView,
  Container,
  Image,
  LastMessageView, LastMessageText, LastMessageTimeView, LastMessageTimeText,
  LeftView,
  MainView, MessageIcon,
  RightView,
  SenderText,
  TitleView,
  UnreadMessageCountText,
  WorkerImageBackgroundView,
} from './styles'

import { updateForwardMessage, updateChatInfo } from '~/store/modules/message/actions';
import api from '~/services/api';

export default function Messages({ data, navigation }) {
  const dispatch = useDispatch();
  const forwardValue = useSelector(state => state.message.forward_message.message);
  const updatedMessage = useSelector(state => state.message.profile)
  const profileUserId = useSelector(state => state.user.profile.id)


  const [resetConversation, setResetConversation] = useState();
  const [messageBell, setMessageBell] = useState();
  const [lastMessage, setLastMessage] = useState();
  const [lastMessageTime, setLastMessageTime] = useState();

  const user_id = data.user_id;
  const worker_id = data.worker_id;
  const chat_id = data.chat_id;
  const userData = data.user;
  const workerData = data.worker;
  const user_name = userData.user_name;
  const worker_name = workerData.worker_name;
  const worker_photo = workerData.avatar;

  const userIsWorker = profileUserId === worker_id;

  const messagesRef = firestore()
  .collection(`messages/chat/${chat_id}`)

  const formattedMessageDate = fdate =>
  fdate == null
    ? ''
    : format(fdate, "MMM'/'dd'/'yyyy HH:mm", { locale: enUS });

  useEffect(() => {
    getMessages()
    // console.log(user_name)
  }, [updatedMessage])

  async function getMessages() {
    const unsubscribe = messagesRef
      .orderBy('createdAt')
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map(d => ({
          ...d.data(),
        }));
        setMessageBell(data)
        let messagesLength = data.length

        const last_message = data[0]
          ? data[messagesLength-1].message
          : null
        setLastMessage(last_message)

        const last_message_time = data[0]
          ? data[messagesLength-1].timestamp
          : null
        setLastMessageTime(last_message_time)
        // lastMessageRef.current.scrollToEnd({ animated: false })
      })
      return unsubscribe;
  }

  async function handleMessageConversation() {
    const response = await api.get('/messages', {
      params: {
        user_id: profileUserId,
        worker_id: userIsWorker ? user_id : worker_id,
      },
    })
    // console.log(response.data)

    messagesRef
      .orderBy('createdAt')
      .get().then(resp => {
        // console.log(resp.docs)
        resp.forEach(doc => {
          doc.ref.update({worker_read: true})
        })
      })

    let newMessage = null
    let editedMessages = messageBell;
    if (forwardValue) {
      const message_id = Math.floor(Math.random() * 1000000)
      newMessage = {
        createdAt: firestore.FieldValue.serverTimestamp(),
        forward_message: true,
        id: message_id,
        message: forwardValue,
        receiver_id: response.data.inverted ? user_id : worker_id,
        reply_message: '',
        reply_sender: '',
        sender: `${response.data.inverted ? "worker" : "user"}`,
        timestamp: formattedMessageDate(new Date()),
        user_read: response.data.inverted ? false : true,
        visible: true,
        worker_read: response.data.inverted ? true : false,
      }

      await messagesRef
      .doc(`${message_id}`).set(newMessage)
      .catch((error) => {
        console.log("Error writing document: ", error);
      });


      dispatch(updateForwardMessage(null));
    }

    // if (userIsWorker) {
    //   editedMessages.map((m) => {
    //     if(m.worker_read === false) {
    //       m.worker_read = true;
    //     }
    //     return m
    //   })
    // } else {
    //   editedMessages.map((m) => {
    //     if(m.user_read === false) {
    //       m.user_read = true;
    //     }
    //     return m
    //   })
    // }

    // await api.put(`messages/update/${data.message_id}`, {
    //   messages: editedMessages,
    // })
    // dispatch(updateMessagesRequest(new Date()))

    if(response.data.inverted) {
      navigation.navigate('MessagesConversationPage', {
        // id: data.id,
        user_id: worker_id,
        user_name: worker_name,
        userData: workerData,
        worker_id: user_id,
        worker_name: user_name,
        workerData: userData,
        avatar: userData.avatar,
        chat_id: chat_id,
        inverted: response.data.inverted,
      });

      dispatch(updateChatInfo(workerData, userData));
      return
    }

    navigation.navigate('MessagesConversationPage', {
      // id: data.id,
      user_id: user_id,
      user_name: user_name,
      userData: userData,
      worker_id: worker_id,
      worker_name: worker_name,
      workerData: workerData,
      chat_id: chat_id,
      avatar: worker_photo,
      inverted: response.data.inverted,

    });

    dispatch(updateChatInfo(userData, workerData));
    setResetConversation();
  }

  const hasUnread = (array) => {
    try {
      let sum = 0;
      for(let i = 0; i < array.length; i++) {
        if(array[i].worker_read === false) {
          sum += 1
        }
      }
      return sum
    }
    catch(error) { return }
  }

  const hasUnreadUser = (array) => {
    try {
      let sum = 0;
      for(let i = 0; i < array.length; i++) {
        if(array[i].user_read === false) {
          sum += 1
        }
      }
      return sum
    }
    catch(error) { return }
  }
  // ---------------------------------------------------------------------------
  return (
    <>
      <TouchableOpacity onPress={handleMessageConversation}>
        <Container>
          <LeftView>
            <AlignView>
              { workerData === undefined || workerData.avatar === null
                ? (
                  <WorkerImageBackgroundView>
                    <Image/>
                    {/* <SenderText>Hello</SenderText> */}
                  </WorkerImageBackgroundView>

                )
                : (
                  <WorkerImageBackgroundView>
                    <Image source={{ uri: workerData.avatar.url }}/>
                  </WorkerImageBackgroundView>
                )
              }
            </AlignView>
          </LeftView>

          <BodyView>
            <MainView>
              <TitleView>
                { (userIsWorker)
                  ? (
                    <SenderText>
                      {userData.user_name}
                    </SenderText>
                  )
                  : (
                    <SenderText>
                      {workerData.worker_name}
                    </SenderText>
                  )
                }
              </TitleView>
              <LastMessageView
                colors={['#eee', '#eee']}
                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                // style={{ width: `${statusResult}%`}}
              >
                { lastMessage && (
                  <LastMessageText numberOfLines={1}>{lastMessage}</LastMessageText>
                )}
              </LastMessageView>
            </MainView>
            <RightView>
              <AlignView>
                <LastMessageTimeView>
                  { lastMessageTime && (
                    <LastMessageTimeText>{lastMessageTime}</LastMessageTimeText>
                  )}
                </LastMessageTimeView>
                {/* UnreadMessageCountView */}
                {(userIsWorker)
                  ? ((hasUnread(messageBell) === 0)
                    ? (
                      null
                    )
                    : (
                      <MessageIcon name="message-square">
                        <UnreadMessageCountText>{hasUnread(messageBell)}</UnreadMessageCountText>
                      </MessageIcon>
                    )
                  )
                  : ((hasUnreadUser(messageBell) === 0)
                    ? (
                      null
                    )
                    : (
                      <MessageIcon name="message-circle">
                        <UnreadMessageCountText>{hasUnreadUser(messageBell)}</UnreadMessageCountText>
                      </MessageIcon>
                    )
                  )
                }
              </AlignView>
            </RightView>
            {/* <HrLine/> */}
          </BodyView>
        </Container>
      </TouchableOpacity>
    </>
  )
}
