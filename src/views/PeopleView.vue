<template>
  <el-card style="width: 100%;height: 100%;">
    <div>
      <div style="display: flex;justify-content: space-between">
        <div>
          <el-form :inline="true" :model="form">
            <el-form-item label="人员ID:">
              <el-input v-model="form.id" style="width: 120px;"/>
            </el-form-item>
            <el-form-item label="姓名:">
              <el-input v-model="form.name" style="width: 120px;"/>
            </el-form-item>
            <el-form-item label="工号:">
              <el-input v-model="form.number" style="width: 120px;"/>
            </el-form-item>
            <el-form-item label="照片:">
              <el-select v-model="form.image" placeholder="全部" size="default" style="width: 120px">
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
            <el-table-column prop="id" label="人员ID" width="150"/>
            <el-table-column prop="name" label="姓名" width="150"/>
            <el-table-column prop="gender" label="性别" width="130"/>
            <el-table-column prop="unit" label="单位" width="200"/>
            <el-table-column prop="number" label="工号" width="120"/>
            <el-table-column prop="image" label="人脸照片" width="100"/>
            <el-table-column prop="operate" label="操作">
              <template #default>
                <el-button type="success" size="small">修改</el-button>
                <el-button type="primary" size="small">重置密码</el-button>
                <el-button type="danger" size="small">删除</el-button>
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
  id:'',
  name:'',
  number:'',
  image:'',
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
  id:1001,
  name: 'leo',
  gender: '男',
  unit:'长沙理工大学',
  number: 1110002,
  image:'未校验',
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