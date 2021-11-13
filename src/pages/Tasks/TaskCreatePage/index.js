import React, { useState, useEffect } from 'react'
// import { DatePickerModal } from 'react-native-paper-dates';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, TouchableOpacity } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal';
import { parseISO, isBefore , isSameHour, subHours, addMinutes, format } from 'date-fns';
// -----------------------------------------------------------------------------
import {
  AlignCheckBoxView,
  ButtonView, ButtonView2, ButtonText,
  CheckBoxWrapper, CheckBoxView, Container,
  DateOptionsView, DateOptions, DescriptionSpan,
  FormScrollView,
  HrLine,
  IosKeyboardAvoidingView, ItemWrapperView, Input,
  LabelText,
  ModalView,
  RadioButtonView, RadioButtonTag, RadioButtonTagConfirmPhoto,
  RadioButtonLabel, RadioButtonOuter, RadioButtonInner0,
  RadioButtonInner1, RadioButtonInner2, RadioButtonInner3,
  RadioButtonInner4, RadioButtonLabelText,
  SubTaskButton, SubTaskButtonView, SubTaskCancelIcon,
  SubTaskEditIcon, SubTaskInput, SubTaskLabelText,
  SubTaskLeftView, SubTaskRightView,
  SubTaskTag, SubTaskText,
  SubTaskWeigeText, SubTaskWrapper, SubTaskView,
  SubmitButton, SubmitButtonText,
  WeigeView, WeigeTagView, WeigeText,
} from './styles'
import NumberInput from '~/components/NumberInput'
import { updateTasks } from '~/store/modules/task/actions';
import api from '~/services/api';

