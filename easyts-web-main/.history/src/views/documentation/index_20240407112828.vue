<template>
    <div >
      <el-menu :router="true" :default-active="this.$route.path"
 active-text-color='#2E5BFF' mode="horizontal" style="font-size: 14px;">
  <el-menu-item index="/">流量预测</el-menu-item>
 
  <el-menu-item index="/documentation/index">质量预测</el-menu-item>
</el-menu>

      <el-row>
        <el-col :span="8" >
          <div style="display: flex; align-items: center; margin-top:20px;margin-right: 40px;justify-content: center; font-size: 18px;">
    模型介绍
  </div>
          <el-card class="box-card" style="margin-top:20px;margin-left: 20px;width: 80%;height: 80%;">
  <div style="font-size: 14px; text-align: center;">
    AnaNET 专门针对多层级场景的时间序列预测进行开发，契合CDN平台的多层级架构。其设计了创新的频率分解模块和渐进分解架构可以将平台中涉及的复杂的流量，时延等时序数据进行渐进分解，使其变成独立的较为简单的子频率分量从而进行更加精准的时序依赖发现。AnaNET在多个流量、带宽数据集上领先于现有的先进算法。
  </div>
</el-card>
<el-card class="box-card" style="margin-top:20px;margin-left: 20px;width: 80%;height: 80%;">
  <div style="font-size: 14px; text-align: center;">
DynEformer 是一个完整的端到端框架，可为多租户边缘云平台的所有动态行为提供统一的工作负载预测。其建立在目前较为先进的Encoder-decoder模型Transformer之上的，我们为其设计了全新的GP Encoder和SA Layer来将其适配到多租户边缘云平台的动态负载预测任务中。通过对全局负载模式和静态特征的捕获，DynEformer大大提升了对设备负载的预测准确度，并能够适应应用切换和新应用加入等动态场景。
  </div>
</el-card>
<el-card class="box-card" style="margin-top:20px;margin-left: 20px;width: 80%;height: 80%;">
  <div style="font-size: 14px; text-align: center;">
    QM-RGNN是一个新型QoS预测框架，它利用图卷积网络（GCN）和多层感知机（MLP）构成的编码器-解码器模型QM-GNN，将QoS数据作为图输入进行高效预测。该框架通过引入残差模块处理QoS数据的稀疏性和波动性，采用动态自适应采样比例降低采样成本，并设计在线学习模式以减少持续训练成本。在实际应用中，QM-RGNN显著提升了QoS预测的精确度，实现了显著的均方根误差（RMSE）降低和训练及采样成本的大幅度降低。  </div>
</el-card>
        </el-col>
       
        <el-col :span="16">
        <el-col :span="8" :offset="4">
          <div style="display: flex; align-items: center;margin-top:20px">
            <!-- <span>预测时间:</span> -->
            <el-select v-model="predictday" placeholder="预测时间" >
              <el-option v-for="item in days" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4" >
          <el-button type="primary" @click="onClick" style="margin-top:20px;color:#2E5BFF">预测</el-button>
        </el-col> 
       
<div style="margin-top: 80px;font-size: 14px;">
            <div id="plotly-mps" style="margin-top: 80px;">
              <el-divider>带宽预测结果</el-divider>
</div>  
          <div id="plotly-diubao" style="margin-top: 80px;">
            <el-divider>平均丢包率预测结果</el-divider>
</div>  
          <div id="plotly-delay" style="margin-top: 80px;">
            <el-divider>时延预测结果</el-divider>
</div> 
        </div> 
      <el-divider />
        <!-- </el-col> -->
      </el-col>
      </el-row>    
    </div>
  </template>
  <script>
