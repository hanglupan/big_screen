import { defineComponent, ref, watch } from "vue";


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
        
        const colorList = {
            linearYtoG: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: "#f5b44d"
                    },
                    {
                        offset: 1,
                        color: "#28f8de"
                    }
                ]
            },
            linearGtoB: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                    {
                        offset: 0,
                        color: "#43dfa2"
                    },
                    {
                        offset: 1,
                        color: "#28f8de"
                    }
                ]
            },
            linearBtoG: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                    {
                        offset: 0,
                        color: "#1c98e8"
                    },
                    {
                        offset: 1,
                        color: "#28f8de"
                    }
                ]
            },
            areaBtoG: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: "rgba(35,184,210,.2)"
                    },
                    {
                        offset: 1,
                        color: "rgba(35,184,210,0)"
                    }
                ]
            },
        }

        let options={}
        watch(//监听cdata
            () => props.cdata,//因为index里面返回的是一个函数，所以函数需要调用
            (val: any) => {//回调函数
                options = {
                    title: {
                        text: "",
                        textStyle: {
                            color: "#D3D6DD",
                            fontSize: 24,
                            fontWeight: 'normal'
                        },
                        subtext: val.year + '/' + val.weekCategory[6],//副标题
                        sutextStyle: {
                            color: '#fff',
                            fontSize:16
                        },
                        top: 50,
                        left:80
                    },
                    legend: {//图例
                        // 定位
                        top: 120,
                        left: 80,
                        orient: 'vertical',//水平方向
                        itemGap: 15,//间距
                        itemWidth: 12,//长度
                        itemHeight: 12,//高度
                        data: ["平均指标", "我的指标"],
                        textStyle: {//字体样式
                            color: '#fff',
                            fontSize:14
                        }
                    },
                    tooltip: {
                        trigger:"item"
                    },
                    radar: {
                        center: ['68%', '27%'],
                        splitNumber:8,//指示器轴的分割段数
                        radius: "40%",
                        name: {//??
                            color:"#fff"
                        },
                        splitLine: {//分隔线
                            lineStyle: {
                                color:colorList.linearYtoG,
                                opacity:0.6
                            }
                        },
                        splitArea: {//分隔区域
                            areaStyle: {
                                color: '#fff',
                                opacity: 0.1,
                                shadowBlur: 25,
                                shadowColor: '#000',
                                shadowOffsetX: 0,
                                shadowOffsetY:5
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color:colorList.linearYtoG,
                                opacity:0.6
                            }
                        },
                        //指示器,用来指定雷达图中的多个变量（维度）
                        indicator: [
                            {
                                name: '服务态度',
                                max:val.maxData,
                            },
                            {
                                name: '产品质量',
                                max:10,
                            },
                            {
                                name: '任务效率',
                                max:12,
                            },
                            {
                                name: '售后保障',
                                max:3.5,
                            }
                        ]
                    },
                    grid: {//网格
                        left: 90,
                        right: 80,
                        bottom: '15%',
                        top:'50%'
                    },
                    xAxis:{
                        type: 'category',//类目轴
                        position: 'bottom',
                        axisLine: true,//应该是一个对象，是否显示坐标轴线??
                        axisLabel: {//坐标轴刻度标签的相关设置
                            color: "rgba(255,255,255,.8)",
                            fontSize:12
                        },
                        data:val.weekCategory
                    },
                    yAxis: {
                        name: '工单',
                        nameLocation: 'end',//坐标轴名称显示位置
                        nameGap: 24,//坐标轴名称与轴线之间的距离
                        nameTextStyle: {//坐标轴名称的文字样式
                            color: "rgba(255,255,255,.5)",
                            fontSize:14
                        },
                        max: val.maxData,
                        splitNumber: 4,//坐标轴的分割段数
                        axisLine: {//坐标轴轴线相关设置
                            lineStyle: {
                                color: '#fff',
                                opacity:0.1,
                            }
                        },
                        splitLine: {//分隔线
                            show: true,
                            lineStyle: {
                                color: '#fff',
                                opacity:0.1
                            }
                        },
                        axisLabel: {
                            color: "rgba(255,255,255,.8)",
                            fontSize:12
                        }
                    },
                    series: [
                        {
                            name: '',
                            type: 'radar',//图表类型
                            data: [
                                {
                                    value: val.radarDataAvg[6],
                                    name: '平均指标',
                                    itemStyle: {
                                        normal: {
                                            color:'#f8d351'
                                        }
                                    },
                                    lineStyle: {
                                        normal: {
                                            opacity:0//不显示线
                                        }
                                    },
                                    areaStyle: {
                                        normal: {
                                            color: "#f8d351",
                                            shadowBlur: 25,
                                            shadowColor: "rgba(248,211,81,.3)",
                                            shadowOffsetX: 0,
                                            shadowOffsetY: -10,
                                            opacity:1
                                        }
                                    }
                                },
                                {
                                    value: val.radarData[6],
                                    name: '我的指标',
                                    itemStyle: {
                                        normal: {
                                            color:'#43dfa2'
                                        }
                                    },
                                    lineStyle: {
                                        normal: {
                                            opacity:0//不显示线
                                        }
                                    },
                                    areaStyle: {
                                        normal: {
                                            color: colorList.linearGtoB,
                                            shadowBlur: 15,
                                            shadowColor: "rgba(0,0,0,.2)",
                                            shadowOffsetX: 0,
                                            shadowOffsetY: 5,
                                            opacity:0.8
                                        }
                                    }
                                }
                            ],
                        },
                        {
                            name: '',
                            type: "line",
                            smooth: true,
                            symbol: 'emptyCircle',
                            symbolSize: 8,
                            itemStyle: {
                                normal: {
                                    color:'#fff'
                                }
                            },
                            lineStyle: {
                                normal: {
                                    color: colorList.linearBtoG,
                                    
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color:colorList.areaBtoG
                                }
                            },
                            data: val.weekLineData,
                            lineSmooth: true,//??
                            markLine: {
                                slient: true,//图形是否不响应和触发鼠标事件，这边是不响应
                                data: [
                                    {
                                        type: 'average',//特殊的标注类型
                                        name:'平均值',
                                    }
                                ],
                                precision: 0,//标线数值的精度
                                label: {
                                    normal: {
                                        formatter:"平均值：\n {c}",//c=数据值
                                    }
                                },
                                lineStyle: {//标线的样式
                                    normal: {
                                        color:'rgba(248,211,81,.7)'
                                    }
                                }
                            },
                            tooltip: {
                                position: 'top',
                                formatter: '{c} m',//c=数据值
                                backgroundColor: "rgba(28,152,232,.2)",
                                padding:6
                            }
                        },
                    ]
                };
                if (chartRef.value) {
                    chartRef.value.initChart(options)
                }
            },
            {
                immediate: true,//是否在页面进入时就触发侦听器
                deep: true//是否开启深层侦听
            }
        )
        return () => {
            const height = "480px";
            const width = "100%";
            //设置宽、高、选项、ref
            return <div>
                <echart ref={chartRef} height={height} width={width} />
            </div>
        }
    }
})