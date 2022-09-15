import React, { useContext, useMemo } from 'react'
import { Collapse, Button, Typography } from 'antd'
import styled from 'styled-components'
import { PlusSquareOutlined } from '@ant-design/icons';
import useFirestore from '../../hooks/useFirestore';
import { AuthContext } from '../../Context/authProvider';
const { Panel } = Collapse;
const PanelStyled = styled(Panel)`
&&&{
    .ant-collapse-header,p{
        color:white;
    }
    .ant-collapse-content-box{
        padding: 0 40px;
    }
    .add-room{
        color: white;
        padding: 0
    }
}
`
const LinkStyled = styled(Typography.Link)`
display: block;
margin-bottom: 5px;
color:white;

`

export default function RoomList() {
    const { user: { uid } } = useContext(AuthContext)
    const roomMemo = useMemo(() => {
        return {
            fieldName: "members",
            operator: "array-contains",
            compareValue: uid
        }
    }, [uid])
    const rooms = useFirestore('rooms', roomMemo)
    console.log({ rooms });
    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled className='name-header' header='List Room' key='1'>
                {rooms.map(room =>
                    <LinkStyled key={room.id}>{room.name}</LinkStyled>
                )}
                <Button type='text' icon={<PlusSquareOutlined />} className='add-room'>Add Room</Button>
            </PanelStyled>

        </Collapse>
    )
}