import Plotly from 'plotly.js-dist';
import axios from 'axios';
import * as d3 from 'd3-dsv';
  
  export default {
 
    data() {
      return {
        showtable:false,

        showComponent:false,
        showComponentDrop : false,
     showComponentTimeDelay : false,
        
        days:[
          {
  value:1,
  label:'未来一天'
          },
          {
value:7,
  label:'未来一周'  
          },
          {
            value:14,
  label:'未来两周'
          },
        
        ],

        predictday:'',
        tableData: [{
          mse: '0.1',
          mae: '0.2',
          mape: '0.1',
          update: '2023/10/11'
        }],
      }
    },
    methods: {
  
     
      onClick() {
        this.showtable=true
        axios.get('../static/KS_MPS_all_predictions.csv').then(res => {
var mpsData = d3.csvParse(res.data)
console.log(mpsData);
this.mpsplotGraph(mpsData,this.predictday);


    })
    axios.get('../static/KS_diubao_all_predictions.csv').then(res => {
var diubaoData = d3.csvParse(res.data)
console.log(diubaoData);
this.diubaoplotGraph(diubaoData,this.predictday);

    })
    axios.get('../static/delay_all_predictions.csv').then(res => {
var delayData = d3.csvParse(res.data)
console.log(delayData);

this.delayplotGraph(delayData,this.predictday);

    })
  },
    mpsplotGraph(csvData,predictday) {
      const currentDate= new Date();

      const timeSeries = csvData.map(row => row.Time);
      const gtValues = csvData.map(row => parseFloat(row.GT));
      const pdValues = csvData.map(row => parseFloat(row.PD));
let daysToPlot = 1;
if(predictday===7||predictday===14){
  daysToPlot=predictday
}
    // 计算过去14天和未来7天的日期范围
    const pastDate = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - 14); // 过去14天
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + daysToPlot); // 未来7天

    // 过滤时间序列数据，只保留过去14天和未来7天的数据
    const pastTimeSeries = timeSeries.filter(time => new Date(time) >= pastDate && new Date(time) < currentDate);
    const futureTimeSeries = timeSeries.filter(time => new Date(time) >= currentDate && new Date(time) <= futureDate);
    const pastGTValues = gtValues.slice(0, pastTimeSeries.length);
    const pastPDValues = pdValues.slice(0, pastTimeSeries.length);
    const futureGTValues = gtValues.slice(pastTimeSeries.length, pastTimeSeries.length + futureTimeSeries.length);
    const futurePDValues = pdValues.slice(pastTimeSeries.length, pastTimeSeries.length + futureTimeSeries.length);

      const data = [
      {
            x: pastTimeSeries, // 过去14天的时间序列
            y: pastGTValues, // 过去14天的真实流量
            mode: 'lines',
            name: '真实带宽',
            line: { width: 4 }
        },
        {
            x: futureTimeSeries, // 未来7天的时间序列
            y: futurePDValues, // 未来7天的预测流量
            mode: 'lines',
            name: '预测带宽',
            line: { width: 4, dash: 'dash' }
        }
      ];
     

      const layout = {
        title: { text: 'B站点播业务带宽预测', font: { size: 24 } },
        // xaxis: { title: '时间', titlefont: { size: 18 }, tickfont: { size: 16 } },
        yaxis: { title: '带宽（Mbps）', titlefont: { size: 18 }, tickfont: { size: 16 } },
        legend: { x: 1, y: 1, xanchor: 'auto', yanchor: 'auto', font: { size: 16 } }
      };
      layout.shapes = [
        {
            type: 'line',
            xref: 'x',
            yref: 'paper',
            x0: currentDate,
            y0: 0,
            x1: currentDate,
            y1: 1,
            line: {
                color: 'gray',
                dash: 'dash',
                width: 2
            }
        }
    ];

      Plotly.newPlot('plotly-mps', data, layout);
    },

    diubaoplotGraph(csvData,predictday) {
      const currentDate= new Date();

      const timeSeries = csvData.map(row => row.Time);
      const gtValues = csvData.map(row => parseFloat(row.GT));
      const pdValues = csvData.map(row => parseFloat(row.PD));
let daysToPlot = 1;
if(predictday===7||predictday===14){
  daysToPlot=predictday
}
          // 计算过去14天和未来7天的日期范围
    const pastDate = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - 14); // 过去14天
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + daysToPlot); // 未来7天

    // 过滤时间序列数据，只保留过去14天和未来7天的数据
    const pastTimeSeries = timeSeries.filter(time => new Date(time) >= pastDate && new Date(time) < currentDate);
    const futureTimeSeries = timeSeries.filter(time => new Date(time) >= currentDate && new Date(time) <= futureDate);
    const pastGTValues = gtValues.slice(0, pastTimeSeries.length);
    const pastPDValues = pdValues.slice(0, pastTimeSeries.length);
    const futureGTValues = gtValues.slice(pastTimeSeries.length, pastTimeSeries.length + futureTimeSeries.length);
    const futurePDValues = pdValues.slice(pastTimeSeries.length, pastTimeSeries.length + futureTimeSeries.length);

      const data = [
      {
            x: pastTimeSeries, // 过去14天的时间序列
            y: pastGTValues, // 过去14天的真实流量
            mode: 'lines',
            name: '真实丢包率',
            line: { width: 4 }
        },
        {
            x: futureTimeSeries, // 未来7天的时间序列
            y: futurePDValues, // 未来7天的预测流量
            mode: 'lines',
            name: '预测丢包率',
            line: { width: 4, dash: 'dash' }
        }
      ];

      const layout = {
        title: { text: 'B站点播业务丢包率预测', font: { size: 24 } },
        // xaxis: { title: '时间', titlefont: { size: 18 }, tickfont: { size: 16 } },
        yaxis: { title: '丢包率（%）', titlefont: { size: 18 }, tickfont: { size: 16 } },
        legend: { x: 1, y: 1, xanchor: 'auto', yanchor: 'auto', font: { size: 16 } }
      };
      layout.shapes = [
        {
            type: 'line',
            xref: 'x',
            yref: 'paper',
            x0: currentDate,
            y0: 0,
            x1: currentDate,
            y1: 1,
            line: {
                color: 'gray',
                dash: 'dash',
                width: 2
            }
        }
    ];

      Plotly.newPlot('plotly-diubao', data, layout);
    },


    delayplotGraph(csvData,predictday) {
      const currentDate= new Date();

      const timeSeries = csvData.map(row => row.Time);
      const gtValues = csvData.map(row => parseFloat(row.GT));
      const pdValues = csvData.map(row => parseFloat(row.PD));
let daysToPlot = 1;
if(predictday===7||predictday===14){
  daysToPlot=predictday
}
          // 计算过去14天和未来7天的日期范围
    const pastDate = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - 14); // 过去14天
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + daysToPlot); // 未来7天

    // 过滤时间序列数据，只保留过去14天和未来7天的数据
    const pastTimeSeries = timeSeries.filter(time => new Date(time) >= pastDate && new Date(time) < currentDate);
    const futureTimeSeries = timeSeries.filter(time => new Date(time) >= currentDate && new Date(time) <= futureDate);
    const pastGTValues = gtValues.slice(0, pastTimeSeries.length);
    const pastPDValues = pdValues.slice(0, pastTimeSeries.length);
    const futureGTValues = gtValues.slice(pastTimeSeries.length, pastTimeSeries.length + futureTimeSeries.length);
    const futurePDValues = pdValues.slice(pastTimeSeries.length, pastTimeSeries.length + futureTimeSeries.length);

      const data = [
      {
            x: pastTimeSeries, // 过去14天的时间序列
            y: pastGTValues, // 过去14天的真实流量
            mode: 'lines',
            name: '真实时延',
            line: { width: 4 }
        },
        {
            x: futureTimeSeries, // 未来7天的时间序列
            y: futurePDValues, // 未来7天的预测流量
            mode: 'lines',
            name: '预测时延',
            line: { width: 4, dash: 'dash' }
        }
      ];

      const layout = {
        title: { text: 'B站点播业务时延预测', font: { size: 24 } },
        // xaxis: { title: '时间', titlefont: { size: 18 }, tickfont: { size: 16 } },
        yaxis: { title: '时延（ms）', titlefont: { size: 18 }, tickfont: { size: 16 } },
        legend: { x: 1, y: 1, xanchor: 'auto', yanchor: 'auto', font: { size: 16} }
      };
      layout.shapes = [
        {
            type: 'line',
            xref: 'x',
            yref: 'paper',
            x0: currentDate,
            y0: 0,
            x1: currentDate,
            y1: 1,
            line: {
                color: 'gray',
                dash: 'dash',
                width: 2
            }
        }
    ];

      Plotly.newPlot('plotly-delay', data, layout);
    }
      }
      
    
    
  
};
  
  </script>
