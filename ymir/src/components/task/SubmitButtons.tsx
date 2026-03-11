import { Button, Form, Space } from 'antd'
import { useHistory, Link ,useParams } from 'umi'

import t from '@/utils/t'
import { FC } from 'react'

const SubmitButtons: FC<{ label?: string, taskhref?:string}> = ({ label = 'common.confirm'}) => {
  const history = useHistory()
  const { id } = useParams<{ id: string}>()
  return (
    <Space size={20}>
      <Form.Item name="submitBtn" noStyle>
        <Button type="primary" size="large" htmlType="submit" onClick={() => {
          history.push(`/home/project/${id}/trainresult`)
          window.open('http://localhost:8123/', '_blank')
        }
          }>
          {t(label)}
        </Button>
        {/* <Link to={{pathname:`/login`}}/> */}
      </Form.Item>
      <Form.Item name="backBtn" noStyle>
        <Button size="large" onClick={() => history.goBack()}>
          {t('common.back')}
        </Button>
      </Form.Item>
    </Space>
  )
}

export default SubmitButtons
