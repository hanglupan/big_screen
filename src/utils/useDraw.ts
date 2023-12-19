import { ref } from 'vue';
export default function useDraw() {//导出一个函数
    // 指向最外层的容器
    const appRef = ref();

    // 定时函数
    const timer = ref(0);

    // 默认缩放尺度
    const scale = {
        width: '1',
        height: '1',
    }

    // 设计稿尺寸
    const baseWidth = 1920;
    const baseHeight = 1080;

    // 保持的比例（默认为1.77778)
    const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5));//相除之后取五位并变成float类型

    // 计算比例
    const calcRate = () => {
        //获取当前比例
        const currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5));

        if (appRef.value) {//获取到appRef的值
            if (currentRate > baseProportion) {//说明宽度太宽
                //宽度根据高度来获取缩放的尺度
                scale.width = ((window.innerHeight * baseProportion) / baseWidth).toFixed(5);
                //高度通过保持的比例来获取缩放的尺度
                scale.height = (window.innerHeight / baseHeight).toFixed(5);
                //调整样式中的transform
                appRef.value.style.transform=`scale(${scale.width},${scale.height}) translate(-50%,-50%)`
            } else {//说明高度太高
                //高度根据宽度来获取缩放的尺度
                scale.height = ((window.innerWidth / baseProportion)/baseHeight).toFixed(5);
                //宽度通过保持的比例来获取缩放的尺度
                scale.width = ((window.innerWidth) / baseWidth).toFixed(5);
                //调整样式中的transform
                appRef.value.style.transform=`scale(${scale.width},${scale.height}) translate(-50%,-50%)`
            }
        }
    }

    const resize = () => {//每20ms就计算一下比例并调整
        clearTimeout(timer.value);
        timer.value = setTimeout(() => {
            calcRate()
        },200)
    }

    const windowDraw = () => {//监听到resize改变之后将窗口大小改变并重新绘制
        window.addEventListener('resize', resize);
    }
    const unwindowDraw = () => {
        window.removeEventListener('resize', resize);
    }
    return {
        appRef,
        calcRate,
        windowDraw,
        unwindowDraw,
    }
}