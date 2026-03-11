import React, { FC, useEffect,useState} from 'react'
import { ConfigProvider, Layout, message } from 'antd'
import { useHistory, withRouter, useSelector } from 'umi'
import storage from '@/utils/storage'

import useRequest from '@/hooks/useRequest'

import Loading from '@/components/common/Loading'
import Empty from '@/components/empty/Default'
import LeftMenu from '@/components/common/LeftMenu'
import HeaderNav from '@/components/common/Nav'
import Foot from '@/components/common/Footer'

import commonStyles from './common.less'
import '@/assets/icons/iconfont.css'
import Notification from '@/components/message/Notification'
import OfficialImageTip from '@/components/image/OfficialImageTip'
import {getuserlogined,getuserinfo} from '@/services/login'
const { Header, Content, Sider, Footer } = Layout
message.config({ maxCount: 1 })

const BasicLayout: FC = ({ children }) => {
  const history = useHistory()
  // const logined = useSelector(({ user }) => user.logined)
  // let logined = 0
  const [logined, setlogined] = useState<boolean>(false)
  // const { run: getUserInfo } = useRequest('user/getUserInfo')
  
  useEffect(() => {
  const getlogined = async () => {
    
    const res = await getuserinfo()
    setlogined(true)
    // if(!res.ok){
    //   // 说明无响应，要么登录信息过期，要么后端崩掉
    //   window.location.href = `/login?redirect=${history.location.pathname}`
    // }
    // else{
    //   if(res.code==0){
    //     // 登录信息有效
    //     setlogined(true)
    //   }
    //   else{
    //     // 登录失败
    //     message.warn(res.msg)
    //   }
    // }
    }
  
  const onFinish = async () => {
    await getlogined()
  }
  onFinish()
  },[logined])
  
  // useEffect(() => {
  //     if (logined === 0) {
  //       window.location.href = `/login?redirect=${history.location.pathname}`
  //     }
  //   getUserInfo()
  // }, [logined])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [history.location.pathname])

  return (
    <ConfigProvider renderEmpty={() => <Empty />}>
      <Layout className={commonStyles.home}>
        <Header>
          <HeaderNav></HeaderNav>
        </Header>
        <Layout>
          <LeftMenu></LeftMenu>
          <Layout className="layoutContent">
            <Content className={commonStyles.content}>
              <div>{children}</div>
              <Footer className={commonStyles.footer}>
                <Foot></Foot>
              </Footer>
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <Loading />
      <Notification />
      <OfficialImageTip />
    </ConfigProvider>
  )
}
export default withRouter(BasicLayout)
