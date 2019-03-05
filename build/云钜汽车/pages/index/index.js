function t(t, a, e) {
  return a in t ? Object.defineProperty(t, a, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[a] = e, t;
}

var t = getApp(), a = t.requirejs("core"), e = (t.requirejs("icons"), t.requirejs("wxParse/wxParse")), i = t.requirejs("biz/goodspicker");
var share_count = 0;
Page({
	data : {
    approot: t.globalData.approot,
		route : "home",
		icons : t.requirejs("icons"),
		shop : {},
    diydata:{},
    startadv: {},
    closestartadv:0,
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 500,
    circular: true,
		storeRecommand : [],
		total : 0,
		page : 1,
		loaded : !1,
		loading : !0,
    show:!1,
		indicatorDotsHot : !1,
		autoplayHot : !0,
		intervalHot : 5e3,
		durationHOt : 1e3,
		circularHot : !0,
		hotimg : "/static/images/hotdot.jpg",
		notification : "/static/images/notification.png",
    dm_index: 0,
    dm_json: [],
    modelPhoneShow:!1,
    specs: [],
    diyform: {},
    specsTitle: ""
	},
  wxParseTagATap: function (t) {
    t.target = '';
    if (t.currentTarget.dataset.src) {
      wx.navigateTo({
        url: t.currentTarget.dataset.src,
      })
    }
  },
	getShop : function () {
		var t = this;
    a.get("diypage/index/main", {'type':'index'}, function (a) {
			//e.wxParse("wxParseData", "html", a.copyright, t, "5"),
      console.log(a);
      t.setData({
        customer:a.customer,
        customercolor:a.customercolor,
        phone:a.phone,
        phonenumber:a.phonenumber,
        qrcode:a.qrcode,
        qrcodethumb:a.qrcodethumb,
        phonecolor: a.phonecolor
      })
      if (a.diypage.page.title){
        wx.setNavigationBarTitle({
          title: a.diypage.page.title
        })
      }
      if (a.diypage.page.titlebarbg) {
        wx.setNavigationBarColor({
          frontColor: a.diypage.page.titlebarcolor,
          backgroundColor: a.diypage.page.titlebarbg
        })
      }
      var htmlindex = 0;
      //var htmlArr = [];
      for (var ii in a.diypage.items) {
        //console.log(ii + "for...in用法\t" + a.diypage.items[ii].id);
        if (a.diypage.items[ii].id =='richtext'){
          //console.log(ii);
          //e.wxParse("wxParseData", "html", a.diypage.items[ii].params.content, t, "5");
          e.wxParse("htmlcontent" + htmlindex, "html", a.diypage.items[ii].params.content, t, "5");
          a.diypage.items[ii].params.htmlindex = htmlindex;
          //console.log(wxParseData);
          htmlindex++;
        }
        if (a.diypage.items[ii].id == 'fixedsearch'){//处理接口返回的icon样式不对问题
          if (a.diypage.items[ii].params.leftnavicon != '') a.diypage.items[ii].params.leftnavicon = a.diypage.items[ii].params.leftnavicon.replace('icon','icox');
          if (a.diypage.items[ii].params.rightnavicon != '') a.diypage.items[ii].params.rightnavicon = a.diypage.items[ii].params.rightnavicon.replace('icon', 'icox');
        }
        if (a.diypage.items[ii].id == 'goods') {//处理商品组自定义图标路径问题
          if (a.diypage.items[ii].params.goodsiconsrc && a.diypage.items[ii].params.goodsiconsrc != '' && a.diypage.items[ii].params.goodsiconsrc.indexOf('http://')==-1){
            a.diypage.items[ii].params.goodsiconsrc = t.data.approot.replace('/addons/ewei_shopv2/','/attachment/') + a.diypage.items[ii].params.goodsiconsrc;
            //console.log(a.diypage.items[ii].params.goodsiconsrc);
          }
          if (a.diypage.items[ii].params.showicon==2 && a.diypage.items[ii].params.iconposition && a.diypage.items[ii].params.iconposition!=''){//图标位置参数
            a.diypage.items[ii].params.iconleftname = a.diypage.items[ii].params.iconposition.indexOf('right')==-1?'left':'right';
            a.diypage.items[ii].params.icontopname = a.diypage.items[ii].params.iconposition.indexOf('bottom') == -1 ? 'top' : 'bottom';
          }
        }
        if (a.diypage.items[ii].id == 'video') {//处理视频高度
          if (a.diypage.items[ii].params.poster && a.diypage.items[ii].params.poster != '' && a.diypage.items[ii].params.poster.indexOf('http://') == -1) {
            a.diypage.items[ii].params.poster = t.data.approot.replace('/addons/ewei_shopv2/', '/attachment/') + a.diypage.items[ii].params.poster;
          }
          wx.getSystemInfo({
            success: function (st) {
              //console.log(st.windowWidth);
              var videow = st.windowWidth;
              var hei = videow;
              if (a.diypage.items[ii].style.ratio == 1) hei = videow*3/4;
              else if (a.diypage.items[ii].style.ratio == 0) hei = videow * 9 / 16;
              //console.log(hei);
              a.diypage.items[ii].style.height = hei;
            }
          })
        }
      }
      if (htmlindex > 0) e.wxParseTemArray("wxParseData", 'htmlcontent', htmlindex, t);
      //console.log(htmlArr);
			t.setData({
        diydata: a.diypage,
        startadv: a.startadv,
        loading:0,
        show:1
			})
		})
	},
	onReachBottom : function () {
		//this.data.loaded || this.data.storeRecommand.length == this.data.total || this.getRecommand()
	},
	getRecommand : function () {
		var t = this;
		t.setData({
			loading : !0
		}),
		a.get("shop/get_recommand", {
			page : t.data.page
		}, function (a) {
			var e = {
				loading : !1,
				total : a.total
			};
			t.setData({
				loading : !1,
				total : a.total,
				show : !0
			}),
			a.list || (a.list = []),
			a.list.length > 0 && (t.setData({
					storeRecommand : t.data.storeRecommand.concat(a.list),
					page : a.page + 1
				}), a.list.length < a.pagesize && (e.loaded = !0))
		})
	},
  onLoad: function (options) {
    options = options || {};
    var that =this;
    wx.getSetting({
      success: function (t) {
        console.log(t);
        t.authSetting["scope.userInfo"] ? that.setData({
          modelShow: !1
        }) : that.setData({
          modelShow: !0
        });
      }
    });
    var e = decodeURIComponent(options.scene);
    console.log(options.scene);
    if (!options.id && e) {
      var s = a.str2Obj(e);
      options.id = s.id, s.mid && (options.mid = s.mid);
    }
    t.url(options);
    this.getShop();
  },
  loadImage() {
    //加载缩略图
    this.setData({
      msg: '大图正在拼命加载..',
      imgUrl: imgUrlThumbnail
    })

    //同时对原图进行预加载，加载成功后再替换
    this.imgLoader.load(imgUrlOriginal, (err, data) => {
      console.log('图片加载完成', err, data.src)
      this.setData({ msg: '大图加载完成~' })

      if (!err)
        this.setData({ imgUrl: data.src })
    })
  },
	onShow : function () {
    t.checkAccount();
		var a = t.getCache("sysset");
    var that=this;
		wx.setNavigationBarTitle({
			title : a.shopname || "商城首页"
		})
    wx.getStorage({
      key: "mydata",
      success: function (e) {
        wx.removeStorage({
          key: "mydata",
          success: function (t) { }
        })
      }
    }), wx.getSetting({
      success: function (a) {
        var e = a.authSetting["scope.userInfo"];
        console.log(e), that.setData({
          limits: e
        });
      }
    });
    that.get_danmu();
	},
  get_danmu: function () {
    var t = this;
    var dm_index = 0;
    var showtext = '';
    a.get("shop/get_danmu", {}, function (res) {
      if (res.error == 0) {
        var timer =setInterval(function () {
          var data = res.list[dm_index];
          if (data['type'] == 0) {
            showtext = "新订单来自 " + data.nickname;
          } else if (data['type'] == 1){
            showtext = "新充值来自 " + data.nickname;
          }else if (data['type'] == 2) {
            showtext = "恭喜 " + data.nickname + "加入会员，财富大门为您打开！";
          } else if (data['type'] == 3) {
            showtext = "恭喜 " + data.nickname + "加入分销，财富大门为您打开！";
          }
          t.setData({
            headimgurl: data.headimgurl,
            showtext: showtext,
            showtime: data.time
          })
          if (dm_index == 0) {
            t.setData({
              displaycss: "flex"
            })
          } else {
            t.setData({
              displayshow: "show"
            })

          }
          if (dm_index == res.list.length - 1) {
            dm_index = 0;
          } else {
            dm_index++;
          }
          setTimeout(function () {
            t.setData({
              displayshow: "noshow",
              displaycss: ""
            })
          }, 2000);
        }, 3000);

        t.setData({
          dm_json: res.list,
          timer:timer
        })
      }
    })
  },
  onHide:function(){
    var timer = this.data.timer;
    clearInterval(timer)
  },
	onShareAppMessage : function () {
    var that = this;
    var shareMessage = a.onShareAppMessage();
		return {
      'title': shareMessage.title,
      'desc' :shareMessage.desc,
      'path':shareMessage.path,
      success:function(e){
        console.log(e);
          share_count++;
          if (share_count == 1)
            t.shareSendCoupon(that);
      }
    }
	},
	imagesHeight : function (t) {
		var a = t.detail.width,
		e = t.detail.height,
		o = t.target.dataset.type,
		i = {},
		s = this;
		wx.getSystemInfo({
			success : function (t) {
				i[o] = t.windowWidth / a * e,
				(!s.data[o] || s.data[o] && i[o] < s.data[o]) && s.setData(i)
			},
      complete:function(t){
        i[o] = t.windowWidth / a * e,
        (!s.data[o] || s.data[o] && i[o] < s.data[o]) && s.setData(i)
      }
		})
	},
  closestartadv: function (t) {//cc_zhong 关闭启动广告
    this.setData({
      closestartadv: 1
    })
  },
  closeCouponBox: function (e) {
    this.setData({
      coupon_list: ""
    });
  },
  showImage:function(e){
    console.log(e);
    var currentImg = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: [currentImg],
    })

  },
  cancelclick: function() {
    this.setData({
      modelShow: !1
    });
  }, 
  confirmclick:function () {
    this.setData({
      modelShow: !1
    });
  },
  userinfo:function(options) {
    var a = options.detail.iv, e = options.detail.encryptedData;
    t.getUserInfo(null, null, {
      iv: a,
      encryptedData: e
    });
  },
  phone:function() {
    var t = this.data.phonenumber + "";
    wx.makePhoneCall({
      phoneNumber: t
    })
  },
  navigate:function(t) {
    var a = t.currentTarget.dataset.url,
      e = t.currentTarget.dataset.phone,
      o = t.currentTarget.dataset.appid,
      i = t.currentTarget.dataset.appurl;
    a && wx.navigateTo({
      url: a
    }), e && wx.makePhoneCall({
      phoneNumber: e
    }), o && wx.navigateToMiniProgram({
      appId: o,
      path: i
    });
  },
  selectPicker: function (t) {
    var a = this;
    wx.getSetting({
      success: function (e) {
        if (e.authSetting["scope.userInfo"]) {
          i.selectpicker(t, a, "goodslist"), a.setData({
            cover: "",
            showvideo: !1
          });
        } else a.setData({
          modelShow: !0
        });
      }
    });
  },
  specsTap: function (t) {
    var a = this;
    console.log(a.data.specs);
    console.log(t);
    i.specsTap(t, a);
  },
  emptyActive: function () {
    this.setData({
      active: "",
      slider: "out",
      tempname: "",
      specsTitle: ""
    });
  },
  buyNow: function (t) {
    var e = this;
    i.buyNow(t, e);
  },
  getCart: function (t) {
    var e = this;
    i.getCart(t, e);
  },
  select: function () {
    var t = this;
    i.select(t);
  },
  inputNumber: function (t) {
    var e = this;
    i.inputNumber(t, e);
  },
  number: function (t) {
    var e = this;
    i.number(t, e);
  },
  onChange: function (t) {
    return s.onChange(this, t);
  },
  DiyFormHandler: function (t) {
    return s.DiyFormHandler(this, t);
  },
  selectArea: function (t) {
    return s.selectArea(this, t);
  },
  bindChange: function (t) {
    return s.bindChange(this, t);
  },
  onCancel: function (t) {
    return s.onCancel(this, t);
  },
  onConfirm: function (t) {
    return s.onConfirm(this, t);
  },
  getIndex: function (t, e) {
    return s.getIndex(t, e);
  },

})
