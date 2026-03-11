<template>
  <div>
<el-row>
  <el-col>
    <el-select v-model="value" placeholder="请选择节点">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">{{ label }}
    </el-option>
  </el-select>
  </el-col>
  <el-col>
    <div>

    </div>
    </el-col>
      <el-col :span="6" :offset="3">
        <div>
        <el-button type="primary" @click="onClick" >预测</el-button>
<div v-if="showComponent">
<EmbeddedPage />

</div>
     </div>
      </el-col>

    </el-row>
    <br>

    <div style="text-align:right;">
      <el-table :data="tableData"  style="text-align:right;" stripe >
        <el-table-column prop="mse" label="整体MSE" width="180">
        </el-table-column>
        <el-table-column prop="mae" label="整体MAE" width="180">
        </el-table-column>
        <el-table-column prop="mape" label="整体MAPE" width="180">
        </el-table-column>
        <el-table-column prop="update" label="模型更新时间" width="180">
        </el-table-column>
      </el-table></div>
  </div>
</template>
<script>
import EmbeddedPage from '../EmbeddedPage.vue';
export default {
  components:{
EmbeddedPage
  },
  data() {
    return {
      showComponent:false,

      options: [{
          value: '选项1',
          label: 'Node1'
        }, {
          value: '选项2',
          label: ' Node2'
        }, {
          value: '选项3',
          label: 'Node3'
        }, {
          value: '选项4',
          label: 'Node4'
        }, {
          value: '选项5',
          label: 'Node5'
        }],
        value8: '',
      tableData: [{
        mse: '',
        mae: '',
        mape: '',
        update: ''
      }],
    }
  },
  methods: {
    onClick() {
        //预测按钮和时间方法
        this.showComponent = true;    
  },
    // vue获取iframe传递过来的信息



}
}

</script>
