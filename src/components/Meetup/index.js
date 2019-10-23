import React from 'react';
import { parseISO, formatRelative } from 'date-fns';

import baseURL from '~/services/devUrl';
import { Container, Banner, Content, Title, DescriptionText } from './styles';

import Button from '../Button';

export default function Meetup({ data, onPress, buttonText }) {
  const parsedDate = formatRelative(parseISO(data.date_time), new Date(), {
    addSuffix: true,
  });

  return (
    <Container>
      <Banner
        source={{ uri: data.image && `${baseURL}/files/${data.image.path}` }}
      />

      <Content>
        <Title>{data.title}</Title>
        <DescriptionText>{parsedDate}</DescriptionText>
        <DescriptionText>{data.location}</DescriptionText>
        <DescriptionText>{data.organizer.name}</DescriptionText>

        <Button onPress={onPress}>{buttonText}</Button>
      </Content>
    </Container>
  );
}
