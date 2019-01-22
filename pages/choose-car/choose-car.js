// pages/choose-car/choose-car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alpha: '',
    windowHeight: '',
    apHeight: 0,
    addBg: false,
    brandList: [{
      id: 1,
      text: "大众",
      imgUrl: "/img/volkswagen.png",
      url: ""
    }, {
      id: 2,
      text: "本田",
      imgUrl: "/img/honda.png",
      url: ""
    }, {
      id: 3,
      text: "丰田",
      imgUrl: "/img/fengtian.png",
      url: ""
    }, {
      id: 4,
      text: "奥迪",
      imgUrl: "/img/aodi.png",
      url: ""
    }, {
      id: 5,
      text: "日产",
      imgUrl: "/img/nissan.png",
      url: ""
    }, {
      id: 6,
      text: "宝马",
      imgUrl: "/img/bmw.png",
      url: ""
    }, {
      id: 7,
      text: "奔驰",
      imgUrl: "/img/benchi.png",
      url: ""
    }, {
      id: 8,
      text: "吉利汽车",
      imgUrl: "/img/geelyauto.png",
      url: ""
    }, {
      id: 9,
      text: "别克",
      imgUrl: "/img/bieke.png",
      url: ""
    }, {
      id: 10,
      text: "宝骏",
      imgUrl: "/img/baojun.png",
      url: ""
    }],
    list: [{
        alphabet: 'A',
        datas: [{
          name: "风一样男子",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg",
          state: "中国"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg",
          state: "中国"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg",
          state: "中国"
        }]
      },
      {
        alphabet: 'B',
        datas: [{
          name: "风一样",
          avater: "http://img.zcool.cn/community/01b4fa55de8e0532f875a132d6f99c.jpg@1280w_1l_2o_100sh.jpg",
          state: "中国"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg",
          state: "中国"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg",
          state: "中国"
        }]
      },
      {
        alphabet: 'C',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'D',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'E',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'F',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'G',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'H',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'I',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'J',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'K',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'L',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'M',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'N',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'O',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'P',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'Q',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'R',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'S',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'T',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'U',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'V',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'W',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'X',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'Y',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
      {
        alphabet: 'Z',
        datas: [{
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg"
        }, {
          name: "风一样",
          avater: "http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg"
        }, {
          name: "风一样",
          avater: "http://pic18.nipic.com/20120203/8215229_164952068393_2.jpg"
        }]
      },
    ]
  },
  //点击
  handlerAlphaTap(e) {
    let {
      ap
    } = e.target.dataset;
    this.setData({
      alpha: ap
    });
  },
  //滑动
  handlerMove(e) {
    let {
      list
    } = this.data;
    this.setData({
      addBg: true
    });
    let rY = e.touches[0].clientY - 60; //竖向滑动的距离
    if (rY >= 0) {
      let index = Math.ceil((rY - this.apHeight) / this.apHeight);
      if (0 <= index < list.length) {
        let nonwAp = list[index];
        nonwAp && this.setData({
          alpha: nonwAp.alphabet
        });
      }
    }
  },
  //滑动结束
  handlerEnd(e) {
    this.setData({
      addBg: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var res = wx.getSystemInfoSync();
    this.apHeight = (res.windowHeight - 60) * 0.8 / 26;
    this.setData({
      windowHeight: res.windowHeight
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})