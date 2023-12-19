<template>
  <div class="centerRight2">
    <div class="bg-color-black">
        <div class="d-flex pt-2 pl-2">
            <span>
                <i class="iconfont icon-vector"></i>
            </span>
            <div class="d-flex">
                <span class="text mx-2">任务完成排行榜</span>
            </div>
        </div>
        <div class="d-flex mt-1 jc-center body-box">
            <dv-scroll-board class="dv-scr-board" :config="config" />
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
    setup() {
        const config = reactive({
            header: ['组件', '分支', '覆盖率'],//表头数据
            data: [//表数据
                ['组件1', 'dev-1', '<span class=colorGrass>↑75%</span>'],
                ['组件2', 'dev-2', "<span  class='colorRed'>↓33%</span>"],
                ['组件3', 'dev-3', "<span  class='colorGrass'>↑100%</span>"],
                ['组件4', 'rea-1', "<span  class='colorGrass'>↑94%</span>"],
                ['组件5', 'rea-2', "<span  class='colorGrass'>↑95%</span>"],
                ['组件6', 'fix-2', "<span  class='colorGrass'>↑63%</span>"],
                ['组件7', 'fix-4', "<span  class='colorGrass'>↑84%</span>"],
                ['组件8', 'fix-7', "<span  class='colorRed'>↓46%</span>"],
                ['组件9', 'dev-2', "<span  class='colorRed'>↓13%</span>"],
                ['组件10', 'dev-9', "<span  class='colorGrass'>↑76%</span>"]
            ],
            rowNum: 7,//表行数
            headerHeight: 35,//表头高度
            headerBGC: '#0f1325',//表头背景色
            oddRowBGC: '#0f1325',//奇数行背景色
            evenRowBGC: '#171c33',//偶数行背景色
            index: true,//显示行号
            columnWidth: [50],//列宽度
            align:['center'],//列对齐方式
        });
        return {
            config
        }
    }
    
}
</script>

<style lang="scss" scoped>
$box-height:410px;
$box-width:300px;
.centerRight2 {
    padding: 16px;
    padding-top: 20px;
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
    .body-box {
        border-radius: 10px;
        overflow: hidden;
        .dv-scr-board {
            width: 270px;
            height: 340px;
        }
    }
}
</style>