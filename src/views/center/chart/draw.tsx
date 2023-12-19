import { defineComponent,ref, shallowReactive, watch } from "vue";


const PropsType = {
    tips: {
        type: Number,
        default: 50,
        require:true
    },
    colorObj: {
        type: Object,
        default: () => ({//回调函数返回一个对象
            textStyle: "#3fc0fb",
            series: {
                color:  ["#00bcd44a", "transparent"],
                dataColor: {
                    normal: "#03a9f4",
                    shadowColor:"#97e2f5"
                }
            }
        })
    }
} as const;//断言

export default defineComponent({
    props: PropsType,
    setup(props) {
        let options = shallowReactive({  title: null, series: null });
        watch(
            () => props.tips,
            (val: any) => {//回调函数
                options = {
                    title: {
                        text: val * 1 + "%",//主标题文本
                        x: 'center',//??
                        y: 'center',//??
                        textStyle: {
                            color: props.colorObj.textStyle,
                            fontSize:16
                        }
                    },
                    series: [
                        {
                            type: 'pie',//图表类型
                            radius: ['75%', '80%'],//内圈半径和外圈半径的大小
                            center: ['50%', '50%'],//中心（圆心）坐标，相对于容器来说
                            hoverAnimation: false,//是否开启 hover 动画效果
                            color: props.colorObj.series.color,
                            label: {
                                normal: {
                                    show: false,
                                }
                            },
                            data: [
                                {
                                    value: val,
                                    itemStyle: {
                                        normal: {
                                            color: props.colorObj.series.dataColor.normal,
                                            shadowBlur: 10,
                                            shadowColor:props.colorObj.series.dataColor.shadowColor
                                        }
                                    }
                                },
                                {
                                    value:100-val,
                                }
                            ]
                        }
                    ]
                }
            },
            {
                immediate: true,//是否在页面进入时就触发侦听器
                deep: true//是否开启深层侦听
            }
        )
        return () => {
            const height = "100px";
            const width = "120px";
            //设置宽、高、选项、ref
            return <div>
                <echart  options={options} height={height} width={width} />
            </div>
        }
    }
})