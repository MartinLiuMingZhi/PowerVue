<template>
  <el-card style="width: 100%;height: 100%">
    <div>
      <div style="display: flex;flex-direction: row;">
        <div style="flex: 1;justify-content: flex-start ;display: flex">
          <el-form :inline="true" :model="form">
            <el-form-item label="账号：">
              <el-input v-model="form.account" style="width: 240px;padding-right: 10px" />
              <el-button type="primary" @click="onSearch" size="default">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="flex: 1;justify-content: flex-end;display: flex">
          <el-button type="primary" @click="onAdd" size="default">添加</el-button>
          <el-button type="primary" @click="onDelete" size="default">删除</el-button>
        </div>
      </div>
      <div>
        <el-scrollbar>
          <el-table v-loading="loading" :data="tableData" border style="width: 100%"
                    :cell-style="{ textAlign: 'center' }"
                    :header-cell-style="{ 'text-align': 'center','backgroundColor':'aliceblue','color':'#666'}">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="num" label="序号" width="100"/>
            <el-table-column prop="account" label="账号" width="150"/>
            <el-table-column prop="username" label="用户名" width="150"/>
            <el-table-column prop="role" label="角色" width="130"/>
            <el-table-column prop="createTime" label="创建时间" width="300"/>
            <el-table-column prop="operate" label="操作">
              <template #default>
                <el-button type="success" size="default">修改</el-button>
                <el-button type="primary" size="default">重置密码</el-button>
                <el-button type="danger" size="default">删除</el-button>
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
    </div>
  </el-card>
</template>

<script setup lang="ts">

import {computed, reactive, ref, toRefs} from "vue";

const loading = ref(false)

const form = reactive({
  account:'',
})

const onSearch = () =>{
  alert('已搜寻')
}

const onAdd = () => {
  alert('add')
}

const onDelete = () => {
  alert('delete')
}


const item = {
  num:1,
  account:'3108531642',
  username:'martin leo',
  role:'管理员',
  createTime:'2023-11-11 12:06:47',
}
const Data = ref(Array.from({ length: 20 }, (_, index) => ({ ...item, num: index + 1 })))

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