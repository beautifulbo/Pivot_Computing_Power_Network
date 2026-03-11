import React from 'react'
import { connect } from 'dva'
import { Form, Input, Button, Checkbox, Row, Col, Space,message } from 'antd'
import { Link, useHistory, useLocation, getLocale,useSelector } from 'umi'

import{UserOutlined} from '@ant-design/icons';
import {getuserinfo} from "@/services/user";
import { formLayout } from '@/config/antd'
import t from '@/utils/t'
import Foot from '@/components/common/Footer'
import styles from '../common.less'
import loginBig from '@/assets/logo-big.png'
import { EmailIcon, LockIcon } from '@/components/common/Icons'
import LangBtn from '@/components/common/LangBtn'
import {loginList} from "@/services/login"; 
import storage from '@/utils/storage'

// const Login = ({ loginApi }) => {
const Login = ({ login }) => {
  const history = useHistory()
  const location = useLocation()
  const { redirect } = location.query

  const loginResult = useSelector(state => state.loginResult);

  const onFinish = async ({ username, password }) => {
    var params = {
      username,
      password,
    }
    const res = await loginList(params)
    if(res){
      console.log(res.status)
      if(res.code == 0){
        message.success(t('login.login.success'))
        if (redirect) {
          history.push(redirect)
        } else {
          history.push('/home/portal')
        }
      }
      else{
        message.warn(t('login.login.fail'))
      }
    }
   
    
    
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={styles.login}>
      <Row>
        <Col span={16} className={`${styles.slogan} slogan_${getLocale()}`}>
          <div className={styles.logo}>
            <img src={loginBig} />
          </div>
          <div className={styles.footer}>
            <Foot></Foot>
          </div>
        </Col>
        <Col span={8} className={styles.content}>
          <div className={styles.lang}>
            <LangBtn dark />
          </div>
          <div className={styles.loginForm}>
            <h1 className={styles.title}>{t('login.form.title')}</h1>
            <Form
              className={styles.form}
              name="login"
              initialValues={{}}
              layout="vertical"
              labelCol={{ style: { fontWeight: 'bold' } }}
              requiredMark={false}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              size="large"
            >
              <Form.Item
                label={t('login.username')}
                name="username"
                rules={[
                  {
                    required: true,
                    message: t('login.username.required.msg'),
                  },
                ]}
              >
                <Input allowClear placeholder={t('login.username.placeholder')} prefix={<UserOutlined  style={{ color: 'rgba(0, 0, 0, 0.45)' }} />} />
              </Form.Item>

              <Form.Item
                label={t('login.pwd')}
                name="password"
                rules={[
                  {
                    required: true,
                    message: t('login.pwd.required.msg'),
                  },
                  {
                    type: 'string',
                    // min: 8,
                    max: 16,
                  },
                ]}
              >
                <Input.Password
                  allowClear
                  visibilityToggle={false}
                  placeholder={t('login.pwd.placeholder')}
                  prefix={<LockIcon style={{ color: 'rgba(0, 0, 0, 0.45)' }} />}
                />
              </Form.Item>

              <Form.Item name="submit">
                <Button type="primary" htmlType="submit" className={styles.submit} block>
                  {t('login.login')}
                </Button>
              </Form.Item>
              <Form.Item className={styles.links}>
                <Space>
                  <Link className={styles.link} to="/signup">
                    {t('login.signup')}
                  </Link>
                  <span className={styles.link}>|</span>
                  <Link className={styles.link} to="/forget_pwd">
                    {t('login.forget')}
                  </Link>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  )
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loginApi(params) {
//       return dispatch({
//         type: 'user/login',
//         payload: params,
//       })
//     },
//   }
// }
export default Login
