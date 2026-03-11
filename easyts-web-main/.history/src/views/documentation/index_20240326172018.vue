<template>
    <div >
      <el-menu :router="true" :default-active="this.$route.path"
 active-text-color='#0000FF' mode="horizontal" >
  <el-menu-item index="/">流量预测</el-menu-item>
 
  <el-menu-item index="/documentation/index">质量预测</el-menu-item>
</el-menu>

      <el-row>
        <el-col :span="10" >
          <div style="display: flex; align-items: center; margin-top:20px;justify-content: center; font-size: 18px;">
    模型介绍
  </div>
          <el-card class="box-card" style="margin-top:20px;margin-left: 20px;width: 80%;height: 80%;">
  <div style="font-size: 16px; text-align: center;">
    AnaNET 专门针对多层级场景的时间序列预测进行开发，契合CDN平台的多层级架构。其设计了创新的频率分解模块和渐进分解架构可以将平台中涉及的复杂的流量，时延等时序数据进行渐进分解，使其变成独立的较为简单的子频率分量从而进行更加精准的时序依赖发现。AnaNET在多个流量、带宽数据集上领先于现有的先进算法。
  </div>
</el-card>
<el-card class="box-card" style="margin-top:20px;margin-left: 20px;width: 80%;height: 80%;">
  <div style="font-size: 16px; text-align: center;">
DynEformer 是一个完整的端到端框架，可为多租户边缘云平台的所有动态行为提供统一的工作负载预测。其建立在目前较为先进的Encoder-decoder模型Transformer之上的，我们为其设计了全新的GP Encoder和SA Layer来将其适配到多租户边缘云平台的动态负载预测任务中。通过对全局负载模式和静态特征的捕获，DynEformer大大提升了对设备负载的预测准确度，并能够适应应用切换和新应用加入等动态场景。
  </div>
</el-card>
<el-card class="box-card" style="margin-top:20px;margin-left: 20px;width: 80%;height: 80%;">
  <div style="font-size: 16px; text-align: center;">
    QM-RGNN是一个新型QoS预测框架，它利用图卷积网络（GCN）和多层感知机（MLP）构成的编码器-解码器模型QM-GNN，将QoS数据作为图输入进行高效预测。该框架通过引入残差模块处理QoS数据的稀疏性和波动性，采用动态自适应采样比例降低采样成本，并设计在线学习模式以减少持续训练成本。在实际应用中，QM-RGNN显著提升了QoS预测的精确度，实现了显著的均方根误差（RMSE）降低和训练及采样成本的大幅度降低。  </div>
</el-card>
        </el-col>
        <!-- <el-col :span="3" :offset="1">
          <div>
            <el-select v-model="value" placeholder="请选择节点" @change="getDepartData">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col> -->
        <el-col :span="14">

        <el-col :span="6" :offset="1">
          <div style="display: flex; align-items: center;margin-top:20px">
            <span>业务:</span>
            <el-select v-model="dataset" placeholder="业务选择" @change="getDataset">
              <el-option v-for="item in datasetOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6" :offset="1">
          <div style="display: flex; align-items: center;">
            <span>预测时间:</span>
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
          <el-divider>平均丢包率预测结果</el-divider>
          <div v-if="showComponent" :is="showComponentDrop"> </div>
          <el-divider>时延预测结果</el-divider>
          <div v-if="showComponent" :is="showComponentTimeDelay"> </div>
      <el-divider />
        </el-col>
      </el-col>

      </el-row>

      <!-- <div  v-if="showtable" style="text-align:right;">

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
      </div> -->
      
    </div>
  </template>
  <script>
  import tieta_kuaishou_delay_1 from '../qualityComponent/tieta_kuaishou_delay_1.vue';
  import tieta_kuaishou_delay_7 from '../qualityComponent/tieta_kuaishou_delay_7.vue';
  import tieta_kuaishou_delay_14 from '../qualityComponent/tieta_kuaishou_delay_14.vue';
  import tieta_dianbo_delay_1 from '../qualityComponent/tieta_dianbo_delay_1.vue';
  import tieta_dianbo_delay_7 from '../qualityComponent/tieta_dianbo_delay_7.vue';
  import tieta_dianbo_delay_14 from '../qualityComponent/tieta_dianbo_delay_14.vue';

  
  export default {
    components:{
      tieta_kuaishou_delay_1,
      tieta_kuaishou_delay_7,
      tieta_kuaishou_delay_14,
      tieta_dianbo_delay_1,
      tieta_dianbo_delay_7,
      tieta_dianbo_delay_14,  
    },
    data() {
      return {
        showtable:false,

        showComponent:false,
        showComponentDrop : false,
     showComponentTimeDelay : false,
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
        
        ],
        datasetOptions:[
  {value:'dianbo',
  label:'点播业务'
  },
  {
    value:'kuaishou',
    label:'直播业务',
  },
  
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
    //  this.showComponent = 'EmbeddedPage1_bak'; 
    //  this.showComponentDrop = 'EmbeddedPage1_bak';
    //  this.showComponentTimeDelay = 'EmbeddedPage1_bak';}
    //   else if (this.htmlvalue === 'MD_maun') { 
    //     // 调用 EmbeddedPage2 组件 
    //     this.showComponent = 'EmbeddedPage2_bak'; 
    //     this.showComponentDrop = 'EmbeddedPage2_bak';
    //  this.showComponentTimeDelay = 'EmbeddedPage2_bak';}

  
    //   },
     
      onClick() {
        this.showtable=true
  // 根据选择的值调用不同的组件 
  if (this.model === 'day' ) {
    if(this.dataset ==='dianbo'){
      this.showComponent = 'tieta_dianbo_delay_1'; 
     this.showComponentDrop = 'tieta_dianbo_delay_1';
     this.showComponentTimeDelay = 'tieta_dianbo_delay_1';} 
    
      else{ 
        // 调用 EmbeddedPage2 组件 
        this.showComponent = 'tieta_kuaishou_delay_1'; 
     this.showComponentDrop = 'tieta_kuaishou_delay_1';
     this.showComponentTimeDelay = 'tieta_kuaishou_delay_1';
    } 
  }
  else if (this.model === 'week' ) {
    if(this.dataset ==='dianbo'){
      this.showComponent = 'tieta_dianbo_delay_7'; 
     this.showComponentDrop = 'tieta_dianbo_delay_7';
     this.showComponentTimeDelay = 'tieta_dianbo_delay_7';} 
    
      else{ 
        // 调用 EmbeddedPage2 组件 
        this.showComponent = 'tieta_kuaishou_delay_7'; 
     this.showComponentDrop = 'tieta_kuaishou_delay_7';
     this.showComponentTimeDelay = 'tieta_kuaishou_delay_7';
    } 
  }
  else if (this.model === 'twoweek' ) {
    if(this.dataset ==='dianbo'){
      this.showComponent = 'tieta_dianbo_delay_14'; 
     this.showComponentDrop = 'tieta_dianbo_delay_14';
     this.showComponentTimeDelay = 'tieta_dianbo_delay_14';} 
    
      else{ 
        // 调用 EmbeddedPage2 组件 
        this.showComponent = 'tieta_kuaishou_delay_14'; 
     this.showComponentDrop = 'tieta_kuaishou_delay_14';
     this.showComponentTimeDelay = 'tieta_kuaishou_delay_14';
    } 
  }
    }
     
      }
      
    
    
  };
  
  </script>
