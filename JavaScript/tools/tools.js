/*
            * 定义一个函数，用来获取指定元素的当前的样式
            * 参数：
            *       obj 要获取样式的元素
            *       name 要获取的样式名
            * 返回值带px
            * */
function getStyle(obj,name) {
    if(window.getComputedStyle){
        //正常浏览器的方式，具有getComputedStyle方法
        return getComputedStyle(obj,null)[name]
    } else{
        //IE8的方式，没有getComputedStyle方法
        return box1.currentStyle.width
    }
}
/*
    * 定义一个函数，执行简单动画
    * 参数：
    *       obj: 要执行动画的对象
    *       attr: 要执行动画的样式  比如：width,height,left,top
    *       target:执行动画的目标位置
    *       speed: 移动的速度
    *       callback: 回调函数，这个函数将会在动画执行完毕以后执行
    * 返回值带px
    * */
function move(obj , attr , target , speed , callback) {
    //关闭上一个定时器
    clearInterval(obj.timer);
    //根据目前位置和目标位置 来判断移动方向(只判断一次)
    var currentValue = parseInt(getStyle(obj,attr));
    speed = currentValue < target ? speed : (0-speed);
    //开启一个定时器，用来执行动画效果
    //向执行动画的对象中添加一个timer属性，用来保存它自己的定时器标识
    obj.timer = setInterval(function () {
        //获取元素当前的位置
        var oldValue = parseInt(getStyle(obj,attr));
        //新位置
        var newValue = oldValue + speed;
        /*
        * 向左移动时，需要判断newValue是否小于target
          向右移动时，需要判断newValue是否大于target
        * */
        if(speed > 0 && newValue >= target || speed < 0 && newValue <= target) {
            newValue = target;
        }
        //移动
        obj.style[attr] = newValue + 'px';
        //到达位置，清除定时器
        if(newValue === target) {
            clearInterval(obj.timer);
            //动画执行完毕 如果有回调函数，则执行
            callback && callback();
        }
    }, 30);
}

//根据Date日期获得格式返回： 2020年03月21日 星期六 16:50:50
function getDay(day) {
    var arr = ['星期一','星期二','星期三','星期四','星期五','星期六','星期天'];
    return arr[day-1];
}