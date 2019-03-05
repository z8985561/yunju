// pages/goods/poster/index.js
var app = getApp();
var core = app.requirejs('core');
var foxui = app.requirejs('foxui');
var touchDot = 0;
var startY = 0;
var time = 0;
var interval = "";
Page({
  data: {
    full: false,
    scrollleft: '',
    margin: '',
    showloading: true,
    accredit: '',
    index: 0,
    errMsg: '',
    check: "/static/images/check.png",
    poster: ''
  },
  onLoad: function (t) {
    var $this = this;
    $this.setData({
      options: t,
    }),
    wx.getSystemInfo({
      success: function (res) {
        var posterwidth = res.screenWidth;
        var windowHeight = res.windowHeight;
        $this.setData({
          posterwidth: posterwidth,
          windowHeight: windowHeight,
        })
      }
    });

    core.json('goods/poster/getimage', {id:t.id}, function (ret) {
      if (ret.error == 0) {
        $this.setData({
          poster: ret.url
        });
      }
      else {
        foxui.toast($this, ret.message);
      }
    });
  },

  onshow: function () {
  },

  // 点击保存图片
  savePicture: function () {
    var $this = this;
    wx.getSetting({
      success: function (res) {
        var accredit = res.authSetting['scope.writePhotosAlbum']
        if (accredit) {
          wx.showLoading({
            title: '图片下载中...',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 1000);
          var imgurl = $this.data.poster;
          if (imgurl.indexOf('https://') === -1) imgurl = imgurl.replace('http://', 'https://');
          console.log(imgurl);
          wx.downloadFile({
            url: imgurl,
            success: function (res) {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function (ret) {
                  foxui.toast($this, "保存图片成功");
                },
                fail: function (ret) {
                  $this.setData({ errMsg: ret.errMsg })
                  foxui.toast($this, "保存图片失败");
                }
              })
            }
          })
        } else {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            fail: function () {
              /*获取权限时点击了拒绝以后的弹窗*/
              wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法正常使用保存图片或视频的功能体验，请删除小程序重新进入。'
              })
            }
          })
        }
      }
    })
  },

  loadImg: function (e) {
    var lgimgheight = e.detail.height;
    //lgimgheight = '860rpx';
    console.log(lgimgheight);
    this.setData({
      lgimgheight: lgimgheight,
      showloading: false
    })
  }
})  