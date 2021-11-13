import React from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
// -----------------------------------------------------------------------------
import User from '~/pages/Tasks/UserPage';
import Tasks from '~/pages/Tasks/TasksPage';
// import TasksFinished from '~/pages/Tasks/TasksFinishedPage';
import Messages from '~/pages/Messages/MessagesPage';
import Contacts from '~/pages/Contacts/ContactsPage';
import Dashboard from '~/pages/Dashboard';
// import Settings from '~/pages/Settings';
// -----------------------------------------------------------------------------
const Tab = createBottomTabNavigator();

export default function TabRoutes({ navigation }) {
  const signed = useSelector(state => state.auth.signed);

  if (!signed) {
    navigation.navigate('SignIn');
  }
  // -----------------------------------------------------------------------------
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name === 'User') {
              iconName = 'coffee';
            } else if (route.name === 'Worker') {
              iconName = 'briefcase';
            } else if (route.name === 'Messages') {
              iconName = 'message-circle';
            } else if (route.name === 'Dashboard') {
              iconName = 'map';
            } else if (route.name === 'Contacts') {
              iconName = 'search';
              // iconName = focused ? 'settings' : 'settings';
            }
            return <Icon name={iconName} size={23} color={color} />;
          },
        })}
        tabBarOptions={{
          keyboardHidesTabBar: true,
          activeBackgroundColor: '#fff',
          inactiveBackgroundColor: '#fff',
          activeTintColor: '#18A0FB',
          inactiveTintColor: '#000',
        }}
      >
        <Tab.Screen
          name="User"
          component={User}
          options={{ tabBarLabel: 'Boss' }}
        />
        <Tab.Screen
          name="Worker"
          component={Tasks}
          options={{ tabBarLabel: 'Jobs' }}
        />
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ tabBarLabel: 'Dashboard' }}
        />
        <Tab.Screen
          name="Contacts"
          component={Contacts}
          options={{ tabBarLabel: 'Search' }}
        />
        <Tab.Screen
          name="Messages"
          component={Messages}
          options={{ tabBarLabel: 'Chat' }}
        />

      </Tab.Navigator>
    </>
  );
}
