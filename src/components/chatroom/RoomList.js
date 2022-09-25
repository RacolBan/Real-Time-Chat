import React, { useContext, useMemo } from 'react'
import { Collapse, Button, Typography } from 'antd'
import styled from 'styled-components'
import { PlusSquareOutlined } from '@ant-design/icons';
import { AppContext } from '../../Context/appProvider';
const { Panel } = Collapse;
const PanelStyled = styled(Panel)`
&&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .add-room {
      color: white;
      padding: 0;
    }
  }
`;
const LinkStyled = styled(Typography.Link)`
display: block;
margin-bottom: 5px;
color:white;
`;

export default function RoomList() {
    const { rooms, setIsAddRoomVisible } = useContext(AppContext);
    console.log({ rooms })
    const handleAddRoom = () => {
        setIsAddRoomVisible(true)
    }
    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled header='List Room' key='1'>
                {rooms.map(room =>
                    <LinkStyled key={room.id}>{room.name}</LinkStyled>
                )}
                <Button type='text' icon={<PlusSquareOutlined />} className='add-room' onClick={handleAddRoom}>Add Room</Button>
            </PanelStyled>

        </Collapse>
    )
}

