import {Request,Response} from "express";
// import mockjs, { Random } from 'mockjs'
import { ObjectType } from '@/constants/project'


const list =[{
  item:{
  'id|+1': 2001,
  'chunk_size': '@integer(1,100)',
  object_type: 1,
  iteration_target: 15,
  map_target: 55,
  training_dataset_count_target: 1000000,
  name: 'sample',
  'training_keywords': 2,
  train_set: 29000,
  test_set: 29000,
  mining_set: 29000,
  set_account: 11,
  models_account: 3,
  flag: {
    type: '@string(3,7)',
    value: '@integer(4,6)',
  },
  'mining_strategy|1': [1,2,3],
  current_iteration: {
    'id|+1': 3001,
    'name': 'V@integer(1,10)',
    'version': '@integer(1,10)',
    'current_step': '@integer(1,6)',
    'train_set': '@integer(4001, 5000)',
    'train_update_result': '@integer(5001, 6000)',
    'mining_result|': '@integer(6001,7000)',
    'label_set|': '@integer(7001, 8000)',
    'mining_set|': '@integer(8001, 9000)',
    'model|': '@integer(9001,9999)',
  },
  create_datetime: '@datetime',
  description: '@title(1,20)',
},
id:2001
}
]

const list1 =[
  {
  'id|+1': 2001,
  'chunk_size': '@integer(1,100)',
  object_type: 1,
  iteration_target: '@integer(1,20)',
  map_target: '@integer(40,99)',
  training_dataset_count_target: '@integer(0, 1000000000)',
  name: '@title(2,4)',
  'training_keywords': 2,
  train_set: '@integer(10001,29999)',
  test_set: '@integer(10001,29999)',
  mining_set: '@integer(10001,29999)',
  set_account: '@integer(0,100)',
  models_account: '@integer(0,100)',
  flag: {
    type: '@string(3,7)',
    value: '@integer(4,6)',
  },
  'mining_strategy|1': [1,2,3],
  current_iteration: {
    'id|+1': 3001,
    'name': 'V@integer(1,10)',
    'version': '@integer(1,10)',
    'current_step': '@integer(1,6)',
    'train_set': '@integer(4001, 5000)',
    'train_update_result': '@integer(5001, 6000)',
    'mining_result|': '@integer(6001,7000)',
    'label_set|': '@integer(7001, 8000)',
    'mining_set|': '@integer(8001, 9000)',
    'model|': '@integer(9001,9999)',
  },
  create_datetime: '@datetime',
  description: '@title(1,20)',
},
{
  'id|+1': 2002,
  'chunk_size': '@integer(1,100)',
  object_type: 1,
  iteration_target: '@integer(1,20)',
  map_target: '@integer(40,99)',
  training_dataset_count_target: '@integer(0, 1000000000)',
  name: '@title(2,4)',
  'training_keywords': 2,
  train_set: '@integer(10001,29999)',
  test_set: '@integer(10001,29999)',
  mining_set: '@integer(10001,29999)',
  set_account: '@integer(0,100)',
  models_account: '@integer(0,100)',
  flag: {
    type: '@string(3,7)',
    value: '@integer(4,6)',
  },
  'mining_strategy|1': [1,2,3],
  current_iteration: {
    'id|+1': 3001,
    'name': 'V@integer(1,10)',
    'version': '@integer(1,10)',
    'current_step': '@integer(1,6)',
    'train_set': '@integer(4001, 5000)',
    'train_update_result': '@integer(5001, 6000)',
    'mining_result|': '@integer(6001,7000)',
    'label_set|': '@integer(7001, 8000)',
    'mining_set|': '@integer(8001, 9000)',
    'model|': '@integer(9001,9999)',
  },
  create_datetime: '@datetime',
  description: '@title(1,20)',
},
{
  'id|+1': 2003,
  'chunk_size': '@integer(1,100)',
  object_type: 1,
  iteration_target: '@integer(1,20)',
  map_target: '@integer(40,99)',
  training_dataset_count_target: '@integer(0, 1000000000)',
  name: '@title(2,4)',
  'training_keywords': 2,
  train_set: '@integer(10001,29999)',
  test_set: '@integer(10001,29999)',
  mining_set: '@integer(10001,29999)',
  set_account: '@integer(0,100)',
  models_account: '@integer(0,100)',
  flag: {
    type: '@string(3,7)',
    value: '@integer(4,6)',
  },
  'mining_strategy|1': [1,2,3],
  current_iteration: {
    'id|+1': 3001,
    'name': 'V@integer(1,10)',
    'version': '@integer(1,10)',
    'current_step': '@integer(1,6)',
    'train_set': '@integer(4001, 5000)',
    'train_update_result': '@integer(5001, 6000)',
    'mining_result|': '@integer(6001,7000)',
    'label_set|': '@integer(7001, 8000)',
    'mining_set|': '@integer(8001, 9000)',
    'model|': '@integer(9001,9999)',
  },
  create_datetime: '@datetime',
  description: '@title(1,20)',
},
{
  'id|+1': 2004,
  'chunk_size': '@integer(1,100)',
  object_type: 1,
  iteration_target: '@integer(1,20)',
  map_target: '@integer(40,99)',
  training_dataset_count_target: '@integer(0, 1000000000)',
  name: '@title(2,4)',
  'training_keywords': 2,
  train_set: '@integer(10001,29999)',
  test_set: '@integer(10001,29999)',
  mining_set: '@integer(10001,29999)',
  set_account: '@integer(0,100)',
  models_account: '@integer(0,100)',
  flag: {
    type: '@string(3,7)',
    value: '@integer(4,6)',
  },
  'mining_strategy|1': [1,2,3],
  current_iteration: {
    'id|+1': 3001,
    'name': 'V@integer(1,10)',
    'version': '@integer(1,10)',
    'current_step': '@integer(1,6)',
    'train_set': '@integer(4001, 5000)',
    'train_update_result': '@integer(5001, 6000)',
    'mining_result|': '@integer(6001,7000)',
    'label_set|': '@integer(7001, 8000)',
    'mining_set|': '@integer(8001, 9000)',
    'model|': '@integer(9001,9999)',
  },
  create_datetime: '@datetime',
  description: '@title(1,20)',
},
{
  'id|+1': 2005,
  'chunk_size': '@integer(1,100)',
  object_type: 1,
  iteration_target: '@integer(1,20)',
  map_target: '@integer(40,99)',
  training_dataset_count_target: '@integer(0, 1000000000)',
  name: '@title(2,4)',
  'training_keywords': 2,
  train_set: '@integer(10001,29999)',
  test_set: '@integer(10001,29999)',
  mining_set: '@integer(10001,29999)',
  set_account: '@integer(0,100)',
  models_account: '@integer(0,100)',
  flag: {
    type: '@string(3,7)',
    value: '@integer(4,6)',
  },
  'mining_strategy|1': [1,2,3],
  current_iteration: {
    'id|+1': 3001,
    'name': 'V@integer(1,10)',
    'version': '@integer(1,10)',
    'current_step': '@integer(1,6)',
    'train_set': '@integer(4001, 5000)',
    'train_update_result': '@integer(5001, 6000)',
    'mining_result|': '@integer(6001,7000)',
    'label_set|': '@integer(7001, 8000)',
    'mining_set|': '@integer(8001, 9000)',
    'model|': '@integer(9001,9999)',
  },
  create_datetime: '@datetime',
  description: '@title(1,20)',
},
]

