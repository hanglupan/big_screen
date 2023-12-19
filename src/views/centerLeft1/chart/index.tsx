import { defineComponent, onUnmounted, reactive } from "vue";

import Draw from './draw';
export default defineComponent({
    components: {
        Draw
    },
    setup() {
        let intervalInstance = null;
        const cdata = reactive({
            xData: ['数据1', '数据2', '数据3', '数据4', '数据5', '数据6'],//类别
            seriesData: [//对应值和label
                { value: 10, name: '数据1' },
                { value: 5, name: '数据2' },
                { value: 15, name: '数据3' },
                { value: 25, name: '数据4' },
                { value: 20, name: '数据5' },
                { value: 35, name: '数据6' },
            ],
        });
        intervalInstance = setInterval(() => {
            const data = cdata.seriesData;
            cdata.seriesData = data.map((e) => {//映射
                return { value: e.value + 10, name: e.name };
            });
            // console.log(cdata.seriesData);
        }, 1000);//每秒的数据变化
        onUnmounted(() => {
            clearInterval(intervalInstance);
        });
        return () => {//JSX，返回一个函数
            return (//函数被调用时，返回下面格式
                <div>
                    <Draw cdata={cdata} />
                </div>
            )
        }
    },
})