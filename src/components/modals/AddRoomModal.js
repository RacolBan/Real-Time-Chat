import { useContext } from 'react'
import { Form, Modal, Input } from 'antd'
import { AppContext } from '../../Context/appProvider';
import { addDocumentToDatabase } from '../../firebase/service';
import { AuthContext } from '../../Context/authProvider';
export default function AddRoomModal() {
    const [form] = Form.useForm()
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const { user: { uid } } = useContext(AuthContext)
    const handleOK = () => {
        addDocumentToDatabase('rooms', { ...form.getFieldsValue(), members: [uid] })
        setIsAddRoomVisible(false)
        form.resetFields()
    }
    const handleCancel = () => {
        setIsAddRoomVisible(false)
        form.resetFields()

    }
    return (
        <Modal
            title="Add New Room"
            open={isAddRoomVisible}
            onOk={handleOK}
            onCancel={handleCancel}
        >
            <Form form={form} layout="vertical" name='a'>
                <Form.Item label="Room's Name" name="name">
                    <Input placeholder="Enter Room's Name" />
                </Form.Item >
                <Form.Item label="Description" name="description">
                    <Input placeholder="Enter the description for room" />
                </Form.Item>
            </Form>
        </Modal>
    )
}
