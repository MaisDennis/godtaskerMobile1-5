import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native'
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
// -----------------------------------------------------------------------------
import TaskUser from '~/components/TasksUser';
import HeaderView from '~/components/HeaderView'
// import godtaskerFont from '~/assets/detective/godtaskerFontPlainGreySmall.png';
import logo from '~/assets/detective/detective_remake.png'
import api from '~/services/api';
// import SearchBar from '~/components/Searchbar'
import {
  AddIcon,
  Container,
  List,
  Header, HeaderImage, HeaderTabView, HeaderTouchable,
  SpaceView, SearchBarTextInput,
  Title, TitleNumber,
  UpperTabView, UpperTabText, UpperTabSelectedView, UpperTabSelectedText,
} from './styles';
// -----------------------------------------------------------------------------
export default function UserPage({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [listState, setListState] = useState(1);
  const [taskConditionIndex, setTaskConditionIndex] = useState();
  const user_id = useSelector(state => state.user.profile.id);
  const update_tasks = useSelector(state => state.task.tasks);

  useEffect(() => {
    loadTasks('', user_id);
  }, [ update_tasks ]);

  const formattedDate = fdate =>
  fdate == null
    ? '-'
    : format(fdate, "dd 'de' MMMM',' yyyy", { locale: pt });
  const todayDate = formattedDate(new Date())

  async function loadTasks(workerNameFilter, userID) {
    setListState(1);
    let response = await api.get(`tasks/user/unfinished`, {
      params: { workerNameFilter, userID }
    })
    setTasks(response.data);
    setTaskConditionIndex(1);
  }

  async function loadFinished(workerNameFilter, userID) {
    setListState(2);
    let response = await api.get(`tasks/user/finished`, {
      params: { workerNameFilter, userID }
    })
    setTasks(response.data);
    setTaskConditionIndex(2);
  }

  async function loadCanceled(workerNameFilter, userID) {
    setListState(3);
    let response = await api.get(`tasks/user/canceled`, {
      params: { workerNameFilter, userID }
    })
    setTasks(response.data);
    setTaskConditionIndex(3);
  }

  function handleCreateTaskPage() {
    navigation.navigate('TaskCreate')
  }

  // -----------------------------------------------------------------------------
  return (
    <Container>
      <Header>
        <SpaceView>
          <HeaderImage
            source={logo}
          />
        </SpaceView>

        <SearchBarTextInput
          placeholder='Search'
        />
        {/* <SearchBar/> */}
        <HeaderTouchable onPress={() => loadTasks('', user_id)}>
          <AddIcon name='refresh-cw' size={20}/>
        </HeaderTouchable>
        <HeaderTouchable onPress={handleCreateTaskPage}>
          <AddIcon name='plus-square' size={21}/>
        </HeaderTouchable>
      </Header>

      <HeaderTabView>
        { listState === 1
          ? (
            <UpperTabSelectedView>
              <UpperTabSelectedText>open</UpperTabSelectedText>
            </UpperTabSelectedView>
          )
          : (
            <UpperTabView onPress={() => loadTasks('', user_id)}>
              <UpperTabText>open</UpperTabText>
            </UpperTabView>
          )
        }
        { listState === 2
          ? (
            <UpperTabSelectedView>
              <UpperTabSelectedText>finished</UpperTabSelectedText>
            </UpperTabSelectedView>
          )
          : (
            <UpperTabView onPress={() => loadFinished('', user_id)}>
              <UpperTabText>finished</UpperTabText>
            </UpperTabView>
          )
        }
        { listState === 3
          ? (
            <UpperTabSelectedView>
              <UpperTabSelectedText>canceled</UpperTabSelectedText>
            </UpperTabSelectedView>
          )
          : (
            <UpperTabView onPress={() => loadCanceled('', user_id)}>
              <UpperTabText>canceled</UpperTabText>
            </UpperTabView>
          )
        }
      </HeaderTabView>
      { tasks == ''
        ? (
          <Title>No tasks with this status</Title>
        )
        : (
          <List
            data={tasks}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => (
              <>
                {/* <TitleNumber>{index+1}</TitleNumber> */}
                <TaskUser
                  key={item.id}
                  data={item}
                  navigation={navigation}
                  taskConditionIndex={taskConditionIndex}
                />
              </>
            )}
          />
        )
      }
    </Container>
  );
}

