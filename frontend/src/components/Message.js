import React from 'react';

const Message = (props) => {
    const { info } = props;

    return (
        <div>{info.date} - {info.value}</div>
    );
}

export default Message;