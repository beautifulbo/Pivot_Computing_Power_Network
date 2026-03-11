import { useEffect, useState } from 'react'
import { Button, Card, Form, Input, message, Modal, Select, Space, Upload, Spin} from 'antd'
import { useParams, connect, useHistory, useLocation } from 'umi'
import { useSelector } from 'react-redux'

import { formLayout } from '@/config/antd'
import t from '@/utils/t'
import { generateName } from '@/utils/string'
import useFetch from '@/hooks/useFetch'
import useRequest from '@/hooks/useRequest'

import { urlValidator } from '@/components/form/validators'
import Breadcrumbs from '@/components/common/breadcrumb'
import ProjectSelect from '@/components/form/ProjectModelSelect'
import Desc from '@/components/form/desc'
import Uploader from '@/components/form/uploader'
import {getpublicModels, getoptinalnode, newModel, updatenode, loadmodel} from '@/services/model'
import {getmyProject} from '@/services/project'
import s from './add.less'

const { Option } = Select
const { useForm } = Form

const TYPES = Object.freeze({
  COPY: 1,
  LOCAL: 2,
  NET: 3,
  INTERNAL: 4
})

// todo update tips for segmentation
const Add = () => {
  const types = [
    { id: TYPES.COPY, label: t('model.add.types.copy') },
    { id: TYPES.NET, label: t('model.add.types.net') },
    { id: TYPES.LOCAL, label: t('model.add.types.local') },
    { id: TYPES.INTERNAL, label: t('model.add.types.internal') },
  ]

  const history = useHistory()
  const { query } = useLocation()
  const { mid, from, stepKey } = query
  const iterationContext = from === 'iteration'
  const { id: pid } = useParams()
  const [form] = useForm()
  const [path, setPath] = useState('')
  const [currentType, setCurrentType] = useState(mid ? TYPES.COPY : TYPES.LOCAL)
  const [currentNode, setCurrentNode] = useState()
  const initialValues = {
    name: generateName('import_model'),
    modelId: Number(mid) ? [Number(pid), Number(mid)] : undefined,
  }
  const [publicModels, setpublicModels] = useState([])
  const [selectedModel, setSelectedModel] = useState(1)
  const [optinalnodes, setnodes] = useState([])
  const [importResult, setimportResult] = useState([])
  // const [importResult, importModel] = useFetch('model/importModel')
  // const [updateresult, updatenode] = useFetch('model/updatenode')
  const [updateResult, updateProject] = useFetch('project/updateProject')
  const [project, setproject] = useState([])
  const [spinning, setSpinning] = useState(false);
  
  // const project = useSelector(({ project }) => project.projects[pid] || {})
  // const { run: getProject } = useRequest('projects/getProject', {
  //   loading: false,
  //   debounceWait: 300,
  // })

  useEffect(async () => {
    const result = await getoptinalnode({ id: pid })
    if (result) {
      if(result.code == 0){
        const nodes = result.data.nodes
        setnodes(nodes)
      }
      else{
        message.warn(result.msg)
      }
    }
  }, [])

  useEffect(async () => {
    const result = await getmyProject({ id: pid })
    if (result) {
      if(result.code == 0){
        const item = result.data.item
        setproject(item)
      }
      else{
        message.warn(result.msg)
      }
    }
    
  }, [])

  useEffect(async () => {
    const result = await getmyProject({ id: pid })
    if (result) {
      if(result.code == 0){
        const item = result.data.item
        setproject(item)
      }
      else{
        message.warn(result.msg)
      }
    }
    
  }, [])
  
  useEffect(async () => {
    const result = await getpublicModels()
    if (result) {
      if(result.code == 0){
        const items = result.data.items
        setpublicModels(items)
      }
      else{
        message.warn(result.msg)
      }
    }
  }, [])

  useEffect(() => {
    if (updateResult) {
      history.replace(`/home/project/${pid}/iterations`)
    }
  }, [updateResult])

  useEffect(() => {
    if (importResult) {
      console.log(importResult)
      if(importResult.code == 0){
        
      message.success(t('model.add.success'))
      if (iterationContext && stepKey) {
        console.log("yes")
        return updateProject({ id: pid, [stepKey]: [importResult.id] })
      }
      setSpinning(true)
      load(importResult.id)
      // const res = load(importResult.id)
      // // const group = importResult.model_group_id || ''
      // if(res == true){
      //   history.push(`/home/project/${pid}/model`)
      // }
    }
    else{
      message.warn(importResult.msg)
    }
    }
  }, [importResult])

  // useEffect(async () => {
  //   // const result = await loadmodel(importResult.id)
  //   // console.log(result.data)
  //   // if(result.data == true){
  //   //    setSpinning(false)
  //   //    history.push(`/home/project/${pid}/model`)
  //   // }
  //   load(importResult.id)
  // }, [spinning])

  const load = async (modelID) =>{
    const result = await loadmodel(modelID)
    console.log(result.data)
    if(result.data == true){
       setSpinning(false)
       history.push(`/home/project/${pid}/model`)
    }
    else{
      load(importResult.id)
    }
  }

  const importModel = async (params) =>{
    const result = await newModel(params)
    console.log(params)
    setimportResult(result)
    await updatenode(pid, params.node)
  }
  
  
  function submit(values) {
    const params = {
      name: values.name,
      did: values.did,
      node: values.node,
      description:values.description,
      // ...values,
      projectId: pid,
      url: (values.url || '').trim(),
    }
    if (isType(TYPES.LOCAL)) {
      if (path) {
        params.path = path
      } else {
        return message.error(t('model.file.required'))
      }
    }
    if (values.modelId) {
      params.modelId = values.modelId[values.modelId.length - 1]
    }
    importModel(params)
  }

  function onInternalmodelChange(id) {
    setSelectedModel(id)
  }

  const typeChange = (type) => {
    setCurrentType(type)
  }

  function isType(type) {
    return currentType === type
  }
  return (
    <div className={s.wrapper}>
      <Breadcrumbs />
      <Spin tip={t("model.add.loading")} spinning={spinning} fullscreen >
      <Card className={s.container} title={t('breadcrumbs.model.add')}>
        <div className={s.formContainer}>
          <Form form={form} {...formLayout} onFinish={submit} initialValues={initialValues}>
            <Form.Item
              label={t('model.add.form.name')}
              name="name"
              rules={[
                { required: true, whitespace: true, message: t('model.add.form.name.placeholder') },
                { type: 'string', min: 2, max: 80 },
              ]}
            >
              <Input placeholder={t('model.add.form.name.placeholder')} autoComplete="off" allowClear />
            </Form.Item>
            {/* <Form.Item
              label={t('model.add.form.node')}
              name="node"
              rules={[
                { required: true},
                { type: "number"}
              ]}
            >
              <Select 
              style={{textAlign:"center"}}
              >
              {optinalnodes.map((node) => (
                  <Option value={node} key={node}>
                    {node}
                  </Option>
                ))}
              </Select>
            </Form.Item> */}
            <Form.Item label={t('model.add.form.type')}>
              <Select onChange={(value) => typeChange(value)} defaultValue={TYPES.LOCAL}>
                {types.map((type) => (
                  <Option value={type.id} key={type.id}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {isType(TYPES.COPY) ? (
              <Form.Item label={t('model.add.form.project')} name="modelId" rules={[{ required: true }]}>
                <ProjectSelect pid={pid} type={project.type} />
              </Form.Item>
            ) : null}
            {isType(TYPES.LOCAL) ? (
              <Form.Item label={t('model.add.form.upload.btn')} name="path" required>
                <Uploader
                  onChange={({ fileList }) => {
                    setPath(fileList[0] ? fileList[0].url : '')
                  }}
                  max={1024}
                  format="all"
                  onRemove={() => setPath('')}
                  info={t('model.add.form.upload.info', { br: <br />, max: 1024, objectType: t(project?.typeLabel) })}
                ></Uploader>
              </Form.Item>
            ) : null}

            {isType(TYPES.NET) ? (
              <Form.Item
                label={t('model.add.form.url')}
                name="url"
                rules={[{ required: true, message: t('model.add.form.url.tip') }, { validator: urlValidator }]}
                extra={t('model.add.form.url.help')}
              >
                <Input placeholder={t('model.add.form.url.placeholder')} max={512} allowClear />
              </Form.Item>
            ) : null}

            {isType(TYPES.INTERNAL) ? (
              <Form.Item label={t('model.add.form.project')} name="did" rules={[{ required: true }]}>
              <Select
                  placeholder={t('model.add.form.internal.placeholder')}
                  onChange={(value) => onInternalmodelChange(value)}
                  options={publicModels.map((model) => ({
                    value: model.id,
                    // dataset,
                    // label: <Dataset dataset={dataset} />,
                    label: model.name
                  }))}
                ></Select>
              </Form.Item>
            ) : null}

            <Desc form={form} />
            <Form.Item wrapperCol={{ offset: 8 }}>
              <Space size={20}>
                <Form.Item name="submitBtn" noStyle>
                  <Button type="primary" size="large" htmlType="submit">
                    {t('common.action.import')}
                  </Button>
                </Form.Item>
                <Form.Item name="backBtn" noStyle>
                  <Button size="large" onClick={() => history.goBack()}>
                    {t('task.btn.back')}
                  </Button>
                </Form.Item>
              </Space>
            </Form.Item>
            
          </Form>
        </div>
      </Card>
      </Spin>
    </div>
  )
}

export default Add
