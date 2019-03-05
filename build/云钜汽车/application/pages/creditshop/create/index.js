var t = getApp(), e = t.requirejs("core"), s = (t.requirejs("icons"), t.requirejs("foxui"));

t.requirejs("wxParse/wxParse"), t.requirejs("jquery"), Page({
    data: {
        paymentmodal: !1,
        showmodal: !1,
        successmodal: !1,
        member: [],
        goods: [],
        options: [],
        carrierInfo: [],
        stores: [],
        is_openmerch: !1,
        isverify: !1,
        iswechat: !0,
        iscredit: !0,
        paytype: "",
        togglestore: "",
        addressid: 0,
        dispatchprice: 0,
        allprice: 0,
        logid: 0,
        successmessage: "",
        successstatus: !1
    },
    onLoad: function(t) {
        var e = this;
        t = t || {}, wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    windowWidth: t.windowWidth,
                    windowHeight: t.windowHeight
                });
            }
        }), e.setData({
            options: t
        });
    },
    onShow: function() {
        var e = this, s = t.getCache("isIpx"), a = t.getCache("orderAddress"), o = t.getCache("orderShop");
        o && e.setData({
            carrierInfo: o
        }), e.data.addressid != a.id && a.id > 0 && (e.setData({
            addressid: a.id
        }), e.dispatch()), s ? e.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : e.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), "" == e.data.member && e.getDetail(), wx.getSetting({
            success: function(t) {
                var s = t.authSetting["scope.userInfo"];
                e.setData({
                    limits: s
                });
            }
        });
    },
    listChange: function(t) {
        var e = this.data.member;
        switch (t.target.id) {
          case "realname":
            e.realname = t.detail.value;
            break;

          case "mobile":
            e.mobile = t.detail.value;
        }
        this.setData({
            member: e
        });
    },
    getDetail: function() {
        var t = this, s = t.data.options;
        e.get("creditshop/create", s, function(e) {
            0 == e.error && (e.goods.num = 1, t.setData({
                goods: e.goods,
                address: e.address,
                shop: e.shop,
                stores: e.stores,
                isverify: e.goods.isverify,
                member: e.member,
                addressid: e.address.id
            }), 0 == e.goods.isverify && 0 == e.goods.type && e.address.id > 0 ? t.dispatch() : t.setData({
                allprice: e.goods.money
            }));
        });
    },
    dispatch: function() {
        e.get("creditshop/create/dispatch", {
            goodsid: result.goods.id,
            optionid: options.id
        }, function(t) {
            allprice = t.dispatch, allprice = parseFloat(allprice) + parseFloat(result.goods.money), 
            $this.setData({
                dispatchprice: t.dispatch,
                allprice: allprice
            });
        });
    },
    number: function(t) {
        var a = this, o = a.data.goods, i = a.data.options, d = t.target.dataset.action;
        "minus" == d ? o.num = parseInt(o.num) - 1 : "plus" == d && (o.num = parseInt(o.num) + 1), 
        o.num < 1 && (o.num = 1);
        var r = o.num;
        e.get("creditshop/create/number", {
            goodsid: o.id,
            optionid: i.id,
            num: r
        }, function(t) {
            if (0 == t.goods.canbuy) return o.num > 1 && (o.num = parseInt(o.num) - 1), a.setData({
                goods: o
            }), void s.toast(a, t.goods.buymsg);
            (o = t.goods).num = r;
            var e = parseFloat(o.money * r) + parseFloat(o.dispatch);
            a.setData({
                goods: o,
                allprice: e
            });
        });
    },
    pay: function() {
        var t = this, e = t.data.goods;
        if (e.canbuy) {
            if (e.isverify > 0) {
                var a = t.data.member;
                if ("" == a.realname) return void s.toast(t, "请填写真实姓名");
                if ("" == a.mobile) return void s.toast(t, "请填写联系电话");
                if (0 == t.data.carrierInfo.length) return void s.toast(t, "请选择兑换门店");
            }
            0 != e.isverify || 0 != e.goodstype || 0 != e.type || 0 != t.data.addressid ? (1 == e.type && t.setData({
                addressid: 0
            }), t.setData({
                paymentmodal: !0
            })) : s.toast(t, "请选择收货地址");
        } else s.toast(t, t.data.goods.buymsg);
    },
    cancel: function() {
        this.setData({
            paymentmodal: !1,
            showmodal: !1
        });
    },
    payClick: function(t) {
        var e = this, s = t.target.dataset.type;
        e.setData({
            paymentmodal: !1,
            showmodal: !0,
            paytype: s
        });
    },
    confirm: function() {
        var t = this, a = t.data.paytype;
        e.get("creditshop/detail/pay", {
            id: t.data.goods.id,
            optionid: t.data.optionid,
            num: t.data.goods.num,
            paytype: t.data.paytype,
            addressid: t.data.addressid,
            storeid: t.data.carrierInfo.id
        }, function(o) {
            o.error > 0 ? s.toast(t, o.message) : (t.setData({
                logid: o.logid
            }), o.wechat && o.wechat.success && e.pay(o.wechat.payinfo, function(e) {
                "requestPayment:ok" == e.errMsg && t.lottery();
            }), "credit" == a && o.logid > 0 && t.lottery());
        });
    },
    success: function() {
        var t = this.data.logid;
        wx.redirectTo({
            url: "/application/pages/creditshop/log/detail/index?id=" + t
        });
    },
    lottery: function() {
        var t = this, a = "";
        0 == t.data.goods.type ? e.get("creditshop/detail/lottery", {
            id: t.data.goods.id,
            logid: t.data.logid
        }, function(e) {
            e.error > 0 ? s.toast(t, e.message) : (2 == e.status && (a = "恭喜您，商品兑换成功"), 3 == e.status && (1 == e.goodstype ? a = "恭喜您，优惠券兑换成功" : 2 == e.goodstype ? a = "恭喜您，余额兑换成功" : 3 == e.goodstype && (a = "恭喜您，红包兑换成功")), 
            t.setData({
                successmessage: a,
                successstatus: !0
            }));
        }) : (a = "努力抽奖中，请稍后....", t.setData({
            successmessage: a,
            successstatus: !0
        }), setTimeout(function() {
            e.get("creditshop/detail/lottery", {
                id: t.data.goods.id,
                logid: t.data.logid
            }, function(e) {
                e.error > 0 ? s.toast(t, e.message) : (2 == e.status ? a = "恭喜您，您中奖啦" : 3 == e.status ? 1 == e.goodstype ? a = "恭喜您，优惠券已经发到您账户啦" : 2 == e.goodstype ? a = "恭喜您，余额已经发到您账户啦" : 3 == e.goodstype && (a = "恭喜您，红包兑换成功") : a = "很遗憾，您没有中奖", 
                t.setData({
                    successmessage: a,
                    successstatus: !0
                }));
            });
        }, 1e3)), t.setData({
            successmodal: !0
        });
    },
    toggle: function(t) {
        var e = this;
        "" == e.data.togglestore ? e.setData({
            togglestore: "toggleSend-group"
        }) : e.setData({
            togglestore: ""
        });
    }
});