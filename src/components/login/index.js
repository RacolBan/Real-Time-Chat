import React from 'react'
import { Row, Col, Button, Typography } from "antd"
import firebase, { auth } from "../../firebase/config"
import { addDocumentToDatabase } from '../../firebase/service'
const { Title } = Typography
const fbProvider = new firebase.auth.FacebookAuthProvider()
// const ggProvider = new firebase.auth.GoogleAuthProvider()
export default function Login() {
    const handleLogin = async (provider) => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
        if (additionalUserInfo.isNewUser) {
            addDocumentToDatabase('users', {
                uid: user.uid,
                displayName: user.displayName,
                photoUrl: user.photoURL,
                email: user.email,
                providerId: additionalUserInfo.providerId
            })
        }
    }


    return (
        <div>
            <Row justify='center' style={{ height: 800 }}>
                <Col span={8}>
                    <Title level={2} style={{ textAlign: "center" }}>Hello Chat Team</Title>
                    <Button style={{ width: '100%', marginBottiom: 5 }}>
                        Sign In With Google
                    </Button>
                    <Button style={{ width: '100%' }} onClick={() => handleLogin(fbProvider)}>
                        Sign In With Facecbook
                    </Button>
                </Col>
            </Row>
        </div>
    )
}
