var t = getApp(),
  e = t.requirejs("core"),
  a = (t.requirejs("icons"), t.requirejs("foxui")),
  o = t.requirejs("biz/diyform"),
  i = t.requirejs("jquery"),
  c = t.requirejs("biz/goodspicker"),
  wxparse = t.requirejs("wxParse/wxParse"),
  diypage = t.requirejs("biz/diypage"),
  n = 0,
  r = [],
  d = [];
var share_count = 0;
Page({
  data: {
    approot: t.globalData.approot,
    diypages: {},
    usediypage: !1,
    specs: [],
    options: [],
    icons: t.requirejs("icons"),
    goods: {},
    show: 1,
    videohide: "videohide",
    videoshow: true,
    videourl: '',
    img_hide: '',
    indicatorDots: 1,
    autoplay: !1,
    interval: 5e3,
    duration: 500,
    circular: !0,
    active: "",
    slider: "",
    tempname: "",
    info: "active",
    preselltimeend: "",
    presellsendstatrttime: "",
    advWidth: 0,
    dispatchpriceObj: 0,
    now: parseInt(Date.now() / 1e3),
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    timer: 0,
    discountTitle: "",
    istime: 1,
    istimeTitle: "",
    params: {},
    total: 1,
    optionid: 0,
    defaults: {
      id: 0,
      merchid: 0
    },
    showprotocol: 0,
    stopFlag: !0,
    buyType: "",
    pickerOption: {},
    specsData: [],
    specsTitle: "",
    canBuy: "",
    diyform: {},
    showPicker: !1,
    pvalOld: [0, 0, 0],
    pval: [0, 0, 0],
    areas: [],
    noArea: !0,
    commentObj: {},
    commentObjTab: 1,
    commentEmpty: !1,
    commentPage: 1,
    commentLevel: "all",
    commentList: [],
    ver: t.globalData.ver,
    closeBtn: !1,
    soundpic: !0,
    animationData: {},
    uid: "",
    stararr: ["all", "good", "normal", "bad", "pic"],
    nav_mask: !1,
    nav_mask2: !1,
    nav: 0,
    giftid: "",
    limits: !0,
    modelShow: !1,
    showgoods: !0,
    currentDate: "",
    dayList: "",
    currentDayList: "",
    currentObj: "",
    currentDay: "",
    checkedDate: "",
    showDate: "",
    scope: "",
    dm_index: 0,
    dm_json: [],
  },
  get_danmu: function() {
    var that = this;
    var dm_index = 0;
    var showtext = '';
    e.get("shop/get_danmu", {}, function(res) {
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
            showtime: data.time
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
          timer: timer
        })
      }
    })
  },
  onHide: function() {
    var timer = this.data.timer;
    clearInterval(timer)
  },
  favorite: function(t) {
    var a = this;
    if (a.data.limits) {
      o = t.currentTarget.dataset.isfavorite == 1 ? 0 : 1;
      e.get("member/favorite/toggle", {
        id: a.data.options.id,
        isfavorite: o
      }, function(t) {
        t.isfavorite ? a.setData({
          "goods.isfavorite": 1
        }) : a.setData({
          "goods.isfavorite": 0
        })
      })
    } else {
      this.setData({
        modelShow: !0
      });
    }
  },
  goodsTab: function(t) {
    var a = this,
      o = t.currentTarget.dataset.tap;
    if ("info" == o)
      this.setData({
        info: "active",
        para: "",
        comment: ""
      });
    else if ("para" == o)
      this.setData({
        info: "",
        para: "active",
        comment: ""
      });
    else if ("comment" == o) {
      if (a.setData({
          info: "",
          para: "",
          comment: "active"
        }), a.data.commentList.length > 0)
        return void a.setData({
          loading: !1
        });
      a.setData({
          loading: !0
        }),
        e.get("goods/get_comment_list", {
          id: a.data.options.id,
          level: a.data.commentLevel,
          page: a.data.commentPage
        }, function(t) {
          t.list.length > 0 ? a.setData({
            loading: !1,
            commentList: t.list,
            commentPage: t.page
          }) : a.setData({
            loading: !1,
            commentEmpty: !0
          })
        })
    }
  },
  imgTap: function(e) {
    var that = this;
    var nowImgUrl = e.target.dataset.src;
    var itemindex = e.target.dataset.itemIndex;
    var picindex = e.target.dataset.picIndex;
    wx.previewImage({
      current: nowImgUrl, // 当前显示图片的http链接
      urls: that.data.commentList[itemindex].images // 需要预览的图片http链接列表
    })
  },
  comentTap: function(t) {
    var a = this,
      o = t.currentTarget.dataset.type,
      i = "";
    1 == o ? i = "all" : 2 == o ? i = "good" : 3 == o ? i = "normal" : 4 == o ? i = "bad" : 5 == o && (i = "pic"),
      o != a.data.commentObjTab && e.get("goods/get_comment_list", {
        id: a.data.options.id,
        level: i,
        page: a.data.commentPage
      }, function(t) {
        t.list.length > 0 ? a.setData({
          loading: !1,
          commentList: t.list,
          commentPage: t.page,
          commentObjTab: o,
          commentEmpty: !1
        }) : a.setData({
          loading: !1,
          commentList: t.list,
          commentPage: t.page,
          commentObjTab: o,
          commentEmpty: !0
        })
      })
  },
  number: function(t) {
    var o = this,
      i = e.pdata(t),
      s = a.number(this, t);
    1 == s && 1 == i.value && "minus" == t.target.dataset.action || i.value == i.max && "plus" == t.target.dataset.action || o.setData({
      total: s
    })
  },
  inputNumber: function(t) {
    var e = this,
      a = e.data.goods.maxbuy,
      o = e.data.goods.minbuy,
      i = t.detail.value;
    i > 0 ? (a > 0 && a <= parseInt(t.detail.value) && (i = a), o > 0 && o > parseInt(t.detail.value) && (i = o)) : i = o > 0 ? o : 1,
      e.setData({
        total: i
      })
  },
  buyNow: function(t) {
    var i = this,
      s = i.data.optionid,
      maxbuy = parseInt(i.data.goods.maxbuy),
      total = parseInt(i.data.total),
      r = i.data.diyform;
    console.log(r);
    if (n > 0 && 0 == s)
      return void a.toast(i, "请选择规格");
    if (maxbuy && total > maxbuy)
      return void a.toast(i, "超出最大限购数");
    if (r && r.fields.length > 0) {
      if (!o.verify(i, r))
        return;
      e.post("order/create/diyform", {
        id: i.data.id,
        diyformdata: r.f_data
      }, function(t) {
        wx.redirectTo({
          url: "/pages/order/create/index?id=" + i.data.id + "&total=" + i.data.total + "&optionid=" + s + "&gdid=" + t.gdid
        })
      })
    } else
      wx.redirectTo({
        url: "/pages/order/create/index?id=" + i.data.id + "&total=" + i.data.total + "&optionid=" + s
      })
  },
  getCart: function(t) {
    var i = this,
      s = i.data.optionid,
      r = i.data.diyform;
    if (n > 0 && 0 == s)
      return void a.toast(i, "请选择规格");
    if (r && r.fields.length > 0) {
      if (!o.verify(i, r))
        return;
      e.post("order/create/diyform", {
        id: i.data.id,
        diyformdata: r.f_data
      }, function(t) {
        e.post("member/cart/add", {
          id: i.data.id,
          total: i.data.total,
          optionid: s,
          diyformdata: r.f_data
        }, function(t) {
          if(t.error==0){
            i.setData({
              "goods.cartcount": t.cartcount,
              active: "",
              slider: "out",
              tempname: "",
            })
          } 
        })
      })
    } else
      e.post("member/cart/add", {
        id: i.data.id,
        total: i.data.total,
        optionid: s
      }, function(t) {
        0 == t.error && i.setData({
          "goods.cartcount": t.cartcount,
          active: "",
          slider: "out",
          tempname:""
        })
      })
  },
  getDetail: function(t) {
    var a = this,
      o = parseInt(Date.now() / 1e3),
      lasttime = '';
    e.get("goods/get_detail", {
      id: t.id
    }, function(t) {
      if (t.error > 0) {
        a.setData({
          show: !0,
          showgoods: !1
        })
      } else {
        a.setData({
          goods: t.goods,
          thumbsList: t.goods.thumbs,
        })
      }
      wxparse.wxParse("wxParseData", "html", t.goods.content, a, "5"),
        wxparse.wxParse("wxParseData_buycontent", "html", t.goods.buycontent, a, "5")
      if (t.goods.protocolshow == 1) {
        wxparse.wxParse("wxParseData_protocolcontent", "html", t.goods.protocolcontent, a, "5")
      }

      var coupons = t.goods.coupons;
      a.setData({
          coupon: coupons,
          coupon_l: coupons.length,
          packagegoods: t.goods.packagegoods,
          packagegoodsid: t.goods.packagegoods.goodsid,
          credittext: t.goods.credittext,
          activity: t.goods.activity,
          phonenumber: t.goods.phonenumber,
          showDate: t.goods.showDate,
          scope: t.goods.scope
        }),
        t.goods.packagegoods && a.package(),
        a.setData({
          show: !0,
          goods: t.goods,
          minprice: t.goods.minprice,
          maxprice: t.goods.maxprice,
          preselltimeend: t.goods.preselltimeend,
          style: t.goods.labelstyle.style,
          navbar: t.goods.navbar,
          labels: t.goods.labels
        }),
        wx.setNavigationBarTitle({
          title: t.goods.title || "商品详情"
        })
      n = t.goods.hasoption;
      if (i.isEmptyObject(t.goods.dispatchprice) || "string" == typeof t.goods.dispatchprice) {
        a.setData({
          dispatchpriceObj: 0
        })
      } else {
        a.setData({
          dispatchpriceObj: 1
        })
      }

      if (t.goods.isdiscount > 0 && t.goods.isdiscount_time >= o) {
        clearInterval(a.data.timer);
        var r = setInterval(function() {
          a.countDown(0, t.goods.isdiscount_time)
        }, 1e3);
        a.setData({
          timer: r
        })
      } else {
        a.setData({
          discountTitle: "活动已结束"
        });
      }

      if (t.goods.istime > 0) {
        clearInterval(a.data.timer);
        var r = setInterval(function() {
          a.countDown(t.goods.timestart, t.goods.timeend, "istime")
        }, 1e3);
        a.setData({
          timer: r
        })
      }
      if (t.goods.seckillinfo != '') {
        if (t.goods.seckillinfo.status == 0) {
          lasttime = t.goods.seckillinfo.endtime - a.data.now;
        } else {
          lasttime = t.goods.seckillinfo.starttime - a.data.now;
        }
        clearInterval(a.data.timer);
        var r = setInterval(function() {
          lasttime -= 1
          if (lasttime > 0) {
            a.formatSeconds(lasttime)
          }
        }, 1e3)
        a.setData({
          timer: r
        })
      }

      if (t.goods.ispresell > 0) {
        var app = getApp();
        var time = app.requirejs("util");
        var newDate = new Date();
        newDate.setTime(t.goods.preselltimeend * 1000);
        a.setData({
          preselltimeend: time.formatTime(newDate) || t.goods.preselltimeend || t.goods.preselltimeend.getMonth() + "月" + t.goods.preselltimeend || t.goods.preselltimeend.getDate() + "日 " + t.goods.preselltimeend || t.goods.preselltimeend.getHours() + ":" + t.goods.preselltimeend || t.goods.preselltimeend.getMinutes() + ":" + t.goods.preselltimeend || t.goods.preselltimeend.getSeconds(),
          presellsendstatrttime: t.goods.presellsendstatrttime || t.goods.presellsendstatrttime.getMonth() + "月" + t.goods.presellsendstatrttime || t.goods.presellsendstatrttime.getDate() + "日"
        })
      }
      t.goods.getComments > 0 && e.get("goods/get_comments", {
        id: a.data.options.id
      }, function(t) {
        a.setData({
          commentObj: t
        })
      })
    })
  },
  countDown: function(t, e, a) {
    var o = parseInt(Date.now() / 1e3),
      i = t > o ? t : e,
      s = i - o,
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
      t > o ? l = "距离限时购开始" : t <= o && e > o ? l = "距离限时购结束" : (l = "活动已经结束，下次早点来~", this.setData({
          istime: 0
        })),
        this.setData({
          istimeTitle: l
        })
    }
  },
  cityPicker: function(t) {
    var e = this;
    t.currentTarget.dataset.tap;
    wx.navigateTo({
      url: "/pages/goods/region/index?id=" + e.data.goods.id + "&region=" + e.data.goods.citys.citys
    })
  },
  selectPicker: function(t) {
    var a = this,
      o = t.currentTarget.dataset.tap,
      i = t.currentTarget.dataset.buytype;
    if (a.data.limits) {
      "" == o && a.setData({
          active: "active",
          slider: "in",
          tempname: "select-picker",
          buyType: i,
          canbuy: a.data.goods.canbuy,
        }),
        e.get("goods/get_picker", {
          id: a.data.goods.id
        }, function(t) {
          if (t.error == 0) {
            d = t.options,
              a.setData({
                pickerOption: t,
                optionsArray:d,
                minpicker: "goodsdetail"
              })
            var s = 0;
            s = 0 != t.goods.minbuy && a.data.total < t.goods.minbuy ? t.goods.minbuy : a.data.total;
            t.diyform && a.setData({
              diyform: {
                fields: t.diyform.fields,
                f_data: t.diyform.lastdata
              }
            })
            console.log(a.data.goods.protocolshow);
            a.data.goods.protocolshow == 1 && a.setData({
              slider: "in",
              showprotocol: 1,
              tempname: "",
            })
            a.setData({
              total: s,
              show: !0
            });
          }
          if (t.error == 3) {
            wx.showModal({
              title: '提示',
              content: t.message,
              success: function(res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '/pages/member/bind/index',
                  })
                } else if (res.cancel) {
                  a.setData({
                    slider: "out"
                  });
                }
              }
            })
          }
          if (t.error == 5) {
            a.setData({
              canbuy: false
            })
            e.alert(t.message)
          }
        })
    } else {
      a.setData({
        modelShow: !0
      })
    }
  },
  confirmprotocol: function(t) {
    this.setData({
      tempname: "select-picker",
      showprotocol: !1
    });
  },
  cancelprotocol: function(t) {
    this.setData({
      showprotocol: !1
    });
  },
  specsTap: function(t) {
    var e = this,
      a = t.target.dataset.idx;
    r[a] = {
      id: t.target.dataset.id,
      title: t.target.dataset.title
    };
    var o = "",
      i = "";
    r.forEach(function(t) {
        o += t.title + ";",
          i += t.id + "_"
      }),
      i = i.substring(0, i.length - 1);
    var s = e.data.optionsArray;
    var goods = e.data.goods;
    s.forEach(function(a) {
        console.log(a);
        a.specs == i && (e.setData({
          optionid: a.id,
          "goods.total": a.stock,
          "goods.maxprice": a.marketprice,
          "goods.minprice": a.marketprice,
          "goods.maxbuy": a.maxbuy,
          "goods.marketprice": a.marketprice,
          "goods.presellprice": a.presellprice,
          "goods.prepayprice": a.preprice,
        }), "" != t.target.dataset.thumb && e.setData({
          "goods.thumb": t.target.dataset.thumb
        }), a.stock <= 0 ? e.setData({
          canBuy: "库存不足"
        }) : e.setData({
          canBuy: ""
        }))
      }),
      e.setData({
        specsData: r,
        specsTitle: o
      })
  },
  emptyActive: function() {
    this.setData({
      active: "",
      slider: "out",
      showshare: 0,
      tempname: ""
    })
  },
  onLoad: function(options) {
    var that = this;
    diypage.get(this, "goodsdetail", function(t) {
      var a = t.diypage.items;
      for (var o in a) "copyright" == a[o].id && that.setData({
        copyright: a[o]
      });
    }), options = options || {};
    var option = decodeURIComponent(options.scene);
    if (!options.id && option) {
      var n = e.str2Obj(option);
      options.id = n.id, n.mid && (options.mid = n.mid);
    }
    this.setData({
        id: options.id,
        options: options,
      }), t.url(options), that.setData({
        uid: options.id,
        now: parseInt(Date.now() / 1e3)
      }),that.getDetail(options);
      setTimeout(function () {
          that.setData({
            areas: t.getCache("cacheset").areas
          });
        }, 3e3);
      // t.getUserInfo(function() {
      //   that.setData({
      //     options: options,
      //   })
      //   that.getDetail(options), setTimeout(function() {
      //     that.setData({
      //       areas: t.getCache("cacheset").areas
      //     });
      //   }, 3e3);
      // }, function() {
      //   wx.redirectTo({
      //     url: "/pages/message/auth/index"
      //   });
      // });

  },
  onShow: function() {
    r = [],
      d = [];
    t.checkAccount();
    var that = this;
    wx.getSetting({
      success: function(e) {
        var a = e.authSetting["scope.userInfo"];
        if (a == undefined) {
          a = !1;
        }
        that.setData({
          limits: a
        });
      }
    });
    that.get_danmu();
  },
  onChange: function(t) {
    return o.onChange(this, t)
  },
  formatSeconds: function(value) {
    var t = this;
    var theTime = parseInt(value);
    var theTime1 = 0;
    var theTime2 = 0;
    if (theTime > 60) {
      theTime1 = parseInt(theTime / 60);
      theTime = parseInt(theTime % 60);
      if (theTime1 > 60) {
        theTime2 = parseInt(theTime1 / 60);
        theTime1 = parseInt(theTime1 % 60)
      }
    }

    t.setData({
      hour: theTime2 < 10 ? '0' + theTime2 : theTime2,
      minute: theTime1 < 10 ? '0' + theTime1 : theTime1,
      second: theTime < 10 ? '0' + theTime : theTime
    })
  },
  DiyFormHandler: function(t) {
    return o.DiyFormHandler(this, t)
  },
  selectArea: function(t) {
    return o.selectArea(this, t)
  },
  select:function(t){
    this.setData({
      active: "",
      slider: "out",
      showshare: 0,
      tempname: "",
      isSelected:true,
    })
  },
  bindChange: function(t) {
    return o.bindChange(this, t)
  },
  onCancel: function(t) {
    return o.onCancel(this, t)
  },
  onConfirm: function(t) {
    return o.onConfirm(this, t)
  },
  getIndex: function(t, e) {
    return o.getIndex(t, e)
  },
  onShareAppMessage: function() {
    var that = this;
    var shareMessage = e.onShareAppMessage("/pages/goods/detail/index?id=" + this.data.id);
    console.log(shareMessage)
    return {
      'title': that.data.goods.title,
      'path': shareMessage.path,
      success: function(e) {
        share_count++;
        if (share_count == 1)
          t.shareSendCoupon(that);
      }
    }
  },
  //cc_zhong 以下为新增分享相关
  showShare: function(t) {
    var a = this;
    a.setData({
      active: "active",
      slider: "in",
      showshare: 1
    })
  },
  goodsposter: function(t) { //商品海报
    var i = this;
    e.post("goods/poster/getimage", {
      id: i.data.id,
    }, function(t) {
      0 == t.error && i.setData({
        goodsposter: t.url
      });
      //i.emptyActive();
    })
  },
  showcoupon: function(t) { //coupon
    var a = this;
    var showModalStatus = a.data.showModalStatus ? false : true;
    a.setData({
      showModalStatus: showModalStatus,
    })
  },
  getcoupon: function(n) {
    var a = this;
    var couponid = n.currentTarget.dataset.id;
    if (!couponid || couponid == '') return e.alert('此优惠券无法领取！');
    e.post("goods/pay_coupon", {
      id: couponid,
    }, function(t) {
      if (0 == t.error) {
        e.alert('优惠券领取成功！'), a.setData({
          showModalStatus: false,
        });
      } else e.alert(t.message);
    })
  },
  //cc_zhong 快捷导航
  openmenu: function(n) {
    var a = this;
    var quickmen = a.data.quickmen ? false : true;
    quickmen ? a.menuani("open") : a.menuani("close");
    //animation.opacity(1).step(); 
    a.setData({
      quickmen: quickmen,
    });
  },
  play: function(e) {
    var url = e.target.dataset.url; //获取视频链接
    this.setData({
      videourl: url,
      videohide: '',
      videoshow: true,
    });
    var videoContext = wx.createVideoContext('video');
    videoContext.play();
  },
  close: function(e) {
    if (e.target.id == 'video') {
      return true;
    }
    this.setData({
      videohide: "videohide",
      videoshow: false
    });
    var videoContext = wx.createVideoContext('video');
    videoContext.pause();
  },
  hide: function(e) {
    if (e.detail.current == 0) {
      this.setData({
        img_hide: ""
      });
    } else {
      this.setData({
        img_hide: "videohide"
      });
    }
  },
  closeCouponBox: function(e) {
    this.setData({
      coupon_list: ""
    });
  },
  menuani: function(currentStatu) {
    //关闭抽屉  
    if (currentStatu == "close") {
      var animation = wx.createAnimation({
        duration: 400, //动画时长  
        timingFunction: "linear", //线性  
        delay: 0 //0则不延迟  
      });
      var animation1 = wx.createAnimation({
        duration: 400, //动画时长  
        timingFunction: "linear", //线性  
        delay: 0 //0则不延迟  
      });
      var animation2 = wx.createAnimation({
        duration: 400, //动画时长  
        timingFunction: "linear", //线性  
        delay: 0 //0则不延迟  
      });
      var animation3 = wx.createAnimation({
        duration: 400, //动画时长  
        timingFunction: "linear", //线性  
        delay: 0 //0则不延迟  
      });

      animation.translateY(0).step()
      animation1.translateY(0).step()
      animation2.translateY(0).step()
      animation3.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        animationData1: animation1.export(),
        animationData2: animation2.export(),
        animationData3: animation3.export(),
      })
      // 第5步：设置定时器到指定时候后，执行第二组动画  
      setTimeout(function() {
        // 执行第二组动画：Y轴不偏移，停  
        animation.translateY(240).step()
        animation1.translateY(180).step()
        animation2.translateY(120).step()
        animation3.translateY(60).step()
        // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
        this.setData({
          animationData: animation,
          animationData1: animation1,
          animationData2: animation2,
          animationData3: animation3,
        })
      }.bind(this), 0)
      setTimeout(function() {
        this.setData({
          flag: true
        });
      }.bind(this), 400)

    }
    // 显示抽屉  
    if (currentStatu == "open") {
      /* 动画部分 */
      // 第1步：创建动画实例   
      var animation = wx.createAnimation({
        duration: 400, //动画时长  
        timingFunction: "linear", //线性  
        delay: 0 //0则不延迟  
      });
      var animation1 = wx.createAnimation({
        duration: 400, //动画时长  
        timingFunction: "linear", //线性  
        delay: 0 //0则不延迟  
      });
      var animation2 = wx.createAnimation({
        duration: 400, //动画时长  
        timingFunction: "linear", //线性  
        delay: 0 //0则不延迟  
      });
      var animation3 = wx.createAnimation({
        duration: 400, //动画时长  
        timingFunction: "linear", //线性  
        delay: 0 //0则不延迟  
      });

      // 第2步：这个动画实例赋给当前的动画实例  
      // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停 
      animation.translateY(240).step()
      animation1.translateY(180).step()
      animation2.translateY(120).step()
      animation3.translateY(60).step()
      this.setData({
        animationData: animation.export(),
        animationData1: animation1.export(),
        animationData2: animation2.export(),
        animationData3: animation3.export(),
      })

      // 第5步：设置定时器到指定时候后，执行第二组动画  
      setTimeout(function() {
        // 执行第二组动画：Y轴不偏移，停  
        animation.translateY(0).step()
        animation1.translateY(0).step()
        animation2.translateY(0).step()
        animation3.translateY(0).step()
        // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
        this.setData({
          animationData: animation,
          animationData1: animation1,
          animationData2: animation2,
          animationData3: animation3,
        })
      }.bind(this), 0)
      this.setData({
        flag: false
      });
    }
  },
  activityPicker: function() {
    this.setData({
      fadein: "in"
    });
  },
  actOutPicker: function() {
    this.setData({
      fadein: ""
    });
  },
  hintclick: function() {
    wx.openSetting({
      success: function(t) {}
    });
  },
  cancelclick: function() {
    this.setData({
      modelShow: !1
    }),wx.openSetting({
      success: function (t) { }
    });
  },
  confirmclick: function() {
    this.setData({
      modelShow: !1
    })
  },
  navigate: function(t) {
    var e = t.currentTarget.dataset.url,
      a = t.currentTarget.dataset.phone,
      o = t.currentTarget.dataset.appid,
      i = t.currentTarget.dataset.appurl;
    e && wx.navigateTo({
      url: e
    }), a && wx.makePhoneCall({
      phoneNumber: a
    }), o && wx.navigateToMiniProgram({
      appId: o,
      path: i
    })
  },
  nav: function() {
    this.setData({
      nav_mask: !this.data.nav_mask
    });
  },
  nav2: function() {
    this.setData({
      nav_mask2: !this.data.nav_mask2
    });
  },
  package: function() {
    var t = this;
    e.get("package.get_list", {
      goodsid: this.data.packagegoodsid
    }, function(e) {
      console.log(e.list[0]), t.setData({
        packageList: e.list[0]
      });
    });
  },
})