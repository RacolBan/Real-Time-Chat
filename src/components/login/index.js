import React from 'react'
import { Row, Col, Button, Typography } from "antd"
import firebase, { auth } from "../../firebase/config"
const { Title } = Typography
const fbProvider = new firebase.auth.FacebookAuthProvider()

export default function Login() {
    const handleLogin = (provider) => {
        auth.signInWithPopup(provider)
    }


    return (
        <div>
            <Row justify='center' style={{ height: 800 }}>
                <Col span={8}>
                    <Title level={2} style={{ textAlign: "center" }}>Hello Chat Team</Title>
                    <Button style={{ width: '100%', marginBottiom: 5 }}>
                        Sign In With Google
                    </Button>
                    <Button style={{ width: '100%' }} onClick={() => { handleLogin(fbProvider) }}>
                        Sign In With Facecbook
                    </Button>
                </Col>
            </Row>
        </div>
    )
}
