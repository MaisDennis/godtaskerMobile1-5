/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import { format, parseISO } from 'date-fns';
import CheckBox from '@react-native-community/checkbox'; //https://github.com/react-native-checkbox/react-native-checkbox
import firestore from '@react-native-firebase/firestore';
import pt from 'date-fns/locale/pt';
// -----------------------------------------------------------------------------
import {
  AlignDetailsView, AlignCheckBoxView,
  BackButton,
  BodyView, BodyWrapper, ButtonView, BottomHeaderView,
  BellIcon, ButtonText,
  CenterView, CheckBoxView, Container,
  DescriptionView, DescriptionBorderView, DescriptionSpan,
  DatesAndButtonView, DueTimeView, DueTime, DetailsView,
  FormScrollView,
  IconsView,
  Image, ImageView, ImageWrapper, InnerStatusView,
  Label, LabelInitiated, LabelEnded, LeftView,
  ModalView,
  NameText,
  OuterStatusView,
  RightView,
  StartTimeView, StartTime,
  TagView, TitleView, TaskIcon, TitleIcon,
  TitleText, TitleTextModal, TitleBorderView, TaskAttributesView,
  ToText, ToWorkerView,
  UnreadMessageCountText, UserImage, UserImageBackground,
} from './styles';
import { updateTasks } from '~/store/modules/task/actions';
import { updateChatInfo } from '~/store/modules/message/actions';
import api from '~/services/api';
// import message from '../../store/modules/message/reducer';
// -----------------------------------------------------------------------------
const taskAttributesArray = [ 'baixa', 'média', 'alta', '-']
const formattedDate = fdate =>
  fdate == null
    ? '-'
    : format(parseISO(fdate), "dd'-'MMM'-'yyyy", { locale: pt });

const formattedDateTime = fdate =>
  fdate == null
    ? '-'
    : format(parseISO(fdate), "dd'-'MMM'-'yyyy HH:mm", { locale: pt });

