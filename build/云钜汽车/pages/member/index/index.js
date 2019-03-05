var e = getApp(),
  t = e.requirejs("core"),
  a = e.requirejs("wxParse/wxParse"),
  i = e.requirejs("biz/diypage"),
  r = e.requirejs("jquery");

Page({
  data: {
    route: "member",
    background: "",
    icons: e.requirejs("icons"),
    member: {},
    diypages: {},
    audios: {},
    audiosObj: {},
    modelShow: !1,
    autoplay: !0,
    interval: 5e3,
    duration: 500,
    swiperheight: 0,
    iscycelbuy: !1,
    bargain: !1,
    dm_index: 0,
    dm_json: [],
    modelPhoneShow: 1,
  },
  onLoad: function(t) {
    e.checkAccount();
    var a = this;
    e.url(t), wx.getSystemInfo({
      success: function(e) {
        var t = e.windowWidth / 1.7;
        a.setData({
          windowWidth: e.windowWidth,
          windowHeight: e.windowHeight,
          swiperheight: t
        });
      }
    }), i.get(this, "member", function(e) {}), "" == e.getCache("userinfo") && a.setData({
      modelShow: !0
    });
  },
  getInfo: function() {
    var e = this;
    t.get("member", {}, function(t) {
      if (0 != t.error){
        e.setData({
          modelShow: !0
        })
      }else{
        if (t.notsatisfygrade){
          wx.redirectTo({
            url: t.jumpUrl,
          })
        }
        e.setData({
          member: t,
          show: !0,
          background: t.background ? t.background : "#ff5555",
          customer: t.customer,
          customercolor: t.customercolor,
          phone: t.phone,
          phonecolor: t.phonecolor,
          phonenumber: t.phonenumber,
          iscycelbuy: t.iscycelbuy,
          bargain: t.bargain
        }), a.wxParse("wxParseData", "html", t.copyright, e, "5");
      }
    });
  },
  onShow: function() {
    this.getInfo();
    var e = this;
    wx.getSetting({
      success: function(t) {
        var a = t.authSetting["scope.userInfo"];
        e.setData({
          limits: a
        }), a || e.setData({
          modelShow: !0
        });
      }
    });
    e.get_danmu();
  },

  get_danmu: function() {
    var that = this;
    var dm_index = 0;
    var showtext = '';
    t.get("shop/get_danmu", {}, function(res) {
      if (res.error == 0) {
        var timer = setInterval(function() {
          var data = res.list[dm_index];
          if (data['type'] == 0) {
            showtext = "新订单来自 " + data.nickname;
          } else if (data['type'] == 1) {
            showtext = "新充值来自 " + data.nickname;
          } else if (data['type'] == 2) {
            showtext = "恭喜 " + data.nickname + "加入会员，财富大门为您打开！";
          } else if (data['type'] == 3) {
            showtext = "恭喜 " + data.nickname + "加入分销，财富大门为您打开！";
          }
          that.setData({
            headimgurl: data.headimgurl,
            showtext: showtext,
            showtime: data.time,
          })
          if (dm_index == 0) {
            that.setData({
              displaycss: "flex"
            })
          } else {
            that.setData({
              displayshow: "show"
            })

          }
          if (dm_index == res.list.length - 1) {
            dm_index = 0;
          } else {
            dm_index++;
          }
          setTimeout(function() {
            that.setData({
              displayshow: "noshow",
              displaycss: ""
            })
          }, 2000);
        }, 3000);

        that.setData({
          dm_json: res.list,
          timer:timer
        })
      }
    })
  },
  onShareAppMessage: function() {
    return t.onShareAppMessage();
  },
  cancelclick: function() {
    wx.redirectTo({
      url: "/pages/index/index"
    });
  },
  cancelmobileclick: function() {
    this.setData({
      "member.needbind": 0
    })
  },
  confirmmobileclick: function() {
    this.setData({
      "member.needbind": 0
    });
  },
  confirmclick: function() {
    this.setData({
      modelShow: !1
    });
  },
  phone: function() {
    var e = this.data.phonenumber + "";
    wx.makePhoneCall({
      phoneNumber: e
    });
  },
  play: function(e) {
    var t = e.target.dataset.id,
      a = this.data.audiosObj[t] || !1;
    if (!a) {
      a = wx.createInnerAudioContext("audio_" + t);
      var i = this.data.audiosObj;
      i[t] = a, this.setData({
        audiosObj: i
      });
    }
    var r = this;
    a.onPlay(function() {
      var e = setInterval(function() {
        var i = a.currentTime / a.duration * 100 + "%",
          s = Math.floor(Math.ceil(a.currentTime) / 60),
          o = (Math.ceil(a.currentTime) % 60 / 100).toFixed(2).slice(-2),
          n = Math.ceil(a.currentTime);
        s < 10 && (s = "0" + s);
        var u = s + ":" + o,
          c = r.data.audios;
        c[t].audiowidth = i, c[t].Time = e, c[t].audiotime = u, c[t].seconds = n, r.setData({
          audios: c
        });
      }, 1e3);
    });
    var s = e.currentTarget.dataset.audio,
      o = e.currentTarget.dataset.time,
      n = e.currentTarget.dataset.pausestop,
      u = e.currentTarget.dataset.loopplay;
    0 == u && a.onEnded(function(e) {
      c[t].status = !1, r.setData({
        audios: c
      });
    });
    var c = r.data.audios;
    c[t] || (c[t] = {}), a.paused && 0 == o ? (a.src = s, a.play(), 1 == u && (a.loop = !0),
      c[t].status = !0, r.pauseOther(t)) : a.paused && o > 0 ? (a.play(), 0 == n ? a.seek(o) : a.seek(0),
      c[t].status = !0, r.pauseOther(t)) : (a.pause(), c[t].status = !1), r.setData({
      audios: c
    });
  },
  pauseOther: function(e) {
    var t = this;
    r.each(this.data.audiosObj, function(a, i) {
      if (a != e) {
        i.pause();
        var r = t.data.audios;
        r[a] && (r[a].status = !1, t.setData({
          audios: r
        }));
      }
    });
  },
  onHide: function() {
    this.pauseOther();
  },
  onUnload: function() {
    this.pauseOther();
  },
  navigate: function(e) {
    var t = e.currentTarget.dataset.url,
      a = e.currentTarget.dataset.phone,
      i = e.currentTarget.dataset.appid,
      r = e.currentTarget.dataset.appurl;
    t && wx.navigateTo({
      url: t
    }), a && wx.makePhoneCall({
      phoneNumber: a
    }), i && wx.navigateToMiniProgram({
      appId: i,
      path: r
    });
  },
  userinfo: function(t) {
    var a = this;
    e.getUserInfo(function() {
      a.onShow();
    });
  },
  onHide: function() {
    var timer = this.data.timer;
    clearInterval(timer)
  },
  phoneinfo: function(options) {
    var that = this,
      iv = options.detail.iv,
      encryptedData = options.detail.encryptedData;
    wx.login({
      success: function(result) {
        if (result.code) {
          t.get('wxapp/login', {
            code: result.code
          }, function(res) {
            if (res.error == 0) {
              t.get('wxapp/bindPhone', {
                data: encryptedData,
                iv: iv,
                sessionKey: res.session_key
              }, function(lastresult) {
                console.log(lastresult);
                if (lastresult.error == 0) {
                  that.setData({
                    "member.needbind": 0
                  })
                }
              })
            }
          })
        }
      }
    })
  },
});