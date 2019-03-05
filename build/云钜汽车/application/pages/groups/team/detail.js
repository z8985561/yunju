var t = getApp(), a = t.requirejs("core"), e = t.requirejs("biz/order"), timeFormat= t.requirejs("util"), i = t.requirejs("jquery"), s = t.requirejs("wxParse/wxParse");
Page({
  data: {
    icons: t.requirejs("icons"),
    now: parseInt(Date.now() / 1e3),
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    timer: 0,
    istimeTitle: "",
    istime: 1,
    team:"active",
    basic:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (a) {
    console.log(a);
    this.setData({
      options: a,
      teamid:a.teamid
    }),
      this.get_list()
  },

  get_list: function () {
    var t = this;
    console.log(t.data);
    a.get("groups/team/detail", {teamid: t.options.teamid}, function (e) {
     
      clearInterval(t.data.timer);
      var r = setInterval(function () {
        t.countDown(e.endtime, "istime")
      }, 1e3);
      t.setData({
        timer: r
      })
      console.log(e);
      s.wxParse("wxParseData0", "html", e.goods.content, t, "5"),
      s.wxParse("wxParseData1","html",e.groupsset.groups_description,t,"5"),
        
      t.setData({
        n:e.n,
        lasttime2: e.lasttime2,
        tuan_first_order: e.tuan_first_order,
        orders:e.orders,
        myorder:e.myorder,
        groupsset: e.groupsset,
        goods: e.goods
      })
    })
  },
  teamTab: function (t) {
    var a = this,
      o = t.currentTarget.dataset.tap;
    if ("team" == o)
      this.setData({
        team: "active",
        basic: ""
      });
    else if ("basic" == o)
      this.setData({
        team: "",
        basic: "active"
      });
  },
  countDown: function (t, a) {
    var o = parseInt(Date.now() / 1e3),
      s = t - o,
      n = parseInt(s),
      r = Math.floor(n / 86400),
      d = Math.floor((n - 24 * r * 60 * 60) / 3600),
      c = Math.floor((n - 24 * r * 60 * 60 - 3600 * d) / 60);
    Math.floor(n - 24 * r * 60 * 60 - 3600 * d - 60 * c);
    if (this.setData({
      day: Math.floor(n / 86400),
      hour: Math.floor((n - 24 * r * 60 * 60) / 3600),
      minute: Math.floor((n - 24 * r * 60 * 60 - 3600 * d) / 60),
      second: Math.floor(n - 24 * r * 60 * 60 - 3600 * d - 60 * c)
    }), "istime") {
      var l = "";   
      t > o ? l = "距离团购结束" : (l = "活动已经结束，下次早点来~", this.setData({
        istime: 0
      })),
        this.setData({
          istimeTitle: l
        })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    var teamid = that.data.options.teamid;
    var shareMessage = a.onShareAppMessage("application/pages/groups/team/detail");
 
    if(teamid){
      var path =shareMessage.path+"&teamid="+teamid;
    }else{
      var path =shareMessage.path;
    }
    console.log(path);
    return {
      'title': shareMessage.title,
      'path':path,
      success: function (e) {
        
      }
    }
  }
})