const myitem = {
    'id|+1': 2001,
    'chunk_size': '@integer(1,100)',
    object_type: 1,
    iteration_target: '@integer(1,20)',
    map_target: '@integer(40,99)',
    training_dataset_count_target: '@integer(0, 1000000000)',
    name: '@title(2,4)',
    'training_keywords': 2,
    train_set: '@integer(10001,29999)',
    test_set: '@integer(10001,29999)',
    mining_set: '@integer(10001,29999)',
    set_account: '@integer(0,100)',
    models_account: '@integer(0,100)',
    flag: {
      type: '@string(3,7)',
      value: '@integer(4,6)',
    },
    'mining_strategy|1': [1,2,3],
    current_iteration: {
      'id|+1': 3001,
      'name': 'V@integer(1,10)',
      'version': '@integer(1,10)',
      'current_step': '@integer(1,6)',
      'train_set': '@integer(4001, 5000)',
      'train_update_result': '@integer(5001, 6000)',
      'mining_result|': '@integer(6001,7000)',
      'label_set|': '@integer(7001, 8000)',
      'mining_set|': '@integer(8001, 9000)',
      'model|': '@integer(9001,9999)',
    },
    create_datetime: '@datetime',
    description: '@title(1,20)',
  }

const traindataset2001={
  id:1,
  name:"Tinyimagenet",
  projectId: 2001,
  createTime: "2023.12.21",
}

