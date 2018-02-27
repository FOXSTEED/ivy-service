import React from 'react';

const Avatar = (props) => {

  return (
    <div className="avatar">
      <img src={props.avatar}></img>
    </div>
  );
};

export default Avatar;