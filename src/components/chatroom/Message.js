import { Avatar, Typography } from 'antd'
import { formatRelative } from 'date-fns'
import React from 'react'
import styled from 'styled-components'
const Wrapstyled = styled.div`
margin-bottom: 10px;

.author {
  margin-left: 5px;
  font-weight: bold;
}

.time {
  margin-left: 10px;
  font-size: 11px;
  color: #a7a7a7;
}

.content {
  margin-left: 30px;
}
`
const formatTime = (seconds) => {
  let formatDate = '';
  if (seconds) {
    formatDate = formatRelative(new Date(seconds * 1000), new Date())
    formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1)
  }
  return formatDate
}
export default function Message({ text, createdAt, photoURL, displayName }) {

  return (
    <Wrapstyled>
      <div>
        <Avatar size="small" src={photoURL}>{photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}</Avatar>
        <Typography.Text className='author'>{displayName}</Typography.Text>
        <Typography.Text className='time'>{formatTime(createdAt?.seconds)}</Typography.Text>
      </div>
      <div>
        <Typography.Text className='content'>{text}</Typography.Text>
      </div>
    </Wrapstyled>
  )
}
