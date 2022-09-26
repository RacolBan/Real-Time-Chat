import { UserAddOutlined } from '@ant-design/icons';
import { Button, Avatar, Tooltip, Form, Input, Alert } from 'antd';
import React, { useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../Context/appProvider';
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
    console.log(members)

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
                            <Message text="test" displayName="Khai" photoURL={null} createdAt={123456}></Message>
                            <Message text="test 123" displayName="Linh" photoURL={null} createdAt={123456}></Message>
                            <Message text="test 456 " displayName="Phuc" photoURL={null} createdAt={123456}></Message>
                            <Message text="test 124564151616" displayName="Khai" photoURL={null} createdAt={123456}></Message>
                        </MessageListStyled>
                        <FormStyled>
                            <Form.Item>
                                <Input bordered={false} placeholder='Enter Message' autoComplete="off" />
                            </Form.Item>
                            <Button>Send</Button>
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
