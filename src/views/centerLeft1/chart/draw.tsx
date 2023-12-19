import { defineComponent,ref, shallowReactive, watch } from "vue";


const PropsType = {
    cdata: {
        type: Object,
        require: true
    }
} as const;//断言

export default defineComponent({
    props: PropsType,
    setup(props) {
        const chartRef = ref()
        //shallowReactive只处理对象最外层属性的响应式
        let options = shallowReactive({ color: null, tooltip: null, toolbox: null, calculable: null, legend: null, series: null });
        watch(//监听cdata
            () => props.cdata,//因为index里面返回的是一个函数，所以函数需要调用
            (val: any) => {//回调函数
                options = {
                    color: [
                        '#37a2da',
                        '#32c5e9',
                        '#9fe6b8',
                        '#ffdb5c',
                        '#ff9f7f',
                        '#fb7293',
                        '#e7bcf3',
                        '#8378ea'
                    ],
                    tooltip: {
                        trigger: 'item',//触发类型，无类目轴的图表使用
                        formatter:'{a} <br/>{b} : {c} ({d}%)'//提示显示格式
                    },
                    toolbox: {//工具箱
                        show:true
                    },
                    calculable: true,//是否启用拖曳重计算特性
                    legend: {//图例
                        orient: 'horizontal',//水平放置
                        x: 'center',//图例在X轴方向上的位置
                        textStyle: {//图例文字样式
                            color:'#fff'
                        },
                        icon: 'circle',//图例形状
                        data: val.xData,//cdata里面的xData
                        bottom: 0
                    },
                    series: [
                        {
                            name: '通过率统计',//系列名称
                            type: 'pie',//图表类型
                            radius: [10, 50],//内圈半径和外圈半径的大小
                            roseType: 'area',//南丁格尔图
                            center: ['50%', '40%'],//调整图的位置，左右、上下
                            itemStyle: {
                                borderRadius:5//圆角半径
                            },
                            label: {
                                show: true,
                                color:'#fff'
                            },
                            emphasis: {
                                label: {
                                    show:false
                                }
                            },
                            data:val.seriesData,//数据内容数组
                        }
                    ]
                }
                //手动触发更新
                if (chartRef.value) {
                    // 通过初始化参数打入数据
                    chartRef.value.initChart(options)
                }
            },
            {
                immediate: true,//是否在页面进入时就触发侦听器
                deep: true//是否开启深层侦听
            }
        )
        return () => {
            const height = "220px";
            const width = "260px";
            //设置宽、高、选项、ref
            return <div>
                <echart ref={chartRef} options={options} height={height} width={width} />
            </div>
        }
    }
})