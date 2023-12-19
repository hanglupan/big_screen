import { defineComponent,  reactive,onMounted,ref,onUnmounted } from "vue";

import Draw from './draw';
export default defineComponent({
    components: {
        Draw
    },
    setup() {
        const drawTiming = ref(0)
        const cdata = reactive({
            year: null,
            weekCategory: [],
            radarData: [],
            radarDataAvg: [],
            maxData: 12000,
            weekMaxData: [],
            weekLineData: [],
        });
        const setData = () => {
            // 清空轮询数据
            cdata.weekCategory = [];
            cdata.weekMaxData = [];
            cdata.weekLineData = [];
            cdata.radarData = [];
            cdata.radarDataAvg = [];

            const dateBase = new Date();
            cdata.year = dateBase.getFullYear();
            //周数据
            for (let i = 0; i < 7; i++){
                //日期，即从今天开始的前7天作为目录
                const date = new Date();
                cdata.weekCategory.unshift([date.getMonth() + 1, date.getDate() - i].join('/'));

                //折线图数据
                cdata.weekMaxData.push(cdata.maxData);//最大数据
                const distance = Math.round(Math.random() * 11000 + 500);//随机一个数
                cdata.weekLineData.push(distance);//折线数据

                //雷达图数据
                const averageSpeed = +(Math.random() * 5 + 3).toFixed(3);//平均速度
                const maxSpeed = averageSpeed + +(Math.random() * 3).toFixed(2);//最大速度=平均速度+随机数
                const hour = +(distance / 1000 / averageSpeed).toFixed(1);//时间
                const radarDayData = [distance, averageSpeed, maxSpeed, hour];
                cdata.radarData.unshift(radarDayData);

                // 雷达图平均指标
                const distanceAvg = Math.round(Math.random() * 8000);
                const averageSpeedAvg = +(Math.random() * 4 + 4).toFixed(3);
                const maxSpeedAvg = averageSpeedAvg + +(Math.random() * 2).toFixed(2);
                const hourAvg = +(distance / 1000 / averageSpeedAvg).toFixed(1);
                const randarDayDataAvg = [
                    distanceAvg,
                    averageSpeedAvg,
                    maxSpeedAvg,
                    hourAvg
                ];
                cdata.radarDataAvg.unshift(randarDayDataAvg);
            }
        }
        const drawTimingFn = () =>{
            setData();
            drawTiming.value = setInterval(() => {
                setData();
            }, 6000);
        }
        onMounted(() => {
            drawTimingFn()
        })
        onUnmounted(() => {
            clearInterval(drawTiming.value)
        })
        return () => {
            return <div>
                <Draw cdata={cdata} />
            </div>
        }
    }
})