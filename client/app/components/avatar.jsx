import React from 'react';
import styles from '../styling/app.css';
import styled from 'styled-components';

const AvatarContainer = styled.div`
  margin-right: 30px;
`;

const AvatarImage = styled.img`
  margin-top: 24px;
  width: 90px;
  height: 90px;
  border-radius: 100px;
`;

const Username = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
`;


const Avatar = (props) => {
  return (
    <AvatarContainer>
      <AvatarImage src={props.avatar}></AvatarImage>
      <Username>{`${props.firstName} ${props.lastName}`}</Username>
    </AvatarContainer>
  );
};

export default Avatar;