const testdataset2001={
  id:1,
  name:"Tinyimagenet",
  projectId: 2001,
  createTime: "2023.12.21",
}

const miningdataset2001={
  id:1,
  name:"Cifar100",
  projectId: 2001,
  createTime: "2023.12.21",
}

const traindataset2002={
  id:1,
  name:"Cifar100",
  projectId: 2002,
  createTime: "2023.12.21",
}

const testdataset2002={
  id:1,
  name:"Cifar100",
  projectId: 2002,
  createTime: "2023.12.21",
}

const miningdataset2002={
  id:1,
  name:"Cifar100",
  projectId: 2002,
  createTime: "2023.12.21",
}


const list_portal =[
  {
  id: 2001,
  name: '大模型协同',
  setCount: 1,
  modelCount:1,
  modelname:"多粒度FL",
  nodecount:2,
  trainSet:traindataset2001,
  testSet:testdataset2001,
  miningSet:miningdataset2001,
  chunk_size: 11,
  object_type: 1,
  iteration_target: 15,
  map_target: 55,
  training_dataset_count_target: 10000000,
  training_keywords: 2,
  train_set: 10001,
  test_set: 10001,
  mining_set: 10001,
  set_account: 2,
  models_account: 5,
  flag: {
    type: 4,
    value: 5,
  },
  'mining_strategy|1': [1,2,3],
  current_iteration: {
    'id|+1': 3001,
    'name': 'V1',
    'version': 2,
    'current_step': 3,
    'train_set': 4001,
    'train_update_result': 5001,
    'mining_result|': 6001,
    'label_set|': 7001,
    'mining_set|': 8001,
    'model|': 9001,
  },
  createTime: '2025/6/30',
  description: '基于多粒度联邦学习的视觉语言模型优化',
},
{
  id: 2002,
  name: '请求分配',
  'chunk_size': '@integer(1,100)',
  setCount: 2,
  modelCount:3,
  modelname:"服务编排",
  nodecount:3,
  trainSet:traindataset2002,
  testSet:testdataset2002,
  miningSet:miningdataset2002,
  object_type: 1,
  iteration_target: '@integer(1,20)',
  map_target: '@integer(40,99)',
  training_dataset_count_target: '@integer(0, 1000000000)',
  'training_keywords': 2,
  train_set: '@integer(10001,29999)',
  test_set: '@integer(10001,29999)',
  mining_set: '@integer(10001,29999)',
  set_account: '@integer(0,100)',
  models_account: '@integer(0,100)',
  flag: {
    type: '@string(3,7)',
    value: '@integer(4,6)',
  },
  'mining_strategy|1': [1,2,3],
  current_iteration: {
    'id|+1': 3001,
    'name': 'V@integer(1,10)',
    'version': '@integer(1,10)',
    'current_step': '@integer(1,6)',
    'train_set': '@integer(4001, 5000)',
    'train_update_result': '@integer(5001, 6000)',
    'mining_result|': '@integer(6001,7000)',
    'label_set|': '@integer(7001, 8000)',
    'mining_set|': '@integer(8001, 9000)',
    'model|': '@integer(9001,9999)',
  },
  createTime: '2025/6/30',
  description: '云边系统中基于扩散模型的请求分配算法',
},
{
  id: 2003,
  name: '请求分配',
  'chunk_size': '@integer(1,100)',
  setCount: 1,
  modelCount:2,
  modelname:"DRL",
  nodecount:2,
  trainSet:traindataset2002,
  testSet:testdataset2002,
  miningSet:miningdataset2002,
  object_type: 1,
  iteration_target: '@integer(1,20)',
  map_target: '@integer(40,99)',
  training_dataset_count_target: '@integer(0, 1000000000)',
  'training_keywords': 2,
  train_set: '@integer(10001,29999)',
  test_set: '@integer(10001,29999)',
  mining_set: '@integer(10001,29999)',
  set_account: '@integer(0,100)',
  models_account: '@integer(0,100)',
  flag: {
    type: '@string(3,7)',
    value: '@integer(4,6)',
  },
  'mining_strategy|1': [1,2,3],
  current_iteration: {
    'id|+1': 3001,
    'name': 'V@integer(1,10)',
    'version': '@integer(1,10)',
    'current_step': '@integer(1,6)',
    'train_set': '@integer(4001, 5000)',
    'train_update_result': '@integer(5001, 6000)',
    'mining_result|': '@integer(6001,7000)',
    'label_set|': '@integer(7001, 8000)',
    'mining_set|': '@integer(8001, 9000)',
    'model|': '@integer(9001,9999)',
  },
  createTime: '2025/6/30',
  description: '云边系统中基于扩散模型的请求分配算法',
},
{
  id: 2004,
  name: '请求分配',
  'chunk_size': '@integer(1,100)',
  setCount: 2,
  modelCount:3,
  modelname:"扩散模型+DRL",
  nodecount:2,
  trainSet:traindataset2002,
  testSet:testdataset2002,
  miningSet:miningdataset2002,
  object_type: 1,
  iteration_target: '@integer(1,20)',
  map_target: '@integer(40,99)',
  training_dataset_count_target: '@integer(0, 1000000000)',
  'training_keywords': 2,
  train_set: '@integer(10001,29999)',
  test_set: '@integer(10001,29999)',
  mining_set: '@integer(10001,29999)',
  set_account: '@integer(0,100)',
  models_account: '@integer(0,100)',
  flag: {
    type: '@string(3,7)',
    value: '@integer(4,6)',
  },
  'mining_strategy|1': [1,2,3],
  current_iteration: {
    'id|+1': 3001,
    'name': 'V@integer(1,10)',
    'version': '@integer(1,10)',
    'current_step': '@integer(1,6)',
    'train_set': '@integer(4001, 5000)',
    'train_update_result': '@integer(5001, 6000)',
    'mining_result|': '@integer(6001,7000)',
    'label_set|': '@integer(7001, 8000)',
    'mining_set|': '@integer(8001, 9000)',
    'model|': '@integer(9001,9999)',
  },
  createTime: '2025/6/30',
  description: '云边系统中基于扩散模型的请求分配算法',
},
{
  id: 2005,
  name: '请求分配',
  'chunk_size': '@integer(1,100)',
  setCount: 5,
  modelCount:3,
  modelname:"服务编排",
  nodecount:4,
  trainSet:traindataset2002,
  testSet:testdataset2002,
  miningSet:miningdataset2002,
  object_type: 1,
  iteration_target: '@integer(1,20)',
  map_target: '@integer(40,99)',
  training_dataset_count_target: '@integer(0, 1000000000)',
  'training_keywords': 2,
  train_set: '@integer(10001,29999)',
  test_set: '@integer(10001,29999)',
  mining_set: '@integer(10001,29999)',
  set_account: '@integer(0,100)',
  models_account: '@integer(0,100)',
  flag: {
    type: '@string(3,7)',
    value: '@integer(4,6)',
  },
  'mining_strategy|1': [1,2,3],
  current_iteration: {
    'id|+1': 3001,
    'name': 'V@integer(1,10)',
    'version': '@integer(1,10)',
    'current_step': '@integer(1,6)',
    'train_set': '@integer(4001, 5000)',
    'train_update_result': '@integer(5001, 6000)',
    'mining_result|': '@integer(6001,7000)',
    'label_set|': '@integer(7001, 8000)',
    'mining_set|': '@integer(8001, 9000)',
    'model|': '@integer(9001,9999)',
  },
  createTime: '2025/6/30',
  description: '云边系统中基于扩散模型的请求分配算法',
},
]

