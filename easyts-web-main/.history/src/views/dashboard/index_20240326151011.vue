<template>
    <div >

  <el-menu :router="true" :default-active="this.$route.path" active-text-color='#0000FF' mode="horizontal" >
  <el-menu-item index="/dashboard">流量预测</el-menu-item>
 
  <el-menu-item index="/documentation/index">质量预测</el-menu-item>
</el-menu>

      <el-row>
  
        <!-- <el-col :span="3" :offset="1">
          <div>
            <el-select v-model="value" placeholder="请选择节点" @change="getDepartData">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col> -->
        <el-col :span="12" >
          <div style="display: flex; align-items: center;">
    模型介绍
  </div>
          <el-card class="box-card" style="margin-top:20px;width: 80%;height: 80%;">
  <div >
    AnaNET 专门针对多层级场景的时间序列预测进行开发，契合CDN平台的多层级架构。其设计了创新的频率分解模块和渐进分解架构可以将平台中涉及的复杂的流量，时延等时序数据进行渐进分解，使其变成独立的较为简单的子频率分量从而进行更加精准的时序依赖发现。AnaNET在多个流量、带宽数据集上领先于现有的先进算法。
  </div>
</el-card>
<el-card class="box-card" style="margin-top:20px;width: 80%;height: 80%;">
  <div >
DynEformer 是一个完整的端到端框架，可为多租户边缘云平台的所有动态行为提供统一的工作负载预测。其建立在目前较为先进的Encoder-decoder模型Transformer之上的，我们为其设计了全新的GP Encoder和SA Layer来将其适配到多租户边缘云平台的动态负载预测任务中。通过对全局负载模式和静态特征的捕获，DynEformer大大提升了对设备负载的预测准确度，并能够适应应用切换和新应用加入等动态场景。
  </div>
</el-card>
        </el-col>
        <el-col :span="12">
        <el-col :span="3" :offset="1">
          <div style="display: flex; align-items: center;">
           
            <span style="display: inline-block;">业务:</span>
            <el-select v-model="dataset" placeholder="业务选择"  >
              <el-option v-for="item in datasetOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="3" :offset="1">
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
        
          <div v-if="showComponent" :is="showComponent">
  </div>
      
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
    </el-col>
    </el-row>
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
  label:'点播业务'
  },
  {
    value:'kuaishou',
    label:'直播业务',
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
