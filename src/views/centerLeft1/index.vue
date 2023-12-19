<template>
  <div class="centerLeft1">
    <div class="bg-color-black">
        <div class="d-flex pt-2 pl-2">
            <span>
                <i class="iconfont icon-tongji4" />
            </span>
            <div class="d-flex">
                <span class="text mx-2">任务通过率</span>
                <dv-decoration-1 class="dv-dec-3" />
            </div>
        </div>
        <div class="d-flex jc-center">
            <chart />
        </div>
        <div class="bottom-data">
            <div class="item-box mt-2"
            v-for="(item,index) in numberData"
            :key="index">
                <div class="d-flex jc-end">
                    <i class="iconfont" :class="[iconFont[index]]"></i>
                    <!-- 数据翻牌器 -->
                    <dv-digital-flop class="dv-digital-flop" :config="item.config" />
                </div>
                <p>
                    <span>{{ item.text }}</span>
                    <span class="colorYellow">(件)</span>
                </p>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive } from "vue";
import Chart from './chart/index'
export default defineComponent({
    components: {
        Chart
    },
    setup() {
        //数据
        const dataArr = [
            {
                number: 150,
                text: '今日构建总量'
            },
            {
                number: 144,
                text: '总共完成数量'
            },
            {
                number: 361,
                text: '正在编译数量'
            },
            {
                number: 571,
                text: '未通过数量'
            }
        ];
        //图标
        const iconFont = [
            'icon-diagnose',
            'icon-monitoring',
            'icon-cloudupload',
            'icon-clouddownload'
        ];
        const numberData = reactive([]);
        let intervalInstance = null;
        onMounted(() => {
            setData()
            changeTiming()
        });
        const setData = () => {//设置numberData,添加了config和text
            dataArr.forEach((e) => {
                numberData.push({
                    config: {
                        number: [e.number],
                        toFixed: 1,
                        content: '{nt}',
                        style: {
                            fontSize:24
                        }
                    },
                    text:e.text
                })
            })
        }
        const changeTiming = () => {//定时
            intervalInstance = setInterval(() => {
                changeNumber()
            },2000)
        }

        const changeNumber = () => {
            numberData.forEach((item, index) => {
                item.config.number[0] += ++index;//number每次加上index+1
                item.config = { ...item.config };//重新赋值给config
            })
        }
        onUnmounted(() => {
            clearInterval(intervalInstance);
        })
        return {
            numberData,iconFont
        }
    }
})
</script>

<style lang="scss" scoped>
$box-width:300px;
$box-height:410px;
.centerLeft1{
    padding: 16px;
    height: $box-height;
    width: $box-width;
    border-radius: 10px;
    .bg-color-black {
        height: $box-height - 30px;
        border-radius: 10px;
    }
    .text {
        color:#c3cbde;
    }
    .dv-dec-3 {
        position: relative;
        width: 100px;
        height: 30px;
        top: -3px;
    }
    .bottom-data {
        .item-box {
            & > div{
                padding-right: 5px;
            }
            font-size: 14px;
            float: right;
            position: relative;
            width: 50%;
            color: #d3d6dd;
            .dv-digital-flop{
                width: 120px;
                height: 30px;
            }
            i{
                font-size: 20px;
                line-height: 30px;
                margin-left: 20px;
            }
            .colorYellow{
                color:yellowgreen;
            }
            p{
                text-align: center;
            }
        }
    }
}

</style>