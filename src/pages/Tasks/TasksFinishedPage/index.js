import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// -----------------------------------------------------------------------------
import Task from '~/components/Tasks';
import api from '~/services/api';
import { Container, Title3, List } from './styles';
// -----------------------------------------------------------------------------
export default function DashboardFinishedTasks({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const name = useSelector(state => state.worker.workerData.name);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const response = await api.get(`tasks/finished`, {
      params: { test: name },
    });
    setTasks(response.data);
  }
  // -----------------------------------------------------------------------------
  return (
    <>
      <Container>
        {tasks == ''
          ? <Title3>Não há tarefas concluídas.</Title3>
          : <List
              data={tasks}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <>
                  <Task data={item} navigation={navigation} />
                </>
              )}
            />
        }
      </Container>
    </>
  );
}
