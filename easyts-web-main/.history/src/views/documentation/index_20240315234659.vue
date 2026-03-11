<template>
    <div >
      <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/dashboard/index' }">流量预测</el-breadcrumb-item>
    <el-breadcrumb-item
    :to="{ path: '/documentation/index' }">质量预测</el-breadcrumb-item>

  </el-breadcrumb>
      <br>
      <br>
      <el-row>
        <!-- <el-col :span="3" :offset="1">
          <div>
            <el-select v-model="value" placeholder="请选择节点" @change="getDepartData">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col> -->
        <el-col :span="3" :offset="1">
          <div>
            <el-select v-model="dataset" placeholder="业务选择" @change="getDataset">
              <el-option v-for="item in datasetOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="3" :offset="1">
          <div>
            <el-select v-model="model" placeholder="预测时间" >
              <el-option v-for="item in modelOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-button type="primary" @click="onClick">预测</el-button>
        </el-col>
        <!-- <el-col :span="18">
          <div v-if="showComponent_bak" :is="showComponent_bak">
  </div>
        </el-col> -->
        <el-col :span="18">
            <!-- <el-text class="mx-1" type="primary">带宽预测结果</el-text>
            <el-text class="mx-1" type="primary">平均丢包率预测结果</el-text>
            <el-text class="mx-1" type="primary">时延预测结果</el-text> -->
            <el-divider>带宽预测结果</el-divider>
          <div v-if="showComponent" :is="showComponent"> </div>
        </el-col>
      </el-row>
      <el-divider>带宽预测结果</el-divider>
          <div v-if="showComponent" :is="showComponent"> </div>
      <el-divider />
      <div  v-if="showtable" style="text-align:right;">

        <el-table :data="tableData"  fstyle="text-align:right;" stripe>
          <el-table-column prop="mse" label="整体MSE" width="300">
          </el-table-column>
          <el-table-column prop="mae" label="整体MAE" width="300">
          </el-table-column>
          <el-table-column prop="mape" label="整体MAPE" width="300">
          </el-table-column>
          <el-table-column prop="update" label="模型更新时间" width="300">
          </el-table-column>
        </el-table>
      </div>
      
    </div>
  </template>
  <script>
  import EmbeddedPage1_bak from '../EmbeddedPage1_bak.vue';
  import EmbeddedPage2_bak from '../EmbeddedPage2_bak.vue';
  import EmbeddedPage3_bak from '../EmbeddedPage3_bak.vue';
  import EmbeddedPage4_bak from '../EmbeddedPage4_bak.vue';
  import EmbeddedPage5_bak from '../EmbeddedPage5_bak.vue';
  import EmbeddedPage1 from '../EmbeddedPage1.vue';
  import EmbeddedPage2 from '../EmbeddedPage2.vue';
  import EmbeddedPage3 from '../EmbeddedPage3.vue';
  import EmbeddedPage4 from '../EmbeddedPage4.vue';
  import EmbeddedPage5 from '../EmbeddedPage5.vue';
  export default {
    components:{
  EmbeddedPage1,
  EmbeddedPage2,
  EmbeddedPage3,
  EmbeddedPage4,
  EmbeddedPage5,
  EmbeddedPage1_bak,
  EmbeddedPage2_bak,
  EmbeddedPage3_bak,
  EmbeddedPage4_bak,
  EmbeddedPage5_bak,
  
    },
    data() {
      return {
        showtable:false,

        showComponent:false,
        // options: [{
        //   value: 1,
        //   label: 'Node1'
        // }, {
        //   value: 2,
        //   label: ' Node2'
        // }, {
        //   value: 3,
        //   label: 'Node3'
        // }, {
        //   value: 4,
        //   label: 'Node4'
        // }, {
        //   value: 5,
        //   label: 'Node5'
        // }],
        modelOptions:[
          {
  value:'AnaNET',
  label:'未来一天'
          },
          {
value:'MCD',
  label:'未来三天'  
          },
          {
            value:'Dyneformer',
  label:'未来一周'
          },
          {
            value:'Dyneformer',
  label:'未来一个月'
          }
        ],
        datasetOptions:[
  {value:'MD_food',
  label:'直播业务'
  },
  {
    value:'MD_maun',
    label:'点播业务',
  },
  {
    value:'MD_Office',
    label:'MD_Office',
  }
  ],
  
        //value: '',
        dataset:'',
        model:'',
        htmlvalue:'',
        modelValue:'',
        tableData: [{
          mse: '0.1',
          mae: '0.2',
          mape: '0.1',
          update: '2023/10/11'
        }],
      }
    },
    methods: {
      getDataset(){
        this.htmlvalue = this.dataset;
        console.log(this.htmlvalue)
        if (this.htmlvalue === 'MD_food') {
     // 调用 EmbeddedPage1 组件 
     this.showComponent = 'EmbeddedPage1_bak'; }
      else if (this.htmlvalue === 'MD_maun') { 
        // 调用 EmbeddedPage2 组件 
        this.showComponent = 'EmbeddedPage2_bak'; }
             else if (this.htmlvalue === 'MD_Office') { 
        // 调用 EmbeddedPage3 组件 
        this.showComponent = 'EmbeddedPage3_bak'; }
        //     else if (this.htmlvalue === 4) { 
        // // 调用 EmbeddedPage4 组件 
        // this.showComponent = 'EmbeddedPage4_bak'; }
        // else if (this.htmlvalue === 5) { 
        // // 调用 EmbeddedPage5 组件 
        // this.showComponent = 'EmbeddedPage5_bak'; }
  
      },
     
      onClick() {
        this.showtable=true
  // 根据选择的值调用不同的组件 
  if (this.model === 'AnaNET') {
     // 调用 EmbeddedPage1 组件 
     this.showComponent = 'EmbeddedPage1'; }
      else if (this.model === 'MCD') { 
        // 调用 EmbeddedPage2 组件 
        this.showComponent = 'EmbeddedPage2'; }
             else if (this.model === 'Dyneformer') { 
        // 调用 EmbeddedPage2 组件 
        this.showComponent = 'EmbeddedPage3'; }
      //       else if (this.htmlvalue === 4) { 
      //   // 调用 EmbeddedPage2 组件 
      //   this.showComponent = 'EmbeddedPage4'; }
      //   else if (this.htmlvalue === 5) { 
      //   // 调用 EmbeddedPage2 组件 
      //   this.showComponent = 'EmbeddedPage5'; }
      }
      
    },
    
  };
  
  </script>
  