export default function TaskCreatePage({ navigation }) {
  const dispatch = useDispatch();
  const userId = useSelector( state => state.user.profile.id)

  const [name, setName] = useState("");
  const [description, setDescription] = useState();
  const [prior, setPrior] = useState(4);
  const [confirmPhoto, setConfirmPhoto] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [contacts, setContacts] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleDates, setToggleDates] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [subTaskList, setSubTaskList] = useState([]);
  const [editSubTaskIndex, setEditSubTaskIndex] = useState();
  const [addSubTaskInputValue, setAddSubTaskInputValue] = useState();
  const [addWeigeInputValue, setAddWeigeInputValue] = useState(1);
  const [editSubTaskInputValue, setEditSubTaskInputValue] = useState();
  const [editWeigeInputValue, setEditWeigeInputValue] = useState(1);
  const [subTaskToggleEdit, setSubTaskToggleEdit] = useState(false);
  const [date, setDate] = useState();
  const [open, setOpen] = useState(false);
  const [sameHourCheck, setSameHourCheck] = useState(false)
    const [urgent, setUrgent] = useState(4);
  const [complex, setComplex] = useState(4);

  // functions for Date Picker
  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  useEffect(() => {
    loadContacts(userId);
  }, [ userId ])

  async function loadContacts(userID) {
    const response = await api.get(`/users/${userID}/following`)

    const checkedList = response.data
    checkedList.forEach(c => {
      c.checked = false;
    });
    setContacts(checkedList)
  }

  let editedWorkers = [];
  async function handletoggleCheckBox(value, position) {
    setToggleCheckBox(!toggleCheckBox) // this distoggles the checkbox
    editedWorkers = contacts;
    const editedWorker = editedWorkers.find(
      (e, index) => index === position
    );
    editedWorker.checked = value;
    editedWorkers[position] = editedWorker;
    setContacts(editedWorkers);
    return
  }

  function handleToggleModal() {
    setToggleModal(!toggleModal)
  }

  function handleToggleDates() {
    setToggleDates(!toggleDates)
  }

  function handleAddSubTask() {
    if (addSubTaskInputValue === undefined) return;

    let editedSubTaskList = subTaskList
    const sub_task_id = Math.floor(Math.random() * 1000000)
    editedSubTaskList.push({
      id: sub_task_id,
      description: addSubTaskInputValue,
      weige: editWeigeInputValue,
      complete: false,
      user_read: true,
      worker_read: false,
    })
    setSubTaskList(editedSubTaskList)
    setAddSubTaskInputValue();
    navigation.navigate('TaskCreate');
    // dispatch(updateTasks(new Date()))
  }

  function handleOpenEditSubTask(position) {
    setEditSubTaskIndex(position)
    setSubTaskToggleEdit(!subTaskToggleEdit)
    setEditSubTaskInputValue(subTaskList[position].description)
    setEditWeigeInputValue(subTaskList[position].weige)
  }

  function handleEditSubTask(position) {
    let editedSubTaskList = subTaskList.map((s, index) => {
      if (index === position) {
        s.description = editSubTaskInputValue;
        s.weige = editWeigeInputValue;
      }
      return s;
    })
    setSubTaskList(editedSubTaskList)
    setEditSubTaskIndex(null);
    setSubTaskToggleEdit(false);
  }

  function handleDeleteSubTask(position) {
    let editedSubTaskList = subTaskList
    editedSubTaskList.splice(position, 1)
    setSubTaskList(editedSubTaskList)
    navigation.navigate('TaskCreate',{
      sub_task_list: subTaskList,
    });
  }

  function weigeToPercentage(subTasks) {
    let weigeSum = 0;
    for(let i = 0; i < subTasks.length; i++) {
      weigeSum += parseFloat(subTasks[i].weige)
    }

    for(let i = 0; i < subTasks.length; i++) {
      subTasks[i].weige_percentage = (
        Math.round((parseFloat(subTasks[i].weige) / weigeSum)*1000)/10
      )
    }
    return weigeSum;
  }

  async function createTasks(c) {
    weigeToPercentage(subTaskList)

    await api.post('/tasks', [
      {
        name: name,
        description: description,
        sub_task_list: subTaskList,
        task_attributes: [prior, urgent, complex],
        status: {
          status: 1,
          comment: new Date(),
        },
        confirm_photo: confirmPhoto,
        start_date: startDate,
        due_date: dueDate,
        messaged_at: new Date(),
        workerphonenumber: c.phonenumber,
      }, userId
    ]);
    dispatch(updateTasks(new Date()))
    // dispatch(updateMessagesRequest(new Date()))
    // setToggleModal(!toggleModal)
  }

  function handleSubmit() {
    let countChecked = 0;
    contacts.map(c => {
      if(c.checked == true) {
        countChecked += 1
      }
    })
    if (countChecked === 0) {
      Alert.alert(
        'Please choose a person',
        'Use the "Following List" button and select who(m) the task will be sent to',
        [{ style: "default" }],
        { cancelable: true },
      );
      return
    }
    if (name === '') {
      Alert.alert(
        'Please insert a Title',
        '',
        [{ style: "default" }],
        { cancelable: true },
      )
      return
    }
    if (isBefore(startDate, subHours(new Date(), 1))) {
      Alert.alert(
        'Start Date is in the past',
        'Start Date cannot be set before 1 hour prior to now',
        [{ style: "default" }],
        { cancelable: true },
      )
      return
    }
    if (isBefore(dueDate, startDate)) {
      Alert.alert(
        'Due Date is before Start Date',
        'The Due Date & Time must be set after the Start Date & Time',
        [{ style: "default" }],
        { cancelable: true },
      )
      return
    }
    if (!sameHourCheck && isSameHour(dueDate, new Date())) {
      Alert.alert(
        'Due Date is set within the next hour',
        'Are you sure this is OK?',
        [{ style: "default" }],
        { cancelable: true },
      )
      setSameHourCheck(true)
      return
    }

    try {
      contacts.map(c => {
        if(c.checked == true) {
          createTasks(c)
          return c;
        }
      })
      Alert.alert(
        'Success!',
        'Task Registered',
        [{ style: "default" }],
        { cancelable: true },
      )
    } catch(error) {
      setSubmitError(true)
      Alert.alert(
        'Error: Task not registered',
        'Please try again',
        [{ style: "default" }],
        { cancelable: true },
      )
    }
    navigation.goBack()
  }
  // ---------------------------------------------------------------------------
  return (
    <Container>
      <IosKeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset = {Platform.OS === "ios" ? "70" : null}
      >
        <FormScrollView contentContainerStyle={{ alignItems: 'center'}}>
          <ItemWrapperView>
            <LabelText>Send to:</LabelText>
            <ButtonView onPress={handleToggleModal}>
              <ButtonText>Following List</ButtonText>
            </ButtonView>
            {/* <HrDivider/> */}
          </ItemWrapperView>

          <ItemWrapperView>
            <LabelText>Title:</LabelText>
            <Input
              enablesReturnKeyAutomatically
              multiline
              value={name}
              onChangeText={setName}
              placeholder="Wash the car"
            />
          </ItemWrapperView>

          <ItemWrapperView>
            <LabelText>Sub-item:</LabelText>
            <SubTaskView>
                <SubTaskInput
                  enablesReturnKeyAutomatically
                  multiline
                  numberOfLines={4}
                  onChangeText={setAddSubTaskInputValue}
                  placeholder="1. Use soap..."
                  textBreakStrategy="highQuality"
                  value={addSubTaskInputValue}
                />
                <WeigeView>
                  <WeigeText>Sub-item weige:</WeigeText>
                  <NumberInput
                    numberInputValue={addWeigeInputValue}
                    setNumberInputValue={setAddWeigeInputValue}
                  />
                </WeigeView>
            </SubTaskView>
            <WeigeView>
              <ButtonView onPress={handleAddSubTask}>
                <ButtonText>Add sub-item</ButtonText>
              </ButtonView>
            </WeigeView>
          </ItemWrapperView>

          <ItemWrapperView>
            {subTaskList != ''
              ? (<LabelText>Sub-item List:</LabelText>)
              : null
            }
            { subTaskList.map((s, index) => (
              <SubTaskView key={index}>
                {
                  subTaskToggleEdit && (editSubTaskIndex === index)
                  ? (
                    <>
                      <SubTaskWrapper>
                        <SubTaskLeftView>
                          <SubTaskTag>
                            <SubTaskLabelText>{index+1}.</SubTaskLabelText>
                            <SubTaskText>{s.description}</SubTaskText>
                          </SubTaskTag>
                        </SubTaskLeftView>

                        <SubTaskRightView>
                          <SubTaskButtonView>
                            <SubTaskButton onPress={() => handleEditSubTask(index)}>
                              <SubTaskEditIcon name="edit-2"/>
                            </SubTaskButton>
                            <SubTaskButton onPress={() => handleDeleteSubTask(index)}>
                              <SubTaskCancelIcon name="x-circle"/>
                            </SubTaskButton>
                          </SubTaskButtonView>
                          <SubTaskTag>
                            <WeigeTagView>
                              <WeigeText>Weige:</WeigeText>
                              <SubTaskWeigeText>{s.weige}</SubTaskWeigeText>
                            </WeigeTagView>
                          </SubTaskTag>
                        </SubTaskRightView>
                      </SubTaskWrapper>

                      <SubTaskInput
                        enablesReturnKeyAutomatically
                        multiline
                        numberOfLines={1}
                        onChangeText={setEditSubTaskInputValue}
                        value={editSubTaskInputValue}
                      />
                      <WeigeView>
                        <WeigeText>Sub-item weige:</WeigeText>
                        <NumberInput
                          numberInputValue={editWeigeInputValue}
                          setNumberInputValue={setEditWeigeInputValue}
                        />
                      </WeigeView>
                      <HrLine/>
                    </>
                  )
                  : (
                    <>
                      <SubTaskWrapper>
                        <SubTaskLeftView>
                          <SubTaskTag>
                            <SubTaskLabelText>{index+1}.</SubTaskLabelText>
                            <SubTaskText>{s.description}</SubTaskText>
                          </SubTaskTag>
                        </SubTaskLeftView>

                        <SubTaskRightView>
                          <SubTaskButtonView>
                            <SubTaskButton onPress={() => handleOpenEditSubTask(index)}>
                              <SubTaskEditIcon name="edit-2"/>
                            </SubTaskButton>
                            <SubTaskButton onPress={() => handleDeleteSubTask(index)}>
                              <SubTaskCancelIcon name="x-circle"/>
                            </SubTaskButton>
                          </SubTaskButtonView>
                          <SubTaskTag>
                            <WeigeTagView>
                              <WeigeText>Weige:</WeigeText>
                              <SubTaskWeigeText>{s.weige}</SubTaskWeigeText>
                            </WeigeTagView>
                          </SubTaskTag>
                        </SubTaskRightView>
                      </SubTaskWrapper>
                      <HrLine/>
                    </>
                  )
                }
              </SubTaskView>
            ))}
          </ItemWrapperView>

          <ItemWrapperView>
          <WeigeView>
            <ButtonView2
              onPress={handleToggleDates}
              uppercase={false}
              mode="outlined"
            >
              <ButtonText>Start & Due Dates</ButtonText>
            </ButtonView2>
            {/* <LabelText>Due Date:</LabelText>
            <DateOptionsView>
              <DateOptions
                date={startDate}
                onDateChange={setStartDate}
                locale='pt'
                is24hourSource='locale'
                androidVariant="nativeAndroid"
                textColor="#666"
                textSize="24"
              />
            </DateOptionsView> */}
            </WeigeView>
            {/* <HrDivider/> */}
          </ItemWrapperView>

          {/* <ItemWrapperView>
            <LabelText>Prazo:</LabelText>
            <DateOptionsView>
              <DateOptions
                date={dueDate}
                onDateChange={setDueDate}
                locale='pt'
                is24hourSource='locale'
                androidVariant="nativeAndroid"
                textColor="#666"
                textSize="30"
              />
            </DateOptionsView>
          </ItemWrapperView> */}

          <ItemWrapperView>
            <LabelText>Priority:</LabelText>
            {/* <Options selectedValue={prior} onValueChange={setPrior}>
              { taskAttributesArray.map(t => (
                <Options.Item key={t.id} label={t.tag} value={t.id}/>
              ))}
            </Options> */}
            <RadioButtonView>
              <RadioButtonTag onPress={() => setPrior(1)}>
                <RadioButtonLabel>Low</RadioButtonLabel>
                <RadioButtonOuter>
                  <RadioButtonInner1 switch={prior}/>
                </RadioButtonOuter>
              </RadioButtonTag>
              <RadioButtonTag onPress={() => setPrior(2)}>
                <RadioButtonLabel>Medium</RadioButtonLabel>
                <RadioButtonOuter>
                  <RadioButtonInner2 switch={prior}/>
                </RadioButtonOuter>
              </RadioButtonTag>
              <RadioButtonTag onPress={() => setPrior(3)}>
                <RadioButtonLabel>High</RadioButtonLabel>
                <RadioButtonOuter>
                  <RadioButtonInner3 switch={prior}/>
                </RadioButtonOuter>
              </RadioButtonTag>
              <RadioButtonTag onPress={() => setPrior(4)}>
                <RadioButtonLabel>n/a</RadioButtonLabel>
                <RadioButtonOuter>
                  <RadioButtonInner4 switch={prior}/>
                </RadioButtonOuter>
              </RadioButtonTag>
            </RadioButtonView>
            {/* <HrDivider/> */}
          </ItemWrapperView>

          {/* <ItemWrapperView>
            <LabelText>Urgência:</LabelText>
            <RadioButtonView>
              <RadioButtonTag onPress={() => setUrgent(1)}>
                <RadioButtonLabel>baixa</RadioButtonLabel>
                <RadioButtonOuter>
                  <RadioButtonInner1 switch={urgent}/>
                </RadioButtonOuter>
              </RadioButtonTag>
              <RadioButtonTag onPress={() => setUrgent(2)}>
                <RadioButtonLabel>média</RadioButtonLabel>
                <RadioButtonOuter>
                  <RadioButtonInner2 switch={urgent}/>
                </RadioButtonOuter>
              </RadioButtonTag>
              <RadioButtonTag onPress={() => setUrgent(3)}>
                <RadioButtonLabel>alta</RadioButtonLabel>
                <RadioButtonOuter>
                  <RadioButtonInner3 switch={urgent}/>
                </RadioButtonOuter>
              </RadioButtonTag>
              <RadioButtonTag onPress={() => setUrgent(4)}>
                <RadioButtonLabel>n/a</RadioButtonLabel>
                <RadioButtonOuter>
                  <RadioButtonInner4 switch={urgent}/>
                </RadioButtonOuter>
              </RadioButtonTag>
            </RadioButtonView>
          </ItemWrapperView> */}

          {/* <ItemWrapperView>
            <LabelText>Complexidade:</LabelText>
            <RadioButtonView>
              <RadioButtonTag onPress={() => setComplex(1)}>
                <RadioButtonLabel>baixa</RadioButtonLabel>
                <RadioButtonOuter>
                  <RadioButtonInner1 switch={complex}/>
                </RadioButtonOuter>
              </RadioButtonTag>
              <RadioButtonTag onPress={() => setComplex(2)}>
                <RadioButtonLabel>média</RadioButtonLabel>
                <RadioButtonOuter>
                  <RadioButtonInner2 switch={complex}/>
                </RadioButtonOuter>
              </RadioButtonTag>
              <RadioButtonTag onPress={() => setComplex(3)}>
                <RadioButtonLabel>alta</RadioButtonLabel>
                <RadioButtonOuter>
                  <RadioButtonInner3 switch={complex}/>
                </RadioButtonOuter>
              </RadioButtonTag>
              <RadioButtonTag onPress={() => setComplex(4)}>
                <RadioButtonLabel>n/a</RadioButtonLabel>
                <RadioButtonOuter>
                  <RadioButtonInner4 switch={complex}/>
                </RadioButtonOuter>
              </RadioButtonTag>
            </RadioButtonView>
          </ItemWrapperView> */}

          <ItemWrapperView>
            <RadioButtonLabelText>Confirm with photo?</RadioButtonLabelText>
            {/* <Options selectedValue={confirmPhoto} onValueChange={setConfirmPhoto}>
              { confirmPhotoArray.map(t => (
                <Options.Item key={t.id} label={t.tag} value={t.id}/>
              ))}
            </Options> */}
            <RadioButtonView>
              <RadioButtonTagConfirmPhoto onPress={() => setConfirmPhoto(1)}>
                <RadioButtonLabel>Yes</RadioButtonLabel>
                <RadioButtonOuter>
                  <RadioButtonInner1 switch={confirmPhoto}/>
                </RadioButtonOuter>
              </RadioButtonTagConfirmPhoto>
              <RadioButtonTagConfirmPhoto onPress={() => setConfirmPhoto(0)}>
                <RadioButtonLabel>No</RadioButtonLabel>
                <RadioButtonOuter>
                  <RadioButtonInner0 switch={confirmPhoto}/>
                </RadioButtonOuter>
              </RadioButtonTagConfirmPhoto>
            </RadioButtonView>
            {/* <HrDivider/> */}
          </ItemWrapperView>
          <ItemWrapperView>
            <LabelText>Other Comments:</LabelText>
            <Input
              enablesReturnKeyAutomatically
              multiline
              numberOfLines={4}
              onChangeText={setDescription}
              placeholder="Don't forget to wax"
              value={description}
            />
          </ItemWrapperView>

          <ItemWrapperView>
            <SubmitButton onPress={handleSubmit}>
              <SubmitButtonText>Send</SubmitButtonText>
            </SubmitButton>
          </ItemWrapperView>

          <>


      </>

          <Modal isVisible={toggleDates}>
            <ModalView>
              <CheckBoxWrapper>
              <LabelText>Start Date:</LabelText>
              <DateOptionsView>
                <DateOptions
                  mode={'datetime'}
                  date={startDate}
                  onDateChange={setStartDate}
                  locale='en'
                  // is24hourSource='locale'
                  androidVariant="nativeAndroid"
                  textColor="#000"
                  textSize="24"
                  minimumDate={new Date()}
                />
              </DateOptionsView>
              <LabelText>Due Date:</LabelText>
              <DateOptionsView>
                <DateOptions
                  date={dueDate}
                  onDateChange={setDueDate}
                  locale='en'
                  // is24hourSource='locale'
                  androidVariant="nativeAndroid"
                  textColor="#000"
                  textSize="24"
                  minimumDate={new Date()}
                />
              </DateOptionsView>

              <HrLine/>

              <ButtonView onPress={handleToggleDates}>
                  <ButtonText>OK</ButtonText>
              </ButtonView>
                {/* <LabelText>Due Date:</LabelText>
                <DatesNumberWrapper>
                  <DatesNumberView>
                    <DatesText>Day</DatesText>
                    <InputDate
                      // autoFocus={true}
                      keyboardType="number-pad"
                      maxLength={2}
                    />
                  </DatesNumberView>
                  <DatesIntersection1View>
                    <DatesText></DatesText>
                    <DatesText>/</DatesText>
                  </DatesIntersection1View>
                  <DatesNumberView>
                    <DatesText>Month</DatesText>
                    <InputDate
                      keyboardType="number-pad"
                      maxLength={2}
                    />
                  </DatesNumberView>
                  <DatesIntersection1View>
                    <DatesText></DatesText>
                    <DatesText>/</DatesText>
                  </DatesIntersection1View>
                  <DatesIntersection2View>
                    <DatesText></DatesText>
                    <DatesText>20</DatesText>
                  </DatesIntersection2View>
                  <DatesNumberView>
                    <DatesText>Year</DatesText>
                    <InputDate
                      keyboardType="number-pad"
                      maxLength={2}
                    />
                  </DatesNumberView>
                </DatesNumberWrapper>

                <DatesNumberWrapper>
                  <DatesButton>
                    <DatesButtonText>Today</DatesButtonText>
                  </DatesButton>
                  <DatesButton>
                    <DatesButtonText>Tomorrow</DatesButtonText>
                  </DatesButton>
                  <DatesButton>
                    <DatesButtonText>Next Week</DatesButtonText>
                  </DatesButton>
                  <DatesButton>
                    <DatesButtonText>Next Year</DatesButtonText>
                  </DatesButton>
                </DatesNumberWrapper>

                <DatesNumberWrapper>
                <DatesNumberView>
                    <DatesText>Hour</DatesText>
                    <InputDate
                      keyboardType="number-pad"
                      maxLength={2}
                      returnKeyType='next'
                    />
                  </DatesNumberView>
                  <DatesIntersection1View>
                    <DatesText></DatesText>
                    <DatesText>:</DatesText>
                  </DatesIntersection1View>
                  <DatesNumberView>
                    <DatesText>Minutes</DatesText>
                    <InputDate
                      keyboardType="number-pad"
                      maxLength={2}
                    />
                  </DatesNumberView>
                  <DatesLabelView>
                    <DatesText></DatesText>
                    <DatesText>p.m.</DatesText>
                  </DatesLabelView>
                </DatesNumberWrapper>

                <DatesNumberWrapper>
                  <DatesButton2>
                    <DatesButtonText>:00</DatesButtonText>
                  </DatesButton2>
                  <DatesButton2>
                    <DatesButtonText>:15</DatesButtonText>
                  </DatesButton2>
                  <DatesButton2>
                    <DatesButtonText>:30</DatesButtonText>
                  </DatesButton2>
                  <DatesButton2>
                    <DatesButtonText>:45</DatesButtonText>
                  </DatesButton2>
                </DatesNumberWrapper> */}

              </CheckBoxWrapper>
            </ModalView>
          </Modal>


          <Modal isVisible={toggleModal}>
            { submitError
              ? (
                <ModalView>
                  {/* <Text>Error</Text> */}
                </ModalView>
              )
              : (
                <ModalView>
                  <CheckBoxWrapper>
                    <LabelText>Following List:</LabelText>
                    { contacts.map((c, index) => (
                      <AlignCheckBoxView key={index}>
                        <CheckBoxView>
                          <CheckBox
                            disabled={false}
                            // value={editedWorkers[index]}
                            value={c.checked}
                            onValueChange={
                              (newValue) => handletoggleCheckBox(newValue, index)
                            }
                          />
                          <DescriptionSpan type="check-box">{c.worker_name}</DescriptionSpan>

                        </CheckBoxView>
                        <HrLine/>
                      </AlignCheckBoxView>
                    ))}

                      <ButtonView onPress={handleToggleModal}>
                        <ButtonText>OK</ButtonText>
                      </ButtonView>

                  </CheckBoxWrapper>
                </ModalView>
              )
            }

            {/* <ModalButtonWrapper>
              <TouchableOpacity onPress={handleToggleModal}>
                <ItemWrapperView>
                  <SubmitView>
                    <AlignView>
                      <SubmitIcon name="arrow-left" size={20} color="#fff" />
                    </AlignView>
                  </SubmitView>
                </ItemWrapperView>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSubmit}>
                <ItemWrapperView>
                  <SubmitView>
                    <AlignView>
                      <SubmitIcon name="send" size={20} color="#fff" />
                    </AlignView>
                  </SubmitView>
                </ItemWrapperView>
              </TouchableOpacity>
            </ModalButtonWrapper> */}

          </Modal>
        </FormScrollView>
      </IosKeyboardAvoidingView>
    </Container>
  )
}
