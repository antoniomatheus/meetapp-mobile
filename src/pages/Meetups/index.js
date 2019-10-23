import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import api from '~/services/api';

import { Container, List } from './styles';
import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function getMeetups() {
      const response = await api.get('meetups/nextmeetups');

      setMeetups(response.data);
    }

    getMeetups();
  }, []);

  async function onSignOut(id) {
    try {
      await api.delete(`meetups/registration/${id}`);

      setMeetups(meetups.filter(meetup => meetup.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Background>
      <Container>
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              data={item}
              onPress={() => onSignOut(item.id)}
              buttonText="Sign Out"
            />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'My Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

Dashboard.propTypes = {};
