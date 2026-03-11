import {Request,Response} from "express";
import { IdMap, List } from '@/models/typings/common.d'
import { Dataset as DatasetType, DatasetGroup as DatasetGroupType, Iteration, Project, Result, Task } from '@/constants'

interface DatasetState {
    datasets: IdMap<List<Dataset>>
    versions: IdMap<Dataset[]>
    dataset: IdMap<Dataset>
    allDatasets: { [pid: number]: Dataset[] }
    publicDatasets: Dataset[]
    query: YParams.DatasetsQuery
    validDatasetCount: number
    trainingDatasetCount: number
    importing: {
    //   items: ImportingItem[]
      max: number
      formatVisible?: boolean
      editing?: boolean
    }
  }

interface Dataset extends Result {
    groupId: number
    keywordCount: number
    isProtected: Boolean
    assetCount: number
    gt?: {
        count: {
            'a':100,
            'b':100,
            'c':100,
            'd':100,
        },
        keywords: ['a','b','c','d'],
        negative: 100,
        total: 500,
    }
    // cks?: CKCounts
    // tags?: CKCounts
    // evaluated?: boolean
    // suggestions: DatasetSuggestions
  }

const testdatasets = {
    items:[
    {
        groupId:1,
        datasetname:"Tinyimagenet",
        keywordCount:100,
        isProtected: false,
        source:"Net",
        assetCount: 100,
        createTime:"2023-12-27",
        suggestions: {}
    },
    {
        groupId:2,
        datasetname:"Cifar100",
        keywordCount:100,
        isProtected: false,
        source:"Local",
        assetCount: 300,
        createTime:"2023-12-27",
        suggestions: {}
       }
    ],
    total:2
}

const publicdatasets_test = [
    {
        id:1,
        name:"Tiny-Imagenet",
        keywordCount:200,
        source:"public",
        assetCount: 1000000,
        testCount: 10000,
        createTime:"2023-12-27",
        keywords:["goldfish",
            "tarantula",
            "strawberry",
            "oak tree",
            "banana",
            "flamingo",
            "house",
            "elephant",
            "espresso",
            "pizza"]
    },
    {
        id:2,
        name:"Cifar100",
        keywordCount:20,
        source:"public",
        assetCount: 50000,
        testCount: 10000,
        createTime:"2023-12-27",
        keywords:["goldfish",
            "tarantula",
            "strawberry",
            "oak tree",
            "banana",
            "flamingo",
            "house",
            "elephant",
            "espresso",
            "pizza"]
    },
    {
        id:3,
        name:"Cifar10",
        keywordCount:10,
        source:"public",
        assetCount: 50000,
        testCount: 10000,
        createTime:"2023-12-27",
        keywords:["goldfish",
            "tarantula",
            "strawberry",
            "oak tree",
            "banana",
            "flamingo",
            "house",
            "elephant",
            "espresso",
            "pizza"]
    },
    {
        id:4,
        name:"STL10",
        keywordCount:100,
        isProtected: false,
        source:"Local",
        assetCount: 5000,
        testCount: 8000,
        createTime:"2023-12-27",
        keywords:["goldfish",
            "tarantula",
            "strawberry",
            "oak tree",
            "banana",
            "flamingo",
            "house",
            "elephant",
            "espresso",
            "pizza"]
    },
    {
        id:5,
        name:"ImageNet-Dogs",
        keywordCount:15,
        isProtected: false,
        source:"Local",
        assetCount: 19500,
        testCount: 750,
        createTime:"2023-12-27",
        keywords:["goldfish",
            "tarantula",
            "strawberry",
            "oak tree",
            "banana",
            "flamingo",
            "house",
            "elephant",
            "espresso",
            "pizza"]
    },
]

const testversions = {
    
    1: [{
            groupId: 1,
            keywordCount: 100,
            isProtected: false,
            assetCount: 100,
            suggestions: {}
        }],
    2: [{
            groupId: 2,
            keywordCount: 100,
            isProtected: false,
            assetCount:300,
            suggestions: {}
        }]
    
}
const testquery: YParams.DatasetsQuery = {
    pid: 1,
    gid: 456,
    type: 'image',
    objectType: 1,
    state: 1,
    name: 'example',
    limit: 10,
    offset: 0,
    startTime: '2023-01-01',
    endTime: '2023-12-31',
    visible: true,
    desc: false,
    current: 1,
    orderBy: 'create_datetime',
    keywords: ['keyword1', 'keyword2'],
    excludeType: 2,
    empty: true,
    haveClasses: false,
  };
  
const datasetstate = async (req:Request,res:Response)=>{ 
    return res.json({ 
        code: 0, 
        msg:"success",
        data:{
           datasets:testdatasets,
           versions:testversions,
           query:testquery,
        } 
    });
}

const publicdataset = async (req:Request,res:Response)=>{ 
    return res.json({ 
        code: 0, 
        msg:"success",
        data:{
           items:publicdatasets_test,
           total:5
        } 
    });
}


export default {
    'POST /datasets/datasetstate':datasetstate,
    'GET /datasets/publicdataset':publicdataset,
}