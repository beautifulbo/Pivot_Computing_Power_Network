import {Request,Response} from "express";

const item = {
    'id|+1': 10001,
    name: "@title(2, 5)",
    "map|0-1": 0.0,
    keywords: "@keywords",
    type: 1,
    source: 1,
    task_name: "@title(1,2)",
    parameters: {
      include_train_datasets: [1, 3, 5],
      include_validation_datasets: [2],
      docker_image: 'asdfjaldsfkj',
      docker_image_id: 6,
    },
}

const publiclist = [
    {
        id: 1,
        name: "多粒度FL",
        keywords: "@keywords",
        type: 1,
        source: "public",
        parameters: {
          include_train_datasets: [1, 3, 5],
          include_validation_datasets: [2],
          docker_image: 'asdfjaldsfkj',
          docker_image_id: 6,
        },
    },
    {
        id: 2,
        name: "服务编排",
        keywords: "@keywords",
        type: 1,
        source: "public",
        parameters: {
          include_train_datasets: [1, 3, 5],
          include_validation_datasets: [2],
          docker_image: 'asdfjaldsfkj',
          docker_image_id: 6,
        },
    },
    {
        id: 1,
        name: "DRL",
        keywords: "@keywords",
        type: 1,
        source: "public",
        parameters: {
          include_train_datasets: [1, 3, 5],
          include_validation_datasets: [2],
          docker_image: 'asdfjaldsfkj',
          docker_image_id: 6,
        },
    },
    {
        id: 1,
        name: "扩散模型+FL",
        keywords: "@keywords",
        type: 1,
        source: "public",
        parameters: {
          include_train_datasets: [1, 3, 5],
          include_validation_datasets: [2],
          docker_image: 'asdfjaldsfkj',
          docker_image_id: 6,
        },
    }
]

const publicmodels = async (req:Request,res:Response)=>{
    return res.json({ 
        code: 0, 
        msg:"success",
        data:{
           items:publiclist,
           total:4
        } 
    });
}

const optinal_nodes = async (req:Request,res:Response)=>{
  return res.json({ 
      code: 0, 
      msg:"success",
      data:{
         nodes:[0,1],
         total:2
      } 
  });
}

const importmodel = async (req:Request,res:Response)=>{
  return res.json({ 
      code: 0, 
      msg:"success",
      data:{
         id:1,
         model_group_id:2
      } 
  });
}

const load = async (req:Request,res:Response)=>{
  return res.json({ 
      code: 0, 
      msg:"success",
      data:true
  });
}

const modellist = async (req:Request,res:Response)=>{
  return res.json({ 
      code: 0, 
      msg:"success",
      data:true
  });
}

export default {
    // 'POST /project/2001':ItemList,
    'GET /models/getpublicmodels':publicmodels,
    'POST /models/optinalnode':optinal_nodes,
    'POST /models/importmodel':importmodel,
    'POST /models/load':load,
    'POST /models/modellist':modellist
}

