<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: '',
  mounted() {
    let lineCharts = echarts.init(this.$refs.charts)
    lineCharts.setOption({
      xAxis: {
        // 隐藏x抽
        show: false,
        // 均分
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'bar',
          data: [20, 17, 33, 12, 45,37,42,55,58,29,10,44],
        }
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      tooltip:{}
    })
  }
}

</script>

<style scoped>
  .charts {
    width: 100%;
    height: 100%;
  }
</style>