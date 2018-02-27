import React from 'react';

const Avatar = (props) => {
  return (
    <div className="avatar">
      <img src={props.avatar}></img>
      <h3>{`${props.firstName} ${props.lastName}`}</h3>
    </div>
  );
};

export default Avatar;