export default function TaskUser({ data, navigation, taskConditionIndex }) {
  console.log(data)
  const dispatch = useDispatch();
  const updated_tasks = useSelector( state => state.task.tasks)

  const user_id = data.user.id;
  const worker_id = data.worker.id;

  const workerData = data.worker
  const userData = data.user
  const dueDate = parseISO(data.due_date);
  const endDate = parseISO(data.end_date);
  const subTasks = data.sub_task_list

  const [toggleTask, setToggleTask] = useState();
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [statusResult, setStatusResult] = useState(0);
  const [messageBell, setMessageBell] = useState();

  useEffect (() => {
    // handleStatus()
    handleMessageBell()
    setStatusResult(handleStatus())
    // console.log(data)

  //   fetch('https://extreme-ip-lookup.com/json/')
  //   .then( res => res.json())
  //   .then(response => {
  //    console.log("Country is : ", response);
  //  })
  //  .catch((data, status) => {
  //    console.log('Request failed:', data);
  //  });
  }, [ updated_tasks ])

  async function handleMessageBell() {
    // const response = await api.get(`messages/${data.message_id}`)
    // setMessageBell(response.data.messages)

    const unsubscribe = firestore()
      .collection(`messages/task/${data.id}`)
      .orderBy('createdAt')
      .onSnapshot((querySnapshot) => {
        try {
          const data = querySnapshot.docs.map(d => ({
            ...d.data(),
          }));
          // console.log(data)
          // lastMessageRef.current.scrollToEnd({ animated: false })
          setMessageBell(data)
        }
        catch {
          console.log('Error from querySnapshot')
        }

      })
    return unsubscribe;

  }

  function handleStatus() {
    let weige = 0;
    subTasks.map(s => {
      if(s.complete === true) {
        weige = weige + s.weige_percentage
      }
    })
    return Math.round(weige);
  }

  const pastDueDate = () => {
    let flag = false;
    new Date() > dueDate ? flag = true : flag = false
    return flag
  }

  const endPastDueDate = () => {
    let flag = false;
    endDate > dueDate ? flag = true : flag = false
    return flag
  }

  async function updateBell(editedSubTaskList) {
    try {
      await api.put(`tasks/${data.id}`, {
        sub_task_list: editedSubTaskList
      })
    }
    catch(error) {
      console.log('error in put tasks/:id')
    }
  }

  function handleToggleTask() {
    setToggleTask(!toggleTask)
    if(hasUnread(data.sub_task_list) !== 0) {
      const editedSubTaskList = data.sub_task_list
      editedSubTaskList.map(e => {
        e.user_read = true
      })
      updateBell(editedSubTaskList)
    }
    return
  }

  async function handleMessageConversation() {
    setToggleTask(!toggleTask)
    const response = await api.get('/messages', {
      params: {
        user_id: user_id,
        worker_id: worker_id,
      },
    })
    const messageData = response.data
    // console.log(response.data)
    if(response.data.message === null) {
      const chat_id = Math.floor(Math.random() * 1000000)
      navigation.navigate('MessagesConversationPage', {
        // id: data.id,
        user_id: user_id,
        user_name: userData.user_name,
        userData: userData,
        worker_id: worker_id,
        worker_name: workerData.worker_name,
        workerData: workerData,
        chat_id: chat_id,
        avatar: workerData.avatar,
        first_message: true,
      });
      dispatch(updateChatInfo(userData, workerData));
      return
    }

    navigation.navigate('MessagesConversationPage', {
      // id: data.id,
      user_id: userData.id,
      user_name: userData.user_name,
      userData: userData,
      worker_id: workerData.id,
      worker_name: workerData.worker_name,
      workerData: workerData,
      avatar: workerData.avatar,
      chat_id: response.data.message.chat_id,
      inverted: response.data.inverted,
    });
    dispatch(updateChatInfo(userData, workerData));
  }

  function handleEditTask() {
    setToggleTask(!toggleTask)
    navigation.navigate('TaskEdit', {
      id: data.id,
      name: data.name,
      description: data.description,
      sub_task_list: data.sub_task_list,
      task_attributes: data.task_attributes,
      start_date: data.start_date,
      due_date: data.due_date,
      worker: data.worker,
    });
  }

  function handleReviveTask() {
    // api.put(`tasks/${data.id}`);
    setToggleTask(!toggleTask)
    dispatch(updateTasks(new Date()));
  }

  function handleCancelTask() {
    // api.delete(`tasks/${data.id}`);
    setToggleTask(!toggleTask)
    dispatch(updateTasks(new Date()));
  }

  function handleScoreTask() {
    setToggleTask(!toggleTask)
  }

  const hasUnread = (array) => {
    try {
      let sum = 0;
      for(let i = 0; i < array.length; i++) {
        if(array[i].user_read === false) {
          sum += 1
        }
      }
      return sum
    } catch(error) {
      return
    }
  }
  // -----------------------------------------------------------------------------
  return (
    <Container
      taskConditionIndex={taskConditionIndex}
      onPress={handleToggleTask}
      >
      <LeftView>
        { workerData === undefined || workerData.avatar === null
          ? (
            <UserImage/>
            // <SenderText>Hi</SenderText>
          )
          : (
            <UserImageBackground>
              <UserImage source={{ uri: workerData.avatar.url }}/>
            </UserImageBackground>
          )
        }
      </LeftView>

      <BodyView>
        <BodyWrapper>
          <TitleView>
            <TitleText numberOfLines={2}>{data.name}</TitleText>
          </TitleView>
          <ToWorkerView>
            <TitleIcon name="coffee"/>
            <ToText numberOfLines={1}>{data.user.user_name}</ToText>
            <TitleIcon name="briefcase"/>
            <NameText numberOfLines={1}>{data.worker.worker_name}</NameText>
          </ToWorkerView>

          <DatesAndButtonView>
            <TagView>
              { data.initiated_at
                ? (
                  <LabelInitiated>Started</LabelInitiated>
                )
                : (
                  <Label>Sent</Label>
                )
              }
            </TagView>
            <TagView>
              { data.end_date
                ? (
                  <>
                    <LabelEnded pastDueDate={pastDueDate()}>Ended:</LabelEnded>
                    <DueTimeView pastDueDate={endPastDueDate()}>
                      <DueTime>{formattedDate(data.end_date)}</DueTime>
                    </DueTimeView>
                  </>
                )
                : (
                  <>
                    <Label>Due:</Label>
                    <DueTimeView pastDueDate={pastDueDate()}>
                      <DueTime>{formattedDate(data.due_date)}</DueTime>
                    </DueTimeView>
                  </>
                )
              }
            </TagView>
          </DatesAndButtonView>
          <BottomHeaderView>
            <OuterStatusView>
              <InnerStatusView
                statusResult={statusResult}
                colors={['#ffdd33', '#ff892e']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={{ width: `${statusResult}%`}}
              ></InnerStatusView>
            </OuterStatusView>
            <StartTime>{statusResult}%</StartTime>
          </BottomHeaderView>
        </BodyWrapper>
      </BodyView>
      <RightView>
        { (hasUnread(data.sub_task_list) === 0)
          ? (
            null
          )
          : (
            <BellIcon name="bell">
              <UnreadMessageCountText>{hasUnread(data.sub_task_list)}</UnreadMessageCountText>
            </BellIcon>
          )
        }
        { (hasUnread(messageBell) === 0)
          ? (
            null
          )
          : (
            <BellIcon name="message-square">
              <UnreadMessageCountText>{hasUnread(messageBell)}</UnreadMessageCountText>
            </BellIcon>
          )
        }
      </RightView>
{/* ------------------------------------------------------------------------ */}
      <Modal isVisible={toggleTask}>
        <ModalView>
          <FormScrollView>
            <CenterView>
              <TitleBorderView>
                <TitleIcon name="clipboard"/>
                <TitleTextModal>{data.name}</TitleTextModal>
              </TitleBorderView>
            </CenterView>
            {/* <HrLine/> */}

            <DescriptionView>
              <Label>Sub-items</Label>
              <DescriptionBorderView>
                { data.sub_task_list.map((s, index) => (
                  <AlignCheckBoxView key={index}>
                    <CheckBoxView>
                        <CheckBox
                          disabled={true}
                          value={s.complete}
                        />
                        <DescriptionSpan>{s.weige_percentage}%</DescriptionSpan>
                        <DescriptionSpan type="check-box">{s.description}</DescriptionSpan>
                    </CheckBoxView>
                  </AlignCheckBoxView>
                ))}
              </DescriptionBorderView>
            </DescriptionView>

            <AlignDetailsView>
              <DetailsView>
                <TagView>
                  <Label>Start Date:</Label>
                  { data.initiated_at
                    ? (
                      <>
                        <StartTimeView>
                          <StartTime>{formattedDate(data.initiated_at)}</StartTime>
                        </StartTimeView>
                      </>
                    )
                    : (
                      <>

                        <StartTimeView initiated={data.initiated_at}>
                          <StartTime>{formattedDate(data.start_date)}</StartTime>
                        </StartTimeView>
                      </>
                    )
                  }
                </TagView>
              </DetailsView>
              <DetailsView>
                <TagView>
                  <Label>Due Date & Time:</Label>
                  { data.end_date !== null
                    ? (
                      <DueTimeView style={{backgroundColor:'#f5f5f5'}}>
                        <DueTime>{formattedDateTime(data.due_date)}</DueTime>
                      </DueTimeView>
                    )
                    : (
                      <DueTimeView pastDueDate={pastDueDate()}>
                        <DueTime>{formattedDateTime(data.due_date)}</DueTime>
                      </DueTimeView>
                    )
                  }
                </TagView>
              </DetailsView>
              { data.end_date !== null &&
                (
                  <DetailsView>
                    <TagView>
                      <Label>Enc. com horário:</Label>
                      <DueTimeView pastDueDate={endPastDueDate()}>
                        <DueTime>{formattedDateTime(data.end_date)}</DueTime>
                      </DueTimeView>
                    </TagView>
                  </DetailsView>
                )
              }
              <DetailsView>
                <TagView>
                  <Label>Priority:</Label>
                  <TaskAttributesView taskAttributes={data.task_attributes[0]-1}>
                    <DueTime>{taskAttributesArray[JSON.stringify(data.task_attributes[0]-1)]}</DueTime>
                  </TaskAttributesView>
                </TagView>
              </DetailsView>

              <DetailsView>
                <TagView>
                  <Label>Confirmation with photograph?</Label>
                  <ToText>Sim</ToText>
                </TagView>
              </DetailsView>
            </AlignDetailsView>


            <DescriptionView>
              {/* <HrLine/> */}
              <Label>Comments</Label>
              <DescriptionBorderView pastDueDate={pastDueDate()}>
                <DescriptionSpan>{data.description}</DescriptionSpan>
              </DescriptionBorderView>
            </DescriptionView>

            <IconsView>
              <ButtonView onPress={handleMessageConversation}>
                <TaskIcon name="message-square"/>
              </ButtonView>
              { taskConditionIndex === 1
                ? (
                  <ButtonView onPress={handleEditTask}>
                    <TaskIcon name="edit"/>
                  </ButtonView>
                )
                : (
                  null
                )
              }
              { taskConditionIndex === 2
                ? (
                  <ButtonView onPress={handleScoreTask}>
                    <TaskIcon name="meh"/>
                  </ButtonView>
                )
                : (
                  null
                )
              }
              { taskConditionIndex === 3
                ? (
                  <ButtonView onPress={handleReviveTask}>
                    <TaskIcon name="activity"/>
                  </ButtonView>
                )
                : (
                  null
                )
              }
              { taskConditionIndex === 1
                ? (
                  <ButtonView onPress={handleCancelTask}>
                    <TaskIcon name="trash-2"/>
                  </ButtonView>
                )
                : (
                  null
                )
              }
              { taskConditionIndex === 3
                ? (
                  <ButtonView>
                    <TaskIcon
                      name="trash-2"
                      style={{color: '#ccc'}}
                    />
                  </ButtonView>
                )
                : (
                  null
                )
              }
            </IconsView>
            { data.signature &&
              <ImageWrapper>
                <Label>Confirmation Photo:</Label>
                <ImageView>
                  <Image source={{ uri: data.signature.url }}/>
                </ImageView>
              </ImageWrapper>
            }
            <DescriptionView>
              <BackButton onPress={handleToggleTask}>
                <ButtonText>Back</ButtonText>
              </BackButton>
            </DescriptionView>
          </FormScrollView>
        </ModalView>
      </Modal>
    </Container>
  );
}
