import { Card,Row, Col} from "antd"


import t from "@/utils/t"

import Breadcrumbs from "@/components/common/breadcrumb"

import commonStyles from "../common.less"

const items = [
    {
      key: '1',
      label: '训练状态',
      children: <p>{"训练中"}</p>,
    },
    {
      key: '2',
      label: 'Accuracy',
      children: <p>{"87%"}</p>,
    }
  ];

function TrainPage() {

  return (
    <div className={commonStyles.wrapper}>
      <Breadcrumbs />
      <Card className={commonStyles.container} title={t('breadcrumbs.task.trainresult')}>
      <Row>
      <Col span={6} offset={3}>
      <Card title="训练状态"  style={{width: 300,textAlign:"center"}}>
        <p>训练完毕</p>
      </Card>
      </Col>
      <Col span={6} offset={3}>
      <Card title="Accuracy"  style={{width: 300,textAlign:"center"}}>
        <p>87%</p>
      </Card>
      </Col>
      </Row>
      </Card>
    </div>
  )
}

export default TrainPage
