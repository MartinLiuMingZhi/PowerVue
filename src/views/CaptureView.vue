<template>
  <div>
    <el-card style="width: 100%;height: 100%">
      <el-tabs v-model="activeName"  @tab-click="handleClick">
        <el-tab-pane label="User" name="first">
          <div>
            <el-form :inline="true" :model="form" class="demo-form-inline">
              <el-form-item label="日期:">
              <el-date-picker
                  v-model="form.date"
                  type="date"
                  placeholder="Pick a day"
                  :size="'small'"
              />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" size="small">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="image-container">
            <div v-for="image in paginatedImages" :key="image.id" style="text-align: center">
              <img :src="image.url" alt="Image"  class="image">
              <el-text class="image-time">时间:{{image.img_time}}</el-text>
            </div>
            <div style="display: flex;flex-direction: row;justify-content: space-between;width: 100%;align-items: flex-start">
<!--              <div style="flex:1">-->
<!--                <el-text>抓拍记录数:{{total}}</el-text>-->
<!--              </div>-->
              <div style="flex: 1">
                <el-pagination
                    layout="total, sizes, prev, pager, next, jumper"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :total="images.length"
                    :page-sizes="[5,10,20]"
                    :default-page-size="10"
                    style="margin-top: 20px;text-align: center;"
                    :small="true"
                ></el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">

import {computed, onMounted, reactive, ref} from "vue";

const activeName = ref('first')

const form = reactive({
  date:''
})
const img = {id:1,url:'https://img2.imgtp.com/2024/03/25/V7qZJ6MW.png',img_time:'2024-03-25 19:49:59'}
const images = ref(Array.from({ length: 20 }, (_, index) => ({ ...img, id: index + 1 }))); // 复制单张图片示例，模拟多张图片数据
const pageSize = ref(10); // 每页显示的图片数量
const currentPage = ref(1); // 当前页码
const total = ref(0)
// const fetchImages = async () => {
//   try {
//     // 模拟从服务器端获取图片数据，实际项目中需替换为真实接口调用
//     const response = await axios.get("https://api.example.com/images");
//     images.value = response.data; // 假设返回的数据是一个包含图片信息的数组
//   } catch (error) {
//     console.error("Error fetching images:", error);
//   }
// };

const handleClick = (tab: string) => {
  console.log("Clicked tab:", tab);
};

const onSubmit = () => {
  console.log("submit!");
  alert("submit");
};

const paginatedImages = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return images.value.slice(startIndex, endIndex);
});

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  pageSize.value = val;
}
const handleCurrentChange = (page: number) => {
  currentPage.value = page;
};

// onMounted(() => {
//   fetchImages();
// });
</script>

<style scoped lang="scss">
.image-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px; /* 图片之间的水平和垂直间距 */
}

.image-item {
  width: 100%;
}

.image {
  width: 100%; /* 图片占据父容器的宽度 */
  height: auto; /* 图片高度自适应 */
  object-fit: cover; /* 图片保持比例填充 */
}

</style>