import { defineComponent,ref, shallowReactive, watch } from "vue";
import * as echarts from 'echarts';

const PropsType = {
    cdata: {
        type: Object,
        require: true
    }
} as const;//断言

export default defineComponent({
    props: PropsType,
    setup(props) {
        const chartRef=ref()
        // let options = shallowReactive({ tooltip:null,legend:null,grid:null,xAxis:null,yAxis:null, series:null});
        let options={}

        watch(//监听cdata
            () => props.cdata,//因为index里面返回的是一个函数，所以函数需要调用
            (val: any) => {//回调函数
                options = {
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        axisPointer: {//坐标轴指示器配置项
                            type: 'shadow',//阴影指示器
                            label: {//坐标轴指示器的文本标签
                                show: true,
                                backgroundColor:'#7B7DDC'
                            }
                        }
                    },
                    legend: {//图例组件
                        show:true,
                    },
                    grid: {//绘图网格
                        x: "8%",//??
                        width: '88%',//宽度
                        top: "5%",//离容器上侧的距离
                        bottom:"7%",//离容器下侧的距离
                    },
                    xAxis: {
                        data: val.category,
                        axisLine: {//坐标轴轴线相关设置
                            lineStyle: {
                                color:'#B4B4B4'
                            }
                        },
                        axisTick: {//坐标轴刻度相关设置
                            show:false
                        }
                    },
                    yAxis: [//两条坐标轴
                        {
                            splitLine: { show: false },//分隔线
                            axisLine: {
                                lineStyle: {
                                    color:'#B4B4B4',
                                }
                            },
                            axisLabel: {//坐标轴刻度标签的相关设置
                                formatter:"{value}"
                            }
                        },
                        {
                            splitLine: { show: false },//分隔线
                            axisLine: {
                                lineStyle: {
                                    color:'#B4B4B4',
                                }
                            },
                            axisLabel: {//坐标轴刻度标签的相关设置
                                formatter:"{value}"
                            }
                        }
                    ],
                    series: [
                        {
                            name: '贯通率',
                            type: 'line',//图表类型
                            smooth:true,//是否平滑曲线显示
                            data: val.rateData,
                            showAllSymbol:true,//只在主轴为类目轴（axis.type 为 'category'）时有效
                            symbol: "emptyCircle",//标记的图形
                            symbolSize: 8,//标记的大小
                            yAxisIndex: 1,//在单个图表实例中存在多个 y轴的时候有用
                            itemStyle: {//折线拐点标志的样式
                                normal: {//??
                                    color:'#F02FC2'
                                }
                            }
                        },
                        {
                            name: '已贯通',
                            type: 'bar',//图表类型
                            data: val.barData,
                            barWidth:10,//柱条的宽度
                            itemStyle: {//折线拐点标志的样式
                                normal: {//??
                                    barBorderRadius: 5,//??
                                    color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        { offset: 0, color: "#956FD4" },
                                        { offset: 1, color: "#3EACE5" }
                                      ])//??没看到这个api
                                }
                            }
                        },
                        {
                            name: '计划贯通',
                            type: 'bar',//图表类型
                            barGap:"-100%",//不同系列的柱间距离，此处为重叠
                            data: val.lineData,
                            barWidth:10,//柱条的宽度
                            itemStyle: {//折线拐点标志的样式
                                normal: {//??
                                    barBorderRadius:5,
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        { offset: 0, color: "rgba(156,107,211,0.8)" },
                                        { offset: 0.2, color: "rgba(156,107,211,0.5)" },
                                        { offset: 1, color: "rgba(156,107,211,0.2)" }
                                      ])
                                }
                            },
                            z:-12,
                        },
                    ],
                }
                if (chartRef.value) {// 手动触发更新
                    chartRef.value.initChart(options)
                }
            },
            {
                immediate: true,//是否在页面进入时就触发侦听器
                deep: true//是否开启深层侦听
            }
        )
        return () => {
            const height = "450px";
            const width = "100%";
            //设置宽、高、选项、ref
            return <div>
                <echart ref={chartRef} height={height} width={width} />
            </div>
        }
    }
})