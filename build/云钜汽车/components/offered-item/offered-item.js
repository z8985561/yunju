// var countDown = function (endTime){
//   var timeDiff = new Date(endTime) - new Date();
//   if (timeDiff>0){
//     var timeJson = {
//       days: checkTime(parseInt(leftTime / 1000 / 60 / 60 / 24, 10)),
//       hour: checkTime(parseInt(leftTime / 1000 / 60 / 60 % 24, 10)),
//       minute: checkTime(parseInt(leftTime / 1000 / 60 % 60, 10)),
//       second: checkTime(parseInt(leftTime / 1000 % 60, 10))
//     }
//     setTimeout(countDown,1000)
//   }
// }
function checkTime(i) { //将0-9的数字前面加上0，例1变为01 
  if (i < 10) {
    i = "0" + i;
  }
  return i;
} 
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    offeredItem: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    // offeredItem: {
    //   startTime: "2019-2-26 00:00:00", //开团时间
    //   endTime:"2019-2-28 00:00:00",
    //   duration: 3, //开团时间3天
    //   imgUrl: "/img/car-1.jpg",
    //   cartName: "本田INSPIRE",
    //   floorPrice: "10.00", //最低假
    //   topPrice: "25.00", //最高价
    //   url: "/pages/offered/detail", //地址
    //   subsidy: "2000", //补贴
    //   peopleNum:102
    // },
    time:{
      days: 0,
      hour: 0,
      minute: 0,
      second: 0
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    countDown: function (endTime) {
      var that = this;
      var timeDiff = new Date(endTime) - new Date();
      if (timeDiff > 0) {
        var timeJson = {
          days: checkTime(parseInt(timeDiff / 1000 / 60 / 60 / 24, 10)),
          hour: checkTime(parseInt(timeDiff / 1000 / 60 / 60 % 24, 10)),
          minute: checkTime(parseInt(timeDiff / 1000 / 60 % 60, 10)),
          second: checkTime(parseInt(timeDiff / 1000 % 60, 10))
        }
        that.setData({
          time: timeJson
        })
        setTimeout(()=>{
          that.countDown(that.data.offeredItem.endTime)
        }, 1000)
      }else{
        return;
      }
    },

  },
  // 组件生命周期
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      // 倒计时开始
      this.countDown(this.data.offeredItem.endTime)
    },
  }
})