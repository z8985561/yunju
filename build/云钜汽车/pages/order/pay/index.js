var t = getApp(), e = t.requirejs("core"), i = t.requirejs("foxui");
Page({
	data : {
		icons : t.requirejs("icons"),
		success : !1,
    show_share:!1,
		successData : {},
    approot: t.globalData.approot,
    canPay:!1
	},
	onLoad : function (e) {
    console.log(e);
		this.setData({
			options : e,
		}),
		t.url(e)
	},
	onShow : function () {
    t.checkAccount();
		this.get_list()
	},
	get_list : function () {
		var t = this;
    console.log(t.data.options);
		e.get("order/pay", t.data.options, function (i) {
      if (i.error != 0) {
        wx.showModal({
          title: '提示',
          content: i.message,
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: "/pages/order/index"
              });
            } else if (res.cancel) {
              wx.navigateTo({
                url: "/pages/order/index"
              });
            }
          }
        })
      }

			if (50018 == i.error)
				return void wx.navigateTo({
					url : "/pages/order/detail/index?id=" + t.data.options.id
				});
			!i.wechat.success && "0.00" != i.order.price && i.wechat.payinfo && e.alert(i.wechat.payinfo.message + "\n不能使用微信支付!"),
			t.setData({
				list : i,
				show : !0
			})
		})
	},
	pay : function (t) {
		var i = e.pdata(t).type,
		o = this,
		a = this.data.list.wechat,
    orderid = o.data.options.id;
    e.get('order/pay/check', { id: orderid }, function (result) {
      if (result.error != 0) {
        wx.showModal({
          title: '提示',
          content: result.message,
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: "/pages/order/index"
              });
            } else if (res.cancel) {
              wx.navigateTo({
                url: "/pages/order/index"
              });
            }
          }
        })
      } else {
        "wechat" == i ? e.pay(a.payinfo, function (t) {
          "requestPayment:ok" == t.errMsg && o.complete(i)
        }) : "credit" == i ? e.confirm("确认要支付吗?", function () {
          o.complete(i)
        }, function () { }) : "cash" == i ? e.confirm("确认要使用货到付款吗?", function () {
          o.complete(i)
        }, function () { }) : o.complete(i)
      }
    });
		
	},
	complete : function (t) {
		var o = this;
		e.post("order/pay/complete", {
			id : o.data.options.id,
			type : t
		}, function (t) {
			if (0 == t.error)
				return wx.setNavigationBarTitle({
					title : "支付成功"
				}), void o.setData({
					success : !0,
          show_share: t.show_share,
					successData : t
				});
			i.toast(o, t.message)
		}, !0, !0)
	},
	shop : function (t) {
		0 == e.pdata(t).id ? this.setData({
			shop : 1
		}) : this.setData({
			shop : 0
		})
	},
	phone : function (t) {
		e.phone(t)
	},
  getShareTicket: function (options) {
    var t = this;
    var orderid=t.data.successData.order.id;
    var money =parseFloat(t.data.successData.order.price);
    e.get("sale/coupon/share/getStatus", { 'money': money, 'orderid': orderid},function (res) {
        t.setData({
          show_share:!1
        });
        if (res.status == 'success') {
          wx.navigateTo({
            url: '/pages/sale/coupon/unclaimed/index?sid='+res.did+'&orderid='+res.orderid,
          })
        } else {
          e.alert(res.message);
        }
      })
  },
  closeShareTicket:function(){
    var t=this;
    t.setData({
      show_share:!1
    })
  },
  //cc_zhong 全付通支付
  swiftpay: function (t) {
    var t = this;
    e.get("changce/swift/dopay", t.data.options, function (a) {
      if (!a.token){
        return void e.alert(a.message);
        //return void wx.navigateBack();
      }else{
        var result = JSON.parse(a.pay_info);
        wx.requestPayment({
          'timeStamp': result.timeStamp,
          'nonceStr': result.nonceStr,
          'package': result.package,
          'signType': 'MD5',
          'paySign': result.paySign,
          'success': function (res) {
            //t.complete('swift');
            wx.showModal({
              title: '支付成功',
              content: '如订单状态未变更，可耐心等待片刻！',
              showCancel: false,
              confirmText: '确定',
              success: function (res) {
                return void wx.navigateTo({
                  url: "/pages/order/detail/index?id=" + t.data.options.id
                });
              }
            })
          },
          'fail': function (res) {
            e.alert('支付失败！');
          }
        })
      }
    })
  },

  
  checkOrder:function(func){
    var o =this;
    var orderid = o.data.options.id;
    e.get('order/pay/check',{id:orderid},function(result){
      if (result.error!=0){
         wx.showModal({
            title: '提示',
            content: result.message,
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: "/pages/order/index"
                });
              } else if (res.cancel) {
                wx.navigateTo({
                  url: "/pages/order/index"
                });
              }
            }
          })
        }else{
          func
        }
    });
  }
})
