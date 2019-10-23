import styled from 'styled-components';

export const Container = styled.View`
  display: flex;
  border-radius: 4px;
  align-items: stretch;
  background: #fff;
  margin-bottom: 20px;
`;

export const Banner = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Content = styled.View`
  padding: 20px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

export const DescriptionText = styled.Text`
  color: #999999;
  font-size: 13px;
  margin-bottom: 10px;
  margin-left: 20px;
`;
