import React, { useEffect, useState, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, addDays, subDays, getISODay } from 'date-fns';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import api from '~/services/api';

import { Container, DateText, List, Control } from './styles';
import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  const selectedDate = useMemo(() => {
    return format(date, 'MMMM d');
  }, [date]);

  useEffect(() => {
    async function getMeetups() {
      try {
        const response = await api.get(`meetups?date=${date.toISOString()}`);

        setMeetups(response.data);
      } catch (err) {
        console.tron.log(err);
      }
    }

    getMeetups();
  }, [date]);

  function handleDecreaseDate() {
    setDate(subDays(date, 1));
  }

  function handleIncreaseDate() {
    setDate(addDays(date, 1));
  }

  async function onSignUp(id) {
    try {
      await api.post(`meetups/registration/${id}`);

      setMeetups(meetups.filter(meetup => meetup.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Background>
      <Container>
        <Control>
          <TouchableWithoutFeedback onPress={handleDecreaseDate}>
            <Icon name="keyboard-arrow-left" size={30} color="#fff" />
          </TouchableWithoutFeedback>
          <DateText>{selectedDate}</DateText>
          <TouchableWithoutFeedback onPress={handleIncreaseDate}>
            <Icon name="keyboard-arrow-right" size={30} color="#fff" />
          </TouchableWithoutFeedback>
        </Control>

        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              data={item}
              onPress={() => onSignUp(item.id)}
              buttonText="Sign Up"
            />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event-note" size={20} color={tintColor} />
  ),
};

Dashboard.propTypes = {};
