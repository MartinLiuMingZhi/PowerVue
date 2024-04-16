<template>
  <el-card style="width: 100%;height: 100%">
    <el-tabs v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane label="辐射探伤设备" name="first">
        <div style="display: flex;justify-content: space-between">
          <div>
            <el-form :inline="true" :model="form">
              <el-form-item label="设备名称:">
                <el-input v-model="form.name" style="width: 200px"/>
              </el-form-item>
              <el-form-item label="设备状态:">
                <el-select v-model="form.status" placeholder="全部" size="default" style="width: 200px">
                  <el-option label="Zone one" value="shanghai" />
                  <el-option label="Zone two" value="beijing" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="default">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div style="padding-right: 10px">
            <el-button type="primary" size="default">添加</el-button>
            <el-button type="primary" size="default">删除</el-button>
          </div>
        </div>
        <div>
          <el-scrollbar>
            <el-table v-loading="loading" :data="tableData" border style="width: 100%"
                      :cell-style="{ textAlign: 'center' }"
                      :header-cell-style="{ 'text-align': 'center','backgroundColor':'aliceblue','color':'#666'}">
              <el-table-column type="selection" width="55" />
              <el-table-column prop="num" label="序号" width="100"/>
              <el-table-column prop="name" label="设备名称" width="200"/>
              <el-table-column prop="parameters" label="设备参数" width="250"/>
              <el-table-column prop="status" label="设备状态" width="120"/>
              <el-table-column prop="region" label="所属探伤作业区域" width="200">
                <template #default="scope">
                  <div style="display: flex; align-items: center;justify-content: space-between">
                    <el-text style="padding-left: 40px">{{ scope.row.region }}</el-text>
                    <el-icon style="color:#409eff;"><Edit /></el-icon>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="operate" label="操作">
                <template #default>
                  <el-button type="success" size="small">修改</el-button>
                  <el-button type="danger" size="small">删除</el-button>
                  <el-button type="text" size="small">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
        </div>
        <br>
        <div style="display: flex;align-items: center;justify-content: center">
          <!--        Pagination 分页-->
          <el-pagination layout="total,sizes,prev,pager,next,jumper"
                         v-model::current-page="currentPage"
                         v-model::page-size="pageSize"
                         :page-sizes="[5,10,20,50]"
                         :default-page-size="5"
                         :total="Total"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="人脸抓拍机" name="second">

      </el-tab-pane>
      <el-tab-pane label="规格概览" name="third">

      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup lang="ts">
import {computed, reactive, ref, toRefs} from "vue";
import {Edit} from "@element-plus/icons-vue";

const loading = ref(false)
const activeName = ref('first')
const handleClick = (tab: string) => {
  console.log("Clicked tab:", tab);
};

const form = reactive({
  name:'',
  status:'',
})

const item = {
  num:1,
  name: '探伤设备1',
  parameters: 'IP:49.4.19.100,端口:8088',
  status:'在线',
  region: '区域名称1',
}
const Data = ref(Array.from({ length: 20 }, (_, index) => ({ ...item, num: index + 1})))

const state = reactive({
  currentPage:1,
  pageSize:5,
  Total:20,
  // tableData:[],
})

const {currentPage,pageSize,Total} = toRefs(state)

// 计算当前页应该显示的数据
const tableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return Data.value.slice(start, end);
});

// 处理每页条目数变化的函数
const handleSizeChange = (val: number) => {
  pageSize.value = val;
};

// 处理当前页变化的函数
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};

</script>

<style scoped lang="scss">

</style>