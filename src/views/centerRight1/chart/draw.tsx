import { defineComponent, shallowReactive, watch } from "vue";


const PropsType = {
    cdata: {
        type: Object,
        require: true
    }
} as const;//断言

export default defineComponent({
    props: PropsType,
    setup(props) {
        let options = shallowReactive({ radar:null, series:null});
        
        const lineStyle = {//线条样式
            normal: {
                width: 1,
                opacity: 0.5
            }
        };

        watch(//监听cdata
            () => props.cdata,//因为index里面返回的是一个函数，所以函数需要调用
            (val: any) => {//回调函数
                options = {
                    radar: {
                        indicator: val.indicatorData,//指示器,用来指定雷达图中的多个变量（维度）
                        shape: 'circle',//绘制类型
                        splitNumber:5,//指示器轴的分割段数
                        radius: ['0%', '65%'],//内外半径
                        name: {//??
                            textStyle: {
                                color:"rgb(238,197,102)"
                            }
                        },
                        splitLine: {//分隔线
                            lineStyle: {
                                color: [
                                    "rgba(238, 197, 102, 0.1)",
                                    "rgba(238, 197, 102, 0.2)",
                                    "rgba(238, 197, 102, 0.4)",
                                    "rgba(238, 197, 102, 0.6)",
                                    "rgba(238, 197, 102, 0.8)",
                                    "rgba(238, 197, 102, 1)"
                                ].reverse()
                            }
                        },
                        splitArea: {//分隔区域
                            show:true
                        },
                        axisLine: {
                            lineStyle: {
                                color:'rgba(238, 197, 102, 0.5)'
                            }
                        }
                    },
                    series: [
                        {
                            name: '北京',
                            type: 'radar',//图表类型
                            data: val.dataBJ,
                            lineStyle: lineStyle,
                            symbol:"none",//标记的图形
                            itemStyle: {//折线拐点标志的样式
                                normal: {//??
                                    color:'#F9713C'
                                }
                            },
                            areaStyle: {//区域填充样式
                                normal: {
                                    opacity:0.1
                                }
                            }
                        },
                        {
                            name: '上海',
                            type: 'radar',//图表类型
                            data: val.dataSH,
                            lineStyle: lineStyle,
                            symbol:"none",//标记的图形
                            itemStyle: {//折线拐点标志的样式
                                normal: {//??
                                    color:'#B3E4A1'
                                }
                            },
                            areaStyle: {//区域填充样式
                                normal: {
                                    opacity:0.05
                                }
                            }
                        },
                        {
                            name: '广州',
                            type: 'radar',//图表类型
                            data: val.dataGZ,
                            lineStyle: lineStyle,
                            symbol:"none",//标记的图形
                            itemStyle: {//折线拐点标志的样式
                                normal: {//??
                                    color:'rgb(238, 197, 102)'
                                }
                            },
                            areaStyle: {//区域填充样式
                                normal: {
                                    opacity:0.05
                                }
                            }
                        },
                    ],
                }
            },
            {
                immediate: true,//是否在页面进入时就触发侦听器
                deep: true//是否开启深层侦听
            }
        )
        return () => {
            const height = "200px";
            const width = "260px";
            //设置宽、高、选项、ref
            return <div>
                <echart options={options} height={height} width={width} />
            </div>
        }
    }
})