const ItemList = async (req:Request,res:Response)=>{
    return(res.json({items:list}))
}

const myItemList = async (req:Request,res:Response)=>{
  const { id } = req.body;
  const foundItem = list_portal.find((item) => item.id === id);
  return(res.json({
    code:0,
    msg:"success",
    data:{item:[foundItem]}
  }))
}

const mylist  = async (req:Request,res:Response)=>{
  console.log(req)
  return(res.json({list:{items:list1,total: 5}}))
  }

const myquery  = async (req:Request,res:Response)=>{
    console.log(1)
    return(res.json({query:[{ name: '@title(2,4)', type: 1}]}))
    }

const project_portal  = async (req:Request,res:Response)=>{
    return(res.json({
      code:0,
      msg:"success",
      data:{
      items:list_portal
      }
    }))
    }

const initQuery = {
  name: '列表',
  current: 1,
  offset: 0,
  limit: 4,
}
const project_initstate = async (req:Request,res:Response)=>{
  return(res.json({
  code:0,
  msg:"success",
  data:{
  query: initQuery,
  list: {
    items: list_portal,
    total: 5,
  },
  projects: {},
  current: undefined
  }
}
  ))
}
const currentQuery = {
  name: '列表',
  current: 1,
  offset: 3,
  limit: 4,
}
const project_state = async (req:Request,res:Response)=>{
  return(res.json({
  code:0,
  msg:"success",
  data:{
  query: currentQuery,
  list: {
    items: list_portal,
    total: 5,
  },
  projects: {},
  current: undefined
  }
  }
  ))
}
const createproject = async (req:Request,res:Response)=>{
      return(res.json({
        code:0,
        msg:"success",
        data:
        {
          id: 1,
          name: '测试',
          nodenum:2,
          setCount: 1,
          modelCount:1,
          modelname:"服务编排",
          trainSet:traindataset2001,
          testSet:testdataset2001,
          miningSet:miningdataset2001,
          chunk_size: 11,
          object_type: 1,
          iteration_target: 15,
          map_target: 55,
          training_dataset_count_target: 10000000,
          training_keywords: 2,
          train_set: 10001,
          test_set: 10001,
          mining_set: 10001,
          set_account: 2,
          models_account: 5,
          flag: {
            type: 4,
            value: 5,
          },
          'mining_strategy|1': [1,2,3],
          current_iteration: {
            'id|+1': 3001,
            'name': 'V1',
            'version': 2,
            'current_step': 3,
            'train_set': 4001,
            'train_update_result': 5001,
            'mining_result|': 6001,
            'label_set|': 7001,
            'mining_set|': 8001,
            'model|': 9001,
          },
          create_datetime: '@datetime',
          description: '基于多粒度联邦学习的视觉语言模型优化',
        },
      }))
}
export default {
    // 'POST /project/2001':ItemList,
    'GET /project/2001':ItemList,
    'POST /project':myItemList,
    'POST /projects/samples':ItemList,
    'GET /projects':ItemList,
    'GET /myprojects':mylist,
    'POST /myprojects/2001':mylist,
    'GET /myquery':myquery,
    "POST /projects_portal":project_portal,
    "POST /projects/getprojects":project_portal,
    'GET /projects/initstate':project_initstate,
    'GET /projects/state':project_state,
    'POST /projects/creatproject':createproject,
  }