<template>
  <div>
  <el-col>
    <el-button type="primary" @click="addItem">增加</el-button>
    <el-input  style="width:200px" placeholder="查询内容(名称或地址)" v-model="searchItem"></el-input>
    <el-button type="danger" @click="searchData">查询</el-button>
  </el-col>
  <el-col style="height:20px;width:100%"></el-col>
  <el-table
    :data="tableData"
    style="width: 100%"
    height=300
    stripe
    border
  >
    <el-table-column
      prop="name"
      label="名称"
      width="200">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      min-width="200">
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
    <el-table-column
      lable="操作"
      width="150">
      <template slot-scope="scope">
        <el-button size="small" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
        <el-button type="danger" @click="delItem(scope.$index,scope.row)" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页部分 -->
  <el-pagination
    layout="prev, pager, next"
    :page-size="pageSize"
    :total="itemTotal"
    @current-change="changePage"
    >
  </el-pagination>
  <!-- <span>{{tableData}}</span> -->

  <!-- 新增界面 -->
  <el-dialog
  title="新增数据"
  :visible.sync="diaVisible"
  :close-on-click-modal="false">
        <el-form :model="editForm" label-width="100px"  ref="editForm">
          <el-form-item label="名称" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="editForm.address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="经度" prop="lng">
            <el-input v-model="editForm.location.lng" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="纬度" prop="lat">
            <el-input v-model="editForm.location.lat" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="diaVisible = false">取消</el-button>
            <el-button type="primary" @click.native="diaSubmit">提交</el-button>
          </div>
  </el-dialog>

  <el-dialog
  title="编辑数据"
  :visible.sync="editVisible"
  :close-on-click-modal="true">
    <el-form :model="editForm" label-width="100px"  ref="editForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="editForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="editForm.address" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="经度" prop="lng">
        <el-input v-model="editForm.location.lng" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="纬度" prop="lat">
        <el-input v-model="editForm.location.lat" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="editVisible = false">取消</el-button>
      <el-button type="primary" @click.native="editSubmit">提交</el-button>
    </div>
  </el-dialog>
  <!-- <span>{{tableData}}</span> -->
  </div>
</template>

<script>
import $ from 'jquery'
import mydata from '../js/data.js'

export default {
  data(){
    return {
      // tableData:undefined,
      tableData: undefined,
      total:undefined,
      diaVisible:false,
      editVisible:false,
      editForm:{
        name:'',
        address:'',
        location:{
          lat:'',
          lng:''
        }
      },
      pageSize:5,
      itemTotal:1,
      activePage:1,
      editIndex:undefined,
      searchItem:undefined
    }
  },
  mounted() {
    // this.getData(1)
    this.totalData=mydata
    this.tableData=this.totalData.slice(0,this.pageSize)
    this.itemTotal=this.totalData.length
  // console.log(mydata)
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
      // console.log('页数：'+e)
      let start=(e-1)*this.pageSize
      let end=e*this.pageSize
      this.tableData=this.totalData.slice(start,end)
      this.activePage=e
      this.itemTotal=this.totalData.length
    },
    addItem(){
      this.editFromInit()
      this.diaVisible=true
    },
    showEditDialog(index, row){
      console.log(row)
      this.editVisible=true
      this.editForm={
        name:row.name,
        address:row.address,
        location:{
          lng:row.location.lng,
          lat:row.location.lat
        }
      },
      this.editIndex=index
    },
    delItem(index,row){
      // console.log(index)
      // console.log(row)
      let listIndex=(this.activePage-1)*5+index
      this.totalData.splice(listIndex,1)
      this.changePage(this.activePage)
    },
    diaSubmit(){
      this.totalData.unshift(this.editForm)
      // this.itemTotal=this.totalData.length
      this.changePage(this.activePage)
      this.diaVisible=false
    },
    editFromInit(){
      this.editForm={
        name:'',
        address:'',
        location:{
          lat:'',
          lng:''
        }
      }
    },
    editSubmit(){
      let listIndex=(this.activePage-1)*5+this.editIndex
      this.totalData.splice(listIndex,1,this.editForm)
      this.tableData[this.editIndex]=this.editForm
      this.changePage(this.activePage)
      this.editVisible=false
    },
    searchData(){
      if(this.searchItem==''){
        this.totalData=mydata
      }else{
        var search=this.searchItem
        var searchList=this.totalData.filter(function(e){
          return e.name.indexOf(search)>-1||e.address.indexOf(search)>-1
        })
        this.totalData=searchList
      }
      this.changePage(this.activePage)
    }
  }
}
</script>

<style>

</style>
