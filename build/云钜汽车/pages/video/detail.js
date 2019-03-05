var t = getApp(),
  a = t.requirejs("core"),
  e = (t.requirejs("icons"), t.requirejs("wxParse/wxParse"));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    discuss: {},
    isnulldiscuss: true,
    discussTotal: 0,
    height: 0,
    page_background: false,
    auto_focus: false,
    sendId: false,
    sendName: false,
    sendValue: false,
    sendIndex: false,
    page:1,
    can_page:true,
    psize:0,
    showScreen:true,
    danmuList:[],
    video:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var ts = this,
      id = options.id;
    wx.getSystemInfo({
      success(res) {
        ts.setData({
          height: res.windowHeight - 324
        })
      }
    })
    if (id > 0) {
      ts.setData({id:id});
      a.post('movie/detail', {
        id: id,
        page:ts.data.page
      }, function(res) {
        if(res.status==0){
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 800
          });
          ts.setData({can_page:false});
          return false;
        }
        if (res.list.discuss.length > 0) {
          ts.setData({
            isnulldiscuss: false
          });
        }
        ts.setData({
          item: res.list,
          discussTotal: res.discussTotal,
          discuss: res.discuss,
          psize: res.psize,
          danmuList: res.danmuList
        });
      });
    }
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
    this.video = wx.createVideoContext("video",this);
    // this.video.requestFullScreen({ direction:0});
    this.setData({ video: this.video});
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

  },
  tapChild:function(e){
    var ts = this,
      tap = e.currentTarget.dataset,
      id = tap.id,
      nickname = tap.name,
      index = tap.index;
    var content = "回复 " + tap.name + ':';
    ts.setData({
      content: content,
      auto_focus: true,
      sendId: tap.id,
      sendIndex: index
    });
  },
  sendDiscuss: function(e) {
    var ts = this,
      tap = e.currentTarget.dataset,
      id = tap.id,
      nickname = tap.name,
      index = tap.index;
    var content = "回复 " + tap.name + ':';
    ts.setData({
      content: content,
      auto_focus: true,
      sendId: tap.id,
      sendIndex: index
    });
  },
  send_submit: function(e) {
    var ts = this;
    var data = {
      'id': ts.data.sendId,
      'value': ts.data.sendValue,
      'nickname': ts.data.sendName,
      'movieid': ts.data.item.id
    };
    var re = new RegExp(/^\s+$/g);
    if (!ts.data.sendValue || re.test(ts.data.sendValue)) {
      wx.showToast({
        title: '评论内容不能为空!',
        icon: 'none',
        duration: 800
      });
      return false;
    }
    a.post('movie/detail/submit', data, function(res) {
      if (res.status == 1) {
        if (res.is_child != 1) {
          ts.data.discuss.push(res.item);
          var discuss = ts.data.discuss,
            idx = discuss.length-1;
          a.alert('发表评论成功!');
          ts.video.sendDanmu({ text: data.value, color: 'red' });
          console.log(ts.video)
          if (ts.data.can_page == false || (ts.data.psize == 1 || !ts.data.psize)){
            ts.setData({
              discuss: discuss,
              idx: idx,
              isnulldiscuss: false,
              content: '',
              sendValue: false,
              discussTotal: parseInt(ts.data.discussTotal) + 1
            });
          }else{
            ts.setData({
              isnulldiscuss: false,
              content: '',
              sendValue: false,
              discussTotal: parseInt(ts.data.discussTotal) + 1})
          }
          
        } else {
          if (!ts.data.discuss[ts.data.sendIndex].child){
            ts.data.discuss[ts.data.sendIndex].child = [res.item];
          }else{
            ts.data.discuss[ts.data.sendIndex].child.push(res.item);
          }
          var discuss = ts.data.discuss;
          a.alert('发表评论成功!');
          ts.video.sendDanmu({ text: data.value, color: 'red' });
          console.log(ts.video)
          ts.setData({
            discuss: discuss,
            isnulldiscuss: false,
            content: '',
            sendValue: false,
            sendIndex:false,
            sendId:false,
            sendName:false,
            discussTotal: parseInt(ts.data.discussTotal) + 1
          });

        }

      }
    });
  },
  input: function(e) {
    var ts = this,
      value = e.detail.value;
    if (!value) {
      ts.setData({
        sendName: false,
        sendValue: false,
        sendIndex: false
      });
    } else {
      var re = /^回复.*?\:/;
      if (re.exec(value)) {
        var str = re.exec(value);
        if (str) {
          str = str[0];
        }
        str = str.slice(3, -1);
        value = value.replace(re, "");
        var re = new RegExp(/^\s+$/g);
        if (value && !re.test(value)) {
          ts.setData({
            sendValue: value
          });
        } else {
          ts.setData({
            sendValue: false
          });
        }
        if (str) {
          ts.setData({
            sendName: str
          });
        }
      } else {
        ts.setData({
          sendName: false,
          sendValue: value,
          sendId: false,
          sendIndex: false
        });
      }
    }
  },
  blur: function(e) {
    var ts = this,
      value = e.detail.value;
    if (!value) {
      ts.setData({
        sendName: false,
        sendValue: false
      });
    } else {
      var re = /^回复.*?\:/;
      if (re.exec(value)) {
        var str = re.exec(value);
        if (str) {
          str = str[0];
        }
        str = str.slice(3, -1);
        value = value.replace(re, "");
        if (value) {
          ts.setData({
            sendValue: value
          });
        }
        if (str) {
          ts.setData({
            sendName: str
          });
        }
      } else {
        ts.setData({
          sendName: false,
          sendValue: value,
          sendId: false
        });
      }
    }
  },
  zhuanfa:function(e){
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  scrolltolower:function(e){
    var ts=this,id=ts.data.id,i;
    if(ts.data.can_page){
      ts.setData({page:ts.data.page+1});
      a.post('movie/detail', {
        id: id,
        page: ts.data.page
      }, function (res) {
        if (res.status == 0) {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 800
          });
          ts.setData({ can_page: false });
          return false;
        }
        var discuss = ts.data.discuss;
        discuss = discuss.concat(res.discuss);
        wx.showLoading({
          title:'加载数据中...',
          mask:true
        })
        setTimeout(function(){
          wx.hideLoading()
          ts.setData({ discuss: discuss, discussTotal: parseInt(ts.data.discussTotal) + res.discuss.length});
        },500);
      });
    }
  },
  showinput:function(e){
    var ts = this, showScreen = e.detail.fullScreen;
    ts.setData({showScreen:!showScreen});
    console.log(ts.data.showScreen);
  }
})