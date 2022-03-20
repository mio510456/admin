<template>
  <div>
    <el-card class="box-card" style="margin: 10px 0px">
      <div slot="header" class="clearfix">
        <!--  @tab-click="handleClick" -->
        <el-tabs class="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="销售额"></el-tab-pane>
          <el-tab-pane label="访问量" name="访问量"></el-tab-pane>
        </el-tabs>
        <div class="right">
          <span>今日</span>
          <span>本周</span>
          <span>本月</span>
          <span>本年</span>
          <el-date-picker 
            class="date"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束如期"
            size="mini"
            type="daterange">
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="16">123</el-col>
          <el-col :span="8">321</el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      activeName: "销售额"
    }
  }
}

</script>

<style scoped>
  .clearfix {
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .tab {
    width: 100%;
  }
  .right {
    position: absolute;
    right: 0;
  }
  .date {
    width: 200px;
    margin: 0px 20px;
  }
  .right span {
    margin: 0 10px;
  }
</style>