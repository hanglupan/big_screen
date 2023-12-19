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
        //shallowReactive只处理对象最外层属性的响应式
        let options = shallowReactive({ showLegendSymbol:null, tooltip:null, geo:null, series:null});
        //(经纬度)
        const geoCoordMap = {
            '厦门市': [118.11022, 24.490474, 20],
            '福州市': [119.206239, 26.275302, 20],
            '泉州市': [118.589421, 24.908853, 20],
            '漳州市': [117.561801, 24.510897, 20],
            '龙岩市': [116.82978, 25.391603, 20],
            '莆田市': [119.007558, 25.591011, 20],
            '三明市': [117.435001, 26.465444, 20],
            '南平市': [118.178459, 27.535627, 20],
            '宁德市': [119.527082, 27.15924, 20],
        };
        const seriesData = [
            {
                name: '厦门市',
            },
            {
                name: '福州市',
            },
            {
                name: '泉州市',
            },
            {
                name: '漳州市',
            },
            {
                name: '龙岩市',
            },
            {
                name: '莆田市',
            },
            {
                name: '三明市',
            },
            {
                name: '南平市',
            },
            {
                name: '宁德市',
            },
        ];
        const convertData=function (data) {
            const scatterData = [];
            for (let i = 0; i < data.length; i++){
                const geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    scatterData.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    })
                }
            }
            return scatterData;
        } 
       
        watch(//监听cdata
            () => props.cdata,//因为index里面返回的是一个函数，所以函数需要调用
            (val: any) => {//回调函数
                options = {
                    showLegendSymbol: true,//地图上的小红点是否去除，true是显示
                    tooltip: {//提示
                        trigger: 'item',//触发类型，无类目轴的图表使用
                        textSytle: {//字体样式
                            fontSize: 14,//字体大小
                            lineHeight:22,//行高
                        },
                        position: point => {
                            return [point[0] + 50, point[1] - 20];
                        },
                    },
                    geo: [{//地图坐标系组件
                        show: true,//是否显示地理坐标系组件
                        zoom: 1.16,//当前视角的缩放比例
                        aspectScale: 0.85,//地图的长宽比
                        left: '17%',
                        top: '10%',
                        map: '福建',//地图名称
                        roam: false,//是否开启鼠标缩放和平移漫游
                        itemStyle: {//地图区域的多边形 图形样式
                            normal: {//??
                                borderColor: '#7ad5ff7f',//描边颜色
                                shadowOffsetY: 5,//阴影垂直方向上的偏移距离
                                shadowBlur:15,//阴影的模糊大小
                                areaColor:'rgba(5,21,35,0.1)',//地图区域的颜色
                            }
                        }
                    }],
                    series: [
                        {
                            name: '相关指数',//系列名称，用于tooltip的显示，图例的筛选
                            type: 'map',//图表类型
                            aspectScale: 0.85,//地图的长宽比
                            zoom: 1.16,//缩放
                            mapType: '福建',//??
                            top: '9%',
                            left:'17%',
                            roam:false,//是否开启鼠标缩放和平移漫游
                            itemStyle: {
                                normal: {//??
                                    areaColor: {//渐变色
                                        type: 'linear-gradient',//??可以只写linear
                                        x: 0,
                                        y: 300,
                                        x2: 0,
                                        y2: 0,
                                        colorStops: [{
                                            offset:0,color:'rgba(19,96,187,1)'//0%处的颜色
                                        }, {
                                            offset:1,color:'rgba(7,193.223,1)'//100%处的颜色
                                        }],
                                        global:true,//缺省为true
                                    },
                                    borderColor: '#4ECEE6',//边颜色
                                    borderWidth: 1,//描边线宽
                                },
                                emphasis: {
                                    areaColor: '#4f7fff',
                                    borderColor: 'rgba(0,242,363,.6)',
                                    borderWidth: 2,
                                    shadowBlur: 10,
                                    shadowColor: '#00f2fc',
                                }
                            },
                            label: {
                                //params.name= 数据名，类目名
                                formatter:params=>`${params.name}`,//标签内容格式器,可使用回调函数/字符串
                                show: true,//是否显示标签
                                color: '#fff',
                                position: 'insideRight',//标签的位置
                                textStyle: {//??
                                    fontSize: 14,
                                    color:'#efefef',
                                },
                                emphasis: {//??
                                    textStyle: {
                                        color:'#fff',
                                    },
                                },
                            },
                            data:val,//数据内容数组
                        },
                        {
                            type: 'effectScatter',//带有涟漪特效动画的散点（气泡）图
                            coordinateSystem: 'geo',//使用地理坐标系
                            effectType: 'ripple',//涟漪特效
                            legendHoverLink: false,//是否启用图例 hover 时的联动高亮
                            showEffectOn: 'render',//配置何时显示特效,render绘制完成后显示特效
                            rippleEffect: {//涟漪特效相关配置
                                period: 4,//动画的周期，秒数
                                scale:2.5,//动画中波纹的最大缩放比例
                                brushType:'stroke',//波纹的绘制方式
                            },
                            zlevel: 1,//所有图形的 zlevel 值
                            itemStyle: {//图形样式
                                normal: {
                                    color: '#99fbfe',
                                    shadowBlur: 5,
                                    shadowColor:'#fff',
                                },
                            },
                            data:convertData(seriesData),
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
            const height = "360px";
            const width = "330px";
            //设置宽、高、选项、ref
            return <div>
                <echart options={options} height={height} width={width} />
            </div>
        }
    }
})