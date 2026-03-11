<template>
    <div >
      <!-- <el-breadcrumb separator="/" style="text-align: center;margin-top: 20px;">
    <el-breadcrumb-item :to="{ path: '/' }">流量预测</el-breadcrumb-item>
    <el-breadcrumb-item
    :to="{ path: '/documentation/index' }">质量预测</el-breadcrumb-item>

  </el-breadcrumb> -->
  <el-menu :router="true" :default-active="this.$route.path" active-text-color='#0000FF' mode="horizontal" >
  <el-menu-item index="/dashboard">流量预测</el-menu-item>
 
  <el-menu-item index="/documentation/index">质量预测</el-menu-item>
</el-menu>
      <el-divider>
      </el-divider>
      <el-row>
        <!-- <el-col :span="3" :offset="1">
          <div>
            <el-select v-model="value" placeholder="请选择节点" @change="getDepartData">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col> -->
        <el-col :span="6" :offset="1">
          <div style="display: flex; align-items: center;">
           
            <span style="display: inline-block;">业务:</span>
            <el-select v-model="dataset" placeholder="业务选择"  >
              <el-option v-for="item in datasetOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6" :offset="1">
          <div style="display: flex; align-items: center;">
            
            <span style="display: inline-block;">预测时间:</span>
       
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
          <div v-if="showComponent" :is="showComponent">
  </div>
        </el-col>
      </el-row>
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
  // import EmbeddedPage1_bak from '../EmbeddedPage1_bak.vue';
  // import EmbeddedPage2_bak from '../EmbeddedPage2_bak.vue';
  // import EmbeddedPage3_bak from '../EmbeddedPage3_bak.vue';
  // import EmbeddedPage4_bak from '../EmbeddedPage4_bak.vue';
  // import EmbeddedPage5_bak from '../EmbeddedPage5_bak.vue';
  import tieta_ecdn_1 from '../tieta_ecdn_1.vue';
  import tieta_ecdn_7 from '../tieta_ecdn_7.vue';
  import tieta_ecdn_14 from '../tieta_ecdn_14.vue';
  import tieta_kuaishou_1 from '../tieta_kuaishou_1.vue';
  import tieta_kuaishou_7 from '../tieta_kuaishou_7.vue';
  import tieta_kuaishou_14 from '../tieta_kuaishou_14.vue';

  export default {
    components:{
      tieta_ecdn_1,
      tieta_ecdn_7,
      tieta_ecdn_14,
      tieta_kuaishou_1,
      tieta_kuaishou_7,
      tieta_kuaishou_14,

  
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
  value:'day',
  label:'未来一天'
          },
          {
value:'week',
  label:'未来一周'  
          },
          {
            value:'twoweek',
  label:'未来两周'
          },
  //         {
  //           value:'month',
  // label:'未来一个月'
  //         }
        ],
        datasetOptions:[
  {value:'ecdn',
  label:'直播业务'
  },
  {
    value:'kuaishou',
    label:'点播业务',
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
    //   getDataset(){
    //     this.htmlvalue = this.dataset;
    //     console.log(this.htmlvalue)
    //     if (this.htmlvalue === 'ecdn') {
    //  // 调用 EmbeddedPage1 组件 
    //  this.showComponent = 'EmbeddedPage1_bak'; }
    //   else if (this.htmlvalue === 'kuaishou') { 
    //     // 调用 EmbeddedPage2 组件 
    //     this.showComponent = 'EmbeddedPage2_bak'; }
    //     //      else if (this.htmlvalue === 'MD_Office') { 
    //     // // 调用 EmbeddedPage3 组件 
    //     // this.showComponent = 'EmbeddedPage3_bak'; }
    //     //     else if (this.htmlvalue === 4) { 
    //     // // 调用 EmbeddedPage4 组件 
    //     // this.showComponent = 'EmbeddedPage4_bak'; }
    //     // else if (this.htmlvalue === 5) { 
    //     // // 调用 EmbeddedPage5 组件 
    //     // this.showComponent = 'EmbeddedPage5_bak'; }
  
    //   },
     
      onClick() {
        this.showtable=true
  // 根据选择的值调用不同的组件 
  if (this.model === 'day' ) {
    if(this.dataset ==='ecdn'){
      this.showComponent = 'tieta_ecdn_1'; }

      else{ 
        // 调用 EmbeddedPage2 组件 
        this.showComponent = 'tieta_kuaishou_1'; }
    }
    else if (this.model === 'twoweek') { 
        // 调用 EmbeddedPage2 组件 
        if(this.dataset ==='ecdn'){
      this.showComponent = 'tieta_ecdn_14'; }
      else{ 
        // 调用 EmbeddedPage2 组件 
        this.showComponent = 'tieta_kuaishou_14'; }
      }
      else if (this.model === 'week') { 
        // 调用 EmbeddedPage2 组件 
        if(this.dataset ==='ecdn'){
      this.showComponent = 'tieta_ecdn_7'; }
      else{ 
        // 调用 EmbeddedPage2 组件 
        this.showComponent = 'tieta_kuaishou_7'; }
      }
    },
  }
  };
  
  </script>
