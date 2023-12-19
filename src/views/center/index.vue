<template>
  <div class="center">
    <div class="up">
        <div class="bg-color-black item"
        v-for="item in titleItem"
        :key="item.title"
        >
            <p class="ml-3 colorBlue fw-b">{{ item.title }}</p>
            <div>
                <dv-digital-flop class="dv-dig-flop ml-1 mt-1 pl-3" :config="item.config"/>
            </div>
        </div>
    </div>
    <div class="down">
        <div class="ranking bg-color-black">
            <span>
                <i class="iconfont icon-tongji2"></i>
            </span>
            <span class="text mx-2 mb-1">年度负责人组件达标榜</span>
            <!-- 排名轮播表 -->
            <dv-scroll-ranking-board class="dv-scr-rank-board" :config="ranking"/>
        </div>
        <div class="percent">
            <div class="item bg-color-black">
                <span>今日任务通过率</span>
                <chart :tips="rate[0].tips"
                :colorObj="rate[0].colorData"/>
            </div>
            <div class="item bg-color-black">
                <span>今日任务达标率</span>
                <chart :tips="rate[1].tips"
                :colorObj="rate[1].colorData"/>
            </div>
            <div class="water">
                <dv-water-level-pond class="dv-wa-le-po" :config="water"/>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,onMounted } from "vue";
import Chart from '../center/chart/draw'

export default defineComponent({
    components: {
        Chart
    },
    setup() {
        const titleDate = [
            {
                number: 1020,
                text: '今年累计任务建次数'
            },
            {
                number: 18,
                text: '本月累计任务次数'
            },
            {
                number: 4,
                text: '今日累计任务次数'
            },
            {
                number: 71,
                text: '今年失败任务次数'
            },
            {
                number: 949,
                text: '今年失败成功次数'
            },
            {
                number: 811,
                text: '今年达标任务个数'
            },
        ];
        const titleItem = reactive([]);
        onMounted(() => {
            setData()
        });

        const ranking = reactive({
            data: [
                {
                    name: '周口',
                    value: 55
                },
                {
                    name: '南阳',
                    value: 120
                },
                {
                    name: '西峡',
                    value: 78
                },
                {
                    name: '驻马店',
                    value: 66
                },
                {
                    name: '新乡',
                    value: 80
                },
                {
                    name: '信阳',
                    value: 45
                },
                {
                    name: '漯河',
                    value: 29
                },
            ],
            carousel: 'single',//轮播方式
            unit:'人',//数值单位
        })
        const setData = () => {
            titleDate.map((e) => {
                titleItem.push({//dataV里面的数字翻牌器Config
                    title: e.text,
                    config: {
                        number: [e.number],
                        content: '{nt}',
                        toFixed: 1,
                        textAlign: 'left',
                        style: {
                            fontSize: 26
                        }
                    }
                })
            })
        };
        const water = reactive({
            data: [24, 45],//水位位置
            shape: 'roundRect',//水位图形状
            formatter: '{value}%',//信息格式化
            waveNum: 3,//波浪数量
        });
        const rate = reactive([
            {
                id: 'centerRate1',
                tips: 60,
                colorData: {
                    textStyle: '#3fc0fb',
                    series: {
                        color: ['#00bcd44a', 'transparent'],
                        dataColor: {
                            normal: '#03a9f4',
                            shadowColor: '#97e2f5'
                        }
                    }
                }
            },
            {
                id: 'centerRate2',
                tips: 40,
                colorData: {
                    textStyle: '#67e0e3',
                    series: {
                        color: ['#faf3a378', 'transparent'],
                        dataColor: {
                        normal: '#ff9800',
                        shadowColor: '#fcebad'
                        }
                    }
                }
            }
        ])
        return {
            titleItem,
            ranking,
            water,
            rate
        }
    }
})
</script>

<style lang="scss" scoped>
.center {
    display: flex;
    flex-direction: column;
    .up {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .item {
            border-radius: 6px;
            padding-top: 8px;
            margin-top: 8px;
            width: 32%;
            height: 70px;
            .dv-dig-flop {
                width: 150px;
                height: 30px;
            }
        }
    }
    .down {
        padding: 6px 4px;
        padding-bottom: 0;
        width: 100%;
        display: flex;
        height: 255px;
        justify-content: space-between;
        .bg-color-black {
            border-radius: 5px;
        }
        .ranking {
            padding: 10px;
            width: 59%;
            .dv-scr-rank-board {
                height: 220px;
            }
        }
        .percent {
            width: 40%;
            display: flex;
            flex-wrap: wrap;
            .item {
                width: 50%;
                height: 120px;
                span {
                    margin-top: 8px;
                    display: flex;
                    font-size: 14px;
                    justify-content: center;
                }
            }
            .water {
                width: 100%;
                .dv-wa-le-po {
                    height: 120px;
                }
            }
        }
    }
}
</style>