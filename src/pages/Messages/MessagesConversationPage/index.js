import React, { useState, useRef, useEffect } from 'react'
import {
  FlatList, SafeAreaView, TouchableOpacity
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import firestore from '@react-native-firebase/firestore';
// -----------------------------------------------------------------------------
import {
  AlignView,
  BodyView,
  ForwardText, ForwardOnTopView,
  Header, HrLine,
  Image, ImageBackgroundView,
  LineView,
  MessageText, MessageContainer,
  MessageWrapper, MessageListView, MessageListItemView,
  MessageListItemText, MessageListButton, MessageTime, MessageIcon,
  MessageBottomView, MessageView, MessageViewUser,
  ReplyOnTopView, ReplyNameText, ReplyOnTopText,
  SendIcon,
  SenderView, SenderText, SenderAboutText,
} from './messageStyles'
import {
  Container,ConversationView,
  HrDivider,
  // ParsedKeyboardAvoidingView,
  ReplyContainer, ReplyView,
  SendInput, SendButton, SendButtonView,
  SpaceView,
  TemporaryMessageContainer, TemporaryMessageView, TemporaryMessageText,
  TemporaryMessageIcon, TemporaryMessageIconView,
} from './pageStyles'
import api from '~/services/api';
import { updateMessagesRequest, updateForwardMessage } from '~/store/modules/message/actions';
// import messaging from '@react-native-firebase/messaging';

export default function MessagesConversationPage({ navigation, route }) {
  // console.log(route.params)
  const userId = useSelector(state => state.user.profile.id);
  const messageWorkerId = route.params.worker_id;
  const messageWorkerData = route.params.workerData;
  const messageUserId = route.params.user_id;
  const messageUserData = route.params.userData;
  const workerName=route.params.worker_name;
  const userName=route.params.user_name;
  const chat_id = route.params.chat_id;
  const inverted = route.params.inverted;

  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  // const [defaultMessages, setDefaultMessages] = useState();

  const [firstMessage, setFirstMessage] = useState(route.params.first_message);
  const [replyValue, setReplyValue] = useState();
  const [replySender, setReplySender] = useState();
  const [value, setValue] = useState();
  const [messageDropMenu, setMessageDropMenu] = useState();
  const [toggleDropMenu, setToggleDropMenu] = useState(false);
  const [load, setLoad] = useState();
  const lastMessageRef = useRef()

  const task = route.params;
  // const worker_phonenumber = route.params.worker_phonenumber

  const chatId = route.params.chat_id;

  const messagesRef = firestore()
  .collection(`messages/chat/${chatId}`)

  const formattedMessageDate = fdate =>
  fdate == null
    ? ''
    : format(fdate, "MMM'/'dd'/'yyyy HH:mm", { locale: enUS });

  useEffect(() => {
    let mounted = true; // mounted solution: https://www.debuggr.io/react-update-unmounted-component/
    if (mounted) getMessages()
    return () => mounted = false;

  }, []);

  async function getMessages() {
    const unsubscribe = messagesRef
    .orderBy('createdAt')
    .onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map(d => ({
        ...d.data(),
      }));
      setMessages(data)
      // setDefaultMessages(data)
    })
    await lastMessageRef.current.scrollToEnd();
    return unsubscribe;
  }

  async function handleSend() {
    try {
      setLoad(true)
      let newMessage = null
      let formattedTimeStamp = formattedMessageDate(new Date())
      const message_id = Math.floor(Math.random() * 1000000)
      if (replyValue) {
        newMessage = {
          createdAt: firestore.FieldValue.serverTimestamp(),
          forward_message: false,
          id: message_id,
          message: value,
          receiver_id: inverted ? messageUserId : messageWorkerId,
          reply_message: replyValue,
          reply_sender: replySender,
          sender: `${inverted ? "worker" : "user"}`,
          sender_id: userId,
          timestamp: formattedTimeStamp,
          user_read: inverted ? false : true,
          visible: true,
          worker_read: inverted ? true : false,
        }
      } else {
        newMessage = {
          createdAt: firestore.FieldValue.serverTimestamp(),
          forward_message: false,
          id: message_id,
          message: value,
          receiver_id: inverted ? messageUserId : messageWorkerId,
          reply_message: '',
          reply_sender: '',
          sender: `${inverted ? "worker" : "user"}`,
          sender_id: userId,
          timestamp: formattedTimeStamp,
          user_read: inverted ? false : true,
          visible: true,
          worker_read: inverted ? true : false,
        }
      }

      // Firebase Messaging *****
      await messagesRef
      .doc(`${message_id}`).set(newMessage)
      .then(() => {
        // console.log(firstMessage)
        if(firstMessage === true) {
          api.post('/messages', {
            user_id: messageUserId,
            worker_id: messageWorkerId,
            chat_id: chat_id,
            messaged_at: JSON.stringify(new Date()),
          });
          dispatch(updateMessagesRequest(new Date()))
          setFirstMessage(false);
          return
        }

        api.put(`/messages/${chat_id}`, {
          messaged_at: JSON.stringify(new Date()),
        })
        dispatch(updateMessagesRequest(new Date()))

        // if (userIsWorker) {
        //   api.put(`messages/${messageId}/worker`, {
        //     messages: newMessage,
        //     task_id: task.id,
        //     task_name: task.name,
        //     user_id: messageUserId,
        //     user_name: user.user_name,
        //     worker_id: messageWorkerId,
        //   });
        // } else {
        //   api.put(`messages/${messageId}/user`, {
        //     messages: newMessage,
        //     task_id: task.id,
        //     task_name: task.name,
        //     user_id: messageUserId,
        //     user_name: user.user_name,
        //   });
        // }
      })
      .catch((error) => {
        console.log("Error writing document: ", error);
      });
      setValue();
      setReplyValue();
      setLoad(false)
    }
    catch(error) {
      console.log(error)
    }
  }

  function handleMessageDropMenu(position) {
    setMessageDropMenu(position)
    setToggleDropMenu(!toggleDropMenu)
  }

  function handleMessageReply(message, sender) {
    setReplyValue(message)
    setReplySender(sender)
    setToggleDropMenu(false)
  }

  function handleMessageForward(message) {
    setToggleDropMenu(false)
    dispatch(updateForwardMessage(message))
    navigation.goBack()
  }

  // update with firebase!!!
  async function handleMessageDelete(position) {
    const editedTaskMessages = task.messages;
    editedTaskMessages[position].removed_message = editedTaskMessages[position].message;
    editedTaskMessages[position].message = 'mensagem removida'
    await api.put(`tasks/${task.id}`, {
      messages:  editedTaskMessages
    });
    setToggleDropMenu(false)
  }
  // ---------------------------------------------------------------------------
  const renderItem = ({ item, index }) => (
    <AlignView key={item.id}>
      <LineView>
        <MessageContainer sender={item.sender} inverted={inverted}>
          <MessageWrapper>
            { !inverted
              ? (
                <>
                  { item.sender === 'user'
                    ? (<MessageTime>{item.timestamp}</MessageTime>)
                    : null
                  }
                </>
              )
              : (
                <>
                  { item.sender === 'worker'
                    ? (<MessageTime>{item.timestamp}</MessageTime>)
                    : null
                  }
                </>
              )
            }
            { !inverted
              ? (
                <>
                  { item.sender === 'user'
                    ? (
                      <MessageViewUser
                        sender={item.sender}
                        // colors={['#2EFFFF', '#FC56FF']}
                        colors={['#D0ECE3', '#E0EFEA']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                      >
                        { item.reply_message && !item.removed_message
                          ? (
                            <ReplyOnTopView>
                              { item.reply_sender === 'worker'
                                ? (
                                  <ReplyNameText>{task.worker_name}</ReplyNameText>
                                )
                                : (
                                  <ReplyNameText>{task.user_name}</ReplyNameText>
                                )
                              }
                              <ReplyOnTopText>{item.reply_message}</ReplyOnTopText>
                            </ReplyOnTopView>
                          )
                          : null
                        }
                        { item.forward_message && !item.removed_message
                          ? (
                            <ForwardOnTopView>
                              <MessageIcon name='corner-down-right'/>
                              <ForwardText>Forwarded Message</ForwardText>
                            </ForwardOnTopView>
                          )
                          : (
                            null
                          )
                        }

                        <MessageBottomView>
                          <MessageText removedMessage={item.removed_message}>{item.message}</MessageText>
                          <TouchableOpacity
                            onPress={() => handleMessageDropMenu(index)}
                          >
                            <MessageIcon name='chevron-down'/>
                          </TouchableOpacity>
                        </MessageBottomView>
                      </MessageViewUser>
                    )
                    : (
                      <MessageView
                        sender={item.sender}
                        colors={['#ddd', '#f5f5f5']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                      >
                        { item.reply_message && !item.removed_message
                          ? (
                            <ReplyOnTopView>
                              { item.reply_sender === 'worker'
                                ? (
                                  <ReplyNameText>{task.worker_name}</ReplyNameText>
                                )
                                : (
                                  <ReplyNameText>{task.user_name}</ReplyNameText>
                                )
                              }
                              <ReplyOnTopText>{item.reply_message}</ReplyOnTopText>
                            </ReplyOnTopView>
                          )
                          : null
                        }
                        { item.forward_message && !item.removed_message
                          ? (
                            <ForwardOnTopView>
                              <MessageIcon name='corner-down-right'/>
                              <ForwardText>Mens. encaminhada</ForwardText>
                            </ForwardOnTopView>
                          )
                          : (
                            null
                          )
                        }
                        <MessageBottomView>
                          <MessageText removedMessage={item.removed_message}>{item.message}</MessageText>
                          <TouchableOpacity
                            onPress={() => handleMessageDropMenu(index)}
                          >
                            <MessageIcon name='chevron-down'/>
                          </TouchableOpacity>
                        </MessageBottomView>
                      </MessageView>
                    )
                  }
                </>
              )
              : (
                <>
                  { item.sender === 'worker'
                    ? (
                      <MessageViewUser
                        sender={item.sender}
                        colors={['#8EE3EF', '#FFFCF7']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                      >
                        { item.reply_message && !item.removed_message
                          ? (
                            <ReplyOnTopView>
                              { item.reply_sender === 'worker'
                                ? (
                                  <ReplyNameText>{task.worker_name}</ReplyNameText>
                                )
                                : (
                                  <ReplyNameText>{task.user_name}</ReplyNameText>
                                )
                              }
                              <ReplyOnTopText>{item.reply_message}</ReplyOnTopText>
                            </ReplyOnTopView>
                          )
                          : null
                        }
                        { item.forward_message && !item.removed_message
                          ? (
                            <ForwardOnTopView>
                              <MessageIcon name='corner-down-right'/>
                              <ForwardText>Mens. encaminhada</ForwardText>
                            </ForwardOnTopView>
                          )
                          : (
                            null
                          )
                        }

                        <MessageBottomView>
                          <MessageText removedMessage={item.removed_message}>{item.message}</MessageText>
                          <TouchableOpacity
                            onPress={() => handleMessageDropMenu(index)}
                          >
                            <MessageIcon name='chevron-down'/>
                          </TouchableOpacity>
                        </MessageBottomView>
                      </MessageViewUser>
                    )
                    : (
                      <MessageView
                        sender={item.sender}
                        colors={['#ddd', '#f5f5f5']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                      >
                        { item.reply_message && !item.removed_message
                          ? (
                            <ReplyOnTopView>
                              { item.reply_sender === 'worker'
                                ? (
                                  <ReplyNameText>{task.worker_name}</ReplyNameText>
                                )
                                : (
                                  <ReplyNameText>{task.user_name}</ReplyNameText>
                                )
                              }
                              <ReplyOnTopText>{item.reply_message}</ReplyOnTopText>
                            </ReplyOnTopView>
                          )
                          : null
                        }
                        { item.forward_message && !item.removed_message
                          ? (
                            <ForwardOnTopView>
                              <MessageIcon name='corner-down-right'/>
                              <ForwardText>Mens. encaminhada</ForwardText>
                            </ForwardOnTopView>
                          )
                          : (
                            null
                          )
                        }
                        <MessageBottomView>
                          <MessageText removedMessage={item.removed_message}>{item.message}</MessageText>
                          <TouchableOpacity
                            onPress={() => handleMessageDropMenu(index)}
                          >
                            <MessageIcon name='chevron-down'/>
                          </TouchableOpacity>
                        </MessageBottomView>
                      </MessageView>
                    )
                  }
                </>

              )
            }
            { !inverted
              ? (
                <>
                  { item.sender === 'worker'
                    ? (<MessageTime>{item.timestamp}</MessageTime>)
                    : null
                  }
                </>
              )
              : (
                <>
                  { item.sender === 'user'
                    ? (<MessageTime>{item.timestamp}</MessageTime>)
                    : null
                  }
                </>
              )
            }
          </MessageWrapper>


          { (messageDropMenu === index) && (toggleDropMenu === true) && (
            <MessageListView>
              <MessageListButton
                onPress={() => handleMessageReply(item.message, item.sender)}
              >
                <MessageListItemView>
                  <MessageListItemText>Reply</MessageListItemText>
                </MessageListItemView>
              </MessageListButton>
              <MessageListButton
                onPress={() => handleMessageForward(item.message)}
              >
                <MessageListItemView>
                  <MessageListItemText>Forward</MessageListItemText>
                </MessageListItemView>
              </MessageListButton>
              <MessageListButton
                onPress={() => handleMessageDelete(index)}
              >
                <MessageListItemView>
                  <MessageListItemText>Delete</MessageListItemText>
                </MessageListItemView>
              </MessageListButton>
            </MessageListView>
          )}
        </MessageContainer>
      </LineView>
      {/* <HrLine/> */}
    </AlignView>
  );
  // ---------------------------------------------------------------------------
  return (
    <SafeAreaView>
      <Container>
        <HrDivider/>
        <ConversationView
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset = {Platform.OS === "ios" ? "100" : null}
        >
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}
            ref={lastMessageRef}
            // initialScrollIndex={2}
            // getItemLayout={(data, index) => (
            //   {length: 50, offset: 50 * index, index, animation: false}
            // )}
          />
          <ReplyContainer>
            { replyValue && (
              <TemporaryMessageContainer>
                <TemporaryMessageView>
                  <TemporaryMessageText>{replyValue}</TemporaryMessageText>
                </TemporaryMessageView>

                <TemporaryMessageIconView>
                  <TouchableOpacity onPress={() => setReplyValue()}>
                    <TemporaryMessageIcon name='x-circle'/>
                  </TouchableOpacity>
                </TemporaryMessageIconView>
              </TemporaryMessageContainer>
            )}
            <HrDivider/>
            <ReplyView>
              <SendInput
                autoCorrect={false}
                autoCapitalize="none"
                enablesReturnKeyAutomatically
                keyboardType="default"
                multiline
                onChangeText={setValue}
                placeholder="Write your message"
                returnKeyType="send"
                value={value}
              />
              {/* keep "if else" below */}
              { value
                ? (
                  <SendButtonView onPress={handleSend} disabled={load}>
                    <SendButton>
                        <SendIcon name="send"/>
                    </SendButton>
                  </SendButtonView>
                )
                : (
                  <SpaceView/>
                )
              }
            </ReplyView>
          </ReplyContainer>
        </ConversationView>
      </Container>
    </SafeAreaView>
  )
}
