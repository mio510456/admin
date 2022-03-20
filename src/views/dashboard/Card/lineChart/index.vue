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
          type: 'line',
          data: [39, 29, 12, 25,45,27,29,10,14],
          smooth: true, // 当为true时，就是光滑的曲线（默认为true）；当为false，就是折线不是曲线的了，那这个设为true，下面的（吃饭）数据中设置smooth为false，这个就不是光滑的曲线了。
          // 拐点的样式设置
          itemStyle: {
            opacity: 0
          },
          // 线条的颜色
          lineStyle: {
            color: "purple"
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple",   // 0%处的颜色
                },
                {
                  offset: 1,
                  color: "#fff"  // 100%的颜色
                }
              ],
              global: false, // 缺省为false
            }
          }
        }
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
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