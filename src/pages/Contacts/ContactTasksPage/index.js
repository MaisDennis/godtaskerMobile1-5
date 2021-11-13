import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// -----------------------------------------------------------------------------
// import Task from '~/components/Tasks';
import TaskUser from '~/components/TasksUser';
import api from '~/services/api';
import {
  Container, List, Title3,
  HeaderTabView, UpperTabView, UpperTabText,
} from './styles';
// -----------------------------------------------------------------------------
export default function ContactsTasksPage({ navigation, route }) {
  const [tasks, setTasks] = useState([]);
  const user_id = useSelector(state => state.user.profile.id);
  // console.tron.log(user_id)

  useEffect(() => {
    loadTasks(route.params.worker_name, parseInt(user_id));
    // console.tron.log(tasks)
  }, [ user_id ]);

  async function loadTasks(workerNameFilter, userID) {
    const response = await api.get(`tasks/user/unfinished`, {
      params: { workerNameFilter, userID }
    })
    setTasks(response.data);
    // console.tron.log(response)

  }
  // -----------------------------------------------------------------------------
  return (
    <Container>
      <HeaderTabView>
        <UpperTabView><UpperTabText></UpperTabText></UpperTabView>

      </HeaderTabView>
      { tasks == ''
          ? <Title3>Não há tarefas em aberto.</Title3>
          : <List
              data={tasks}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <>
                  <TaskUser key={item.id} data={item} navigation={navigation} />
                </>
              )}
            />
      }
    </Container>
  );
}


