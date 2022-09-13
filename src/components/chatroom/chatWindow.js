import { UserAddOutlined } from '@ant-design/icons';
import { Button, Avatar, Tooltip, Form, Input } from 'antd';
import React from 'react'
import styled from 'styled-components'
import Message from './Message';
const WrapperStyled = styled.div`
height: 100vh;
`
const HeaderStyled = styled.div`
display: flex;
justify-content: space-between;
height: 56px;
align-items: center;
padding: 0 16px;
.header{
    &-info{
        display:flex;
        flex-direction: column;
        justify-content: center;
    };
    &-title{
        margin: 0;
        font-weight: bold;
    }
    &-description{
        font-size: 12px;
    }
}
`;
const ButtonStyleGroup = styled.div`
display:flex;
align-items: center;
`
const BodyStyled = styled.div`
height: calc(100% - 56px);
display:flex;
flex-direction: column;
padding: 11px;
justify-content: flex-end;
`;
const FormStyled = styled(Form)`
display: flex;
justify-content: space-between;
align-items: center;
padding: 2px 2px 2px 0;
border: 1px solid rgb(230, 230 ,230);
border-radius: 2px;
.ant-form-item{
    flex:1;
    margin-bottom: 0;
}
`
const MessageListStyled = styled.div`

`
export default function ChatWindow() {
    return (
        <WrapperStyled>
            <HeaderStyled>
                <div className='header-info'>
                    <p className='header-title'>Room 1</p>
                    <span className='header-description'>This is room 1</span>
                </div>
                <ButtonStyleGroup>
                    <Button icon={<UserAddOutlined />} type="text">Invite</Button>
                    <Avatar.Group size="small" maxCount="2">
                        <Tooltip title='A'>
                            <Avatar>A</Avatar>
                        </Tooltip>
                        <Tooltip title='B'>
                            <Avatar>B</Avatar>
                        </Tooltip>
                        <Tooltip title='C'>
                            <Avatar>C</Avatar>
                        </Tooltip>
                        <Tooltip title='D'>
                            <Avatar>D</Avatar>
                        </Tooltip>
                    </Avatar.Group>
                </ButtonStyleGroup>
            </HeaderStyled>
            <BodyStyled>
                <MessageListStyled>
                    <Message text="test" displayName="Khai" photoUrl={null} createdAt={123456}></Message>
                    <Message text="test 123" displayName="Linh" photoUrl={null} createdAt={123456}></Message>
                    <Message text="test 456 " displayName="Phuc" photoUrl={null} createdAt={123456}></Message>
                    <Message text="test 124564151616" displayName="Khai" photoUrl={null} createdAt={123456}></Message>
                </MessageListStyled>
                <FormStyled>
                    <Form.Item>
                        <Input bordered={false} placeholder='Enter Message' autoComplete="off" />
                    </Form.Item>
                    <Button>Send</Button>
                </FormStyled>
            </BodyStyled>
        </WrapperStyled>

    )
}
