import { UserAddOutlined } from '@ant-design/icons';
import { Button, Avatar, Tooltip, Form, Input, Alert } from 'antd';
import React, { useContext, useState, useMemo } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../Context/appProvider';
import { AuthContext } from '../../Context/authProvider';
import { addDocumentToDatabase } from '../../firebase/service';
import useFirestore from '../../hooks/useFirestore';
import Message from './Message';
const WrapperStyled = styled.div`
height: 100vh;
`
const HeaderStyled = styled.div`
display: flex;
justify-content: space-between;
height: 56px;
padding: 0 16px;
align-items: center;
border-bottom: 1px solid rgb(230, 230, 230);

.header {
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__title {
    margin: 0;
    font-weight: bold;
  }

  &__description {
    font-size: 12px;
  }
}
`;
const ButtonStyleGroup = styled.div`
display: flex;
align-items: center;
`;
const BodyStyled = styled.div`
height: calc(100% - 56px);
display: flex;
flex-direction: column;
padding: 11px;
justify-content: flex-end;
`;
const FormStyled = styled(Form)`
display: flex;
justify-content: space-between;
align-items: center;
padding: 2px 2px 2px 0;
border: 1px solid rgb(230, 230, 230);
border-radius: 2px;

.ant-form-item {
  flex: 1;
  margin-bottom: 0;
}
`;
const MessageListStyled = styled.div`
max-height: 100%;
over-flow-y : auto;
`
export default function ChatWindow() {
    const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext)
    const { user: { uid, displayName, photoURL } } = useContext(AuthContext)
    const [inputValue, setInputValue] = useState('')
    const [form] = Form.useForm()
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }
    const handleOnSubmit = () => {
        addDocumentToDatabase('messages', {
            text: inputValue,
            uid,
            displayName,
            photoURL,
            roomId: selectedRoom.id
        })
        // clear message after submit at name = message
        form.resetFields(['message']);
    }
    const messageCondition = useMemo(() => ({
        fieldName: 'roomId',
        operator: "==",
        compareValue: selectedRoom.id
    }), [selectedRoom.id])
    const messages = useFirestore('messages', messageCondition)
    console.log({ messages });
    return (
        <WrapperStyled>
            {selectedRoom.id ? (
                <>
                    <HeaderStyled>
                        <div className='header__info'>
                            <p className='header__title'>{selectedRoom.name}</p>
                            <span className='header__description'>{selectedRoom.description}</span>
                        </div>
                        <ButtonStyleGroup>
                            <Button icon={<UserAddOutlined />} type="text" onClick={() => setIsInviteMemberVisible(true)}>Invite</Button>
                            <Avatar.Group size="small" maxCount="2">
                                {
                                    members.map(member =>
                                        <Tooltip title={member.displayName} key={member.id}>
                                            <Avatar src={member.photoURL}>{member.photoURL ? "" : member.displayName?.charAt(0)?.toUpperCase()} </Avatar>
                                        </Tooltip>
                                    )
                                }
                            </Avatar.Group>
                        </ButtonStyleGroup>
                    </HeaderStyled>
                    <BodyStyled>
                        <MessageListStyled>
                            {
                                messages.map(msg =>
                                    <Message key={msg.id} text={msg.text} displayName={msg.displayName} photoURL={msg.photoURL} createdAt={msg.createdAt}></Message>
                                )
                            }
                        </MessageListStyled>
                        <FormStyled form={form}>
                            <Form.Item name="message">
                                <Input bordered={false} onChange={(e) => handleInputChange(e)} onPressEnter={() => handleOnSubmit()} placeholder='Enter Message' autoComplete="off" />
                            </Form.Item>
                            <Button onClick={() => handleOnSubmit()}>Send</Button>
                        </FormStyled>
                    </BodyStyled>
                </>
            ) : (
                <Alert
                    message='Hãy chọn phòng'
                    type='info'
                    showIcon
                    style={{ margin: 5 }}
                    closable
                />
            )}
        </WrapperStyled>
    )
}
