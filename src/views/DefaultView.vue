<template>
  <div style="width: 100%;display: flex ">
    <div style="flex: 3">
      <div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="事件类型:">
            <el-select v-model="form.event" placeholder="全部" size="small" style="width: 90px">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="报警源:">
            <el-select v-model="form.source" placeholder="全部" size="small" style="width: 90px">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="报警状态:">
            <el-select v-model="form.status" placeholder="全部" size="small" style="width: 90px">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="起止日期:">
            <el-date-picker
                style="width:205px"
                v-model="form.date"
                type="daterange"
                range-separator="至"
                start-placeholder="Start date"
                end-placeholder="End date"
                :size="'small'"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="small">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-scrollbar>
          <el-table v-loading="loading" :data="tableData" border style="width: 100%"
                    :cell-style="{ textAlign: 'center' }"
                    :header-cell-style="{ 'text-align': 'center','backgroundColor':'aliceblue','color':'#666'}">
            <el-table-column prop="num" label="序号" width="80" />
            <el-table-column prop="event" label="事件类型" width="200" />
            <el-table-column prop="time" label="报警时间" width="200" />
            <el-table-column prop="source" label="报警源" width="130"/>
            <el-table-column prop="status" label="报警状态" width="120"/>
            <el-table-column prop="value" label="辐射值" width="120"/>
            <el-table-column prop="operate" label="操作">
              <template #default>
                <el-button type="text">详情</el-button>
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
    <div style="flex: 1">
      <div style="background: #8ca7f1">
        <el-text size="large" style="font-weight: bold;padding-left: 5px">原始检测图片</el-text>
      </div>
      <div style="padding: 5px">
        <el-image style="width: 100%;height: 100%" :src="url" :fit="'contain'" />
      </div>
      <div style="background: #8ca7f1">
        <el-text size="large" style="font-weight: bold;padding-left: 5px">人脸抓拍图片</el-text>
      </div>
      <div>
        <el-text style="padding-left: 5px" size="default">人脸抓拍图片（<span style="color: #409eff">{{number}}</span>张）</el-text>
      </div>
      <div style="padding: 5px">
        <el-carousel indicator-position="none">
          <el-carousel-item v-for="item in image" :key="item">
            <el-image style="width: 100%" :src="item" :fit="'contain'"/>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {computed, reactive, ref, toRefs} from "vue";

const url = 'https://img2.imgtp.com/2024/03/25/MPkL235g.png'
const loading = ref(false)
const number = ref(5)
const form = reactive({
  event:'',
  source:'',
  status:'',
  date: '',
})

// const tableData = [
//   {
//     num: '1',
//     event:'区域入侵',
//     time:'2023-11-08 15:00:02',
//     source:'辐射探伤设备1',
//     status:'未确认',
//     value:'-',
//     operate:'详情',
//   }
// ]
const item = {
      num: 1,
      event:'区域入侵',
      time:'2023-11-08 15:00:02',
      source:'辐射探伤设备1',
      status:'未确认',
      value:'-',
}
const Data = ref(Array.from({ length: 20 }, (_, index) => ({ ...item, num: index + 1 })));

const state = reactive({
  currentPage:1,
  pageSize:5,
  Total:20,
  // tableData:[],
})

const {currentPage,pageSize,Total} = toRefs(state)
const onSubmit = () => {
  console.log('submit!')
  alert('submit')
}

// 计算当前页应该显示的数据
const tableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return Data.value.slice(start, end);
});
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  state.pageSize = val;
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  state.currentPage = val;
}

const item_img = 'https://img2.imgtp.com/2024/03/25/BPXzWgS2.png'
const image = ref(Array.from({length:5}).fill(item_img))
</script>

<style scoped lang="scss">


</style>