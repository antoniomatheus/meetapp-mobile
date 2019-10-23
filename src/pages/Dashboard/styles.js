import styled from 'styled-components';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Control = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  align-self: center;
`;

export const DateText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  margin: 0px 10px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
