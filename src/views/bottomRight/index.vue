<template>
  <div class="bottomRight">
    <div class="bg-color-black">
        <div class="d-flex pt-2 pl-2">
            <span>
                <i class="iconfont icon-chart-area"></i>
            </span>
            <div class="d-flex">
                <span class="text mx-2 mt-1">数据统计图</span>
            </div>
        </div>
        <div>
            <chart />
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Chart from './chart/index'
export default defineComponent({
    components: {
        Chart,
    },
})
</script>

<style lang="scss" scoped>
$box-height:520px;
$box-width:100%;
.bottomRight {
    padding: 14px 16px;
    height: $box-height;
    width: $box-width;
    border-radius: 5px;
    .bg-color-black {
        height: $box-height -30px;
        border-radius: 10px;
    }
    .text {
        color: #c3cbde;
    }
    // .body-box {
    //     border-radius: 10px;
    //     overflow: hidden;
    //     .dv-cap-chart {
    //         width: 100%;
    //         height: 160px;
    //     }
    // }
}
</style>