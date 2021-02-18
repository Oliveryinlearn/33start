//动画类型
const ANIMATE_TYPE = ["line", "star"];
//默认创建的DOM个数
const ANIMATE_NUMBER = 10;
//默认每个动画的间隔
const ANIMATE_TIME = 500;

/**
 * 判断是否是一个对象
 * @param {Object} obj 需要判断的目标
 */
function isObj(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
}

/**
 * 生成一个在页面x轴上的随机值
 * @param {Number} Min 最小值
 * @param {Number} Max 最大值
 */
function RandomNum(Min, Max) {
    const Range = Max - Min;
    const Rand = Math.random();
    const num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}

/**
 * 动画
 * @param {String} type 动画类型，默认线条
 * @param {*} parentDom 父节点
 * @param {Number} number 显示动画的DOM数量，默认10个
 */
function addDom(type = ANIMATE_TYPE[0], parentDom, number = ANIMATE_NUMBER) {
    if (ANIMATE_TYPE.indexOf(type) === -1) {
        console.error("动画类型不存在")
    }

    //x轴的上限
    const maxWidth = document.body.clientWidth;
    //y轴的上限
    const maxHeight = document.body.clientHeight;

    //插入DOM的时间间隔
    const setTime = (type, i) => {
        return type === ANIMATE_TYPE[0] ? 1000 + i * ANIMATE_TIME : type === ANIMATE_TYPE[1] ? i * ANIMATE_TIME : ANIMATE_TIME;
    }

    //循环插入
    for (let i = 0; i < number; i++) {
        setTimeout(() => {
            let div = document.createElement("div");
            switch (type) {
                case ANIMATE_TYPE[0]: //线动画
                    div.className = `animate-line line-${RandomNum(1, 4)}`;
                    div.style.left = RandomNum(0, maxWidth) + "px";
                    break;

                case ANIMATE_TYPE[1]: //闪烁动画
                    div.className = `animate-star star-${RandomNum(1, 4)}`;
                    div.style.left = RandomNum(0, maxWidth) + "px";
                    div.style.top = RandomNum(0, maxHeight / 2) + "px";
                    break;
            }
            //插入视图
            parentDom.appendChild(div)
        }, setTime(type, i))
    }
}

export class AnimateTs {
    constructor(options) {
        this.options = options;
        this.parentDom = null
    }
    /**
     * 初始化动画
     */
    initAnimate() {
        let {
            el,
            animate
        } = this.options

        //判断是否存在绑定动画的元素
        if (!el) {
            console.error("配置项缺少el属性")
        }

        //创建承载动画的DOM
        this.parentDom = document.createElement("div");
        this.parentDom.classList.add("animate-bg-container");
        el.appendChild(this.parentDom)

        //是否是组合动画
        if (Array.isArray(animate)) {
            for (let item of animate) {
                if (!isObj(item)) {
                    console.error("animate类型错误")
                }
                //创建动画
                addDom(item.type, this.parentDom, item.number)
            }
        } else {
            if (!isObj(animate)) {
                console.error("animate类型错误")
            }

            //创建动画
            addDom(animate.type, this.parentDom, animate.number)
        }
    }
    clearAnimate() {
        if (!this.parentDom) return;
        this.parentDom.remove();
    }
}