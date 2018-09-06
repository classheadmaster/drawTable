<template>
  <div>
  <el-pagination
    layout="prev, pager, next"
    :page-size="10"
    :total="390"
    @current-change="changePage"
    >
  </el-pagination>
  <el-table
    :data="tableData"
    style="width: 100%"
    stripe
    border
  >

    <el-table-column
      prop="name"
      label="名称"
      width="370">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
    <el-table-column
      prop="location.lng"
      label="经度"
      width="180">
    </el-table-column>
    <el-table-column
      prop="location.lat"
      label="纬度"
      width="180">
    </el-table-column>
  </el-table>
  <!-- <span>{{tableData}}</span> -->
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data(){
    return {
      // tableData:undefined,
      tableData: undefined
    }
  },
  mounted() {
  this.getData(1)
  },
  methods:{
    getData(page){
      $.ajax({
      url:'http://api.map.baidu.com/place/v2/search?query=ATM机&tag=银行&region=北京&output=json&ak=xw02YZmi4RNztbC12FElxu8Q&page_num='+page,
      dataType: "jsonp",
      jsonp: "callback",
      type: 'GET',
      success: res=>{
        this.tableData=res.results
        }
      })
    },
    changePage(e){
      this.getData(e)
    }
  }
}
</script>

<style>

</style>
