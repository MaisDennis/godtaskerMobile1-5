import React, { useState } from 'react'
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import { parseISO, isBefore , isSameHour, subHours, addMinutes, format } from 'date-fns';
// -----------------------------------------------------------------------------
import {
  ButtonView, ButtonView2, ButtonText,
  CheckBoxWrapper, Container,
  DateOptionsView, DateOptions,
  FormScrollView,
  HrLine,
  Input, ItemWrapperView,
  LabelText,
  ModalView,
  RadioButtonView, RadioButtonTag,
  RadioButtonLabel, RadioButtonOuter,
  RadioButtonInner1, RadioButtonInner2, RadioButtonInner3,
  RadioButtonInner4,
  SubTaskButton, SubTaskButtonView,
  SubTaskCancelIcon, SubTaskEditIcon,
  SubTaskInput,
  SubTaskLabelText, SubTaskLeftView, SubTaskRightView,
  SubTaskTag, SubTaskText,
  SubTaskWeigeText, SubTaskWrapper, SubTaskView,
  SubmitButton, SubmitButtonText,
  TitleText,
  WeigeView, WeigeTagView, WeigeText,
} from './styles'
import NumberInput from '~/components/NumberInput'
import { updateTasks } from '~/store/modules/task/actions';
import api from '~/services/api';

export default function TaskEditPage({ navigation, route }) {
  const dispatch = useDispatch();
  const data = route.params;

  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [prior, setPrior] = useState(data.task_attributes[0]);
  const [urgent, setUrgent] = useState(data.task_attributes[1]);
  const [complex, setComplex] = useState(data.task_attributes[2]);
  const [startDate, setStartDate] = useState(parseISO(data.start_date));
  const [dueDate, setDueDate] = useState(parseISO(data.due_date));

  const [subTaskList, setSubTaskList] = useState(data.sub_task_list);
  const [editSubTaskIndex, setEditSubTaskIndex] = useState();
  const [addSubTaskInputValue, setAddSubTaskInputValue] = useState();
  const [addWeigeInputValue, setAddWeigeInputValue] = useState(1);
  const [editSubTaskInputValue, setEditSubTaskInputValue] = useState();
  const [editWeigeInputValue, setEditWeigeInputValue] = useState(1);
  const [subTaskToggleEdit, setSubTaskToggleEdit] = useState(false);
  const [toggleDates, setToggleDates] = useState(false);
  const [sameHourCheck, setSameHourCheck] = useState(false)

  function handleAddSubTask() {
    let editedSubTaskList = subTaskList
    const sub_task_id = Math.floor(Math.random() * 1000000)
    editedSubTaskList.push({
      id: sub_task_id,
      description: addSubTaskInputValue,
      weige: addWeigeInputValue,
      complete: false,
      user_read: true,
    })
    setSubTaskList(editedSubTaskList)
    setAddSubTaskInputValue();
    // console.log(subTaskList)
    navigation.navigate('TaskEdit');
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
    // navigation.navigate('TaskEdit',{
    //   sub_task_list: subTaskList,
    // });
  }

  function handleDeleteSubTask(position) {
    let editedSubTaskList = subTaskList
    editedSubTaskList.splice(position, 1)
    setSubTaskList(editedSubTaskList)
    navigation.navigate('TaskEdit',{
      sub_task_list: subTaskList,
    });
  }

  function handleToggleDates() {
    setToggleDates(!toggleDates)
  }

  function weigeToPercentage(subTasks) {
    let weigeSum = 0;
    for(let i = 0; i < subTasks.length; i++) {
      weigeSum += parseFloat(subTasks[i].weige)
    }

    for(let i = 0; i < subTasks.length; i++) {
      subTasks[i].weige_percentage = (Math.round((parseFloat(subTasks[i].weige) / weigeSum)*1000) /10)
    }
    return weigeSum;
  }

  async function editTasks() {
    weigeToPercentage(subTaskList)

    await api.put(`tasks/${data.id}/notification/user`, {
      name: name,
      description: description,
      sub_task_list: subTaskList,
      task_attributes: [prior, urgent, complex],
      start_date: startDate,
      due_date: dueDate,
    });

    dispatch(updateTasks(new Date()))
  }

  async function handleSubmit() {
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
      editTasks()

      Alert.alert(
        'Success!',
        'Task Edited',
        [{ style: "default" }],
        { cancelable: true },
      )
    }
    catch(error) {
      console.log(error)
      Alert.alert(
        'Error: Task not edited',
        'Please try again',
        [{ style: "default" }],
        { cancelable: true },
      )
    }
    navigation.goBack();
  }
  // ---------------------------------------------------------------------------
  return (
    <Container>
      <FormScrollView contentContainerStyle={{ alignItems: 'center'}}>
      <ItemWrapperView>
          <LabelText>Sent to:</LabelText>
          <TitleText>{data.worker.worker_name}</TitleText>
          <HrLine/>
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
                        <SubTaskLabelText>{index+1}</SubTaskLabelText>
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
                          <WeigeText>Sub-item Weige:</WeigeText>
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
          </WeigeView>
        </ItemWrapperView>

        <ItemWrapperView>
          <LabelText>Priority:</LabelText>
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
        </ItemWrapperView>

        <ItemWrapperView>
          <LabelText>Other Comments:</LabelText>
          <Input
            value={description}
            onChangeText={setDescription}
          ></Input>
        </ItemWrapperView>

        <ItemWrapperView>
          <SubmitButton onPress={handleSubmit}>
            <SubmitButtonText>Send</SubmitButtonText>
          </SubmitButton>
        </ItemWrapperView>

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
                minuteInterval={15}
                // is24hourSource='locale'
                androidVariant="nativeAndroid"
                textColor="#000"
                textSize="24"
              />
            </DateOptionsView>
            <LabelText>Due Date:</LabelText>
            <DateOptionsView>
              <DateOptions
                mode={'datetime'}
                date={dueDate}
                onDateChange={setDueDate}
                locale='en'
                minuteInterval={15}
                // is24hourSource='locale'
                androidVariant="nativeAndroid"
                textColor="#000"
                textSize="24"
              />
            </DateOptionsView>
              <HrLine/>

              <ButtonView onPress={handleToggleDates}>
                  <ButtonText>OK</ButtonText>
              </ButtonView>
            </CheckBoxWrapper>
          </ModalView>
        </Modal>

      </FormScrollView>
    </Container>
  )
}
