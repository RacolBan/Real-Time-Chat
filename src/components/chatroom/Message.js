import { Avatar, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components'
const Wrapstyled = styled.div`
margin-bottom: 10px;
.author{
    margin-left: 5px;
    font-weight: bold;
.time{ 
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
}
.content{
    margin-left: 30px;
}
}
`
export default function Message({ text, createdAt, photoUrl, displayName }) {
    return (
        <Wrapstyled>
            <Avatar size="small" src={photoUrl}>A</Avatar>
            <Typography.Text className='author'>{displayName}</Typography.Text>
            <Typography.Text className='time'>{createdAt}</Typography.Text>
            <div>
                <Typography.Text className='content'>{text}</Typography.Text>
            </div>


        </Wrapstyled>

    )
}
