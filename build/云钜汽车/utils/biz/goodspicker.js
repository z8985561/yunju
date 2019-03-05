var t = getApp(), a = (t.requirejs("jquery"), t.requirejs("core")), o = t.requirejs("foxui"), e = t.requirejs("biz/diyform");

module.exports = {
    number: function(t, e) {
        var d = a.pdata(t), i = o.number(e, t), s = (d.id, d.optionid, d.min);
        d.max, 1 == i && 1 == d.value && "minus" == t.target.dataset.action || i < s && "minus" == t.target.dataset.action ? o.toast(e, "单次最少购买" + d.value + "件") : d.value == d.max && "plus" == t.target.dataset.action || (e.data.stock < i ? o.toast(e, "库存不足") : e.setData({
            total: i
        }));
    },
    inputNumber: function(t, a) {

        var e = a.data.goods.maxbuy, d = a.data.goods.minbuy, i = t.detail.value;
        if (i > 0) {
            if (e > 0 && e <= parseInt(t.detail.value) && (i = e, o.toast(a, "单次最多购买" + e + "件")), 
            d > 0 && d > parseInt(t.detail.value) && (i = d, o.toast(a, "单次最少购买" + d + "件")), 
            console.log(a.data.stock), a.data.stock < i) return void o.toast(a, "库存不足");
        } else i = d > 0 ? d : 1;
        a.setData({
            total: i
        });
    },
    buyNow: function(t, d, i) {
        var s = d.data.optionid, r = d.data.goods.hasoption, n = d.data.diyform, c = d.data.giftid;
        if (9 == d.data.goods.type) var l = d.data.checkedDate / 1e3;
        if (r > 0 && !s) return console.log(s), console.log(r), void o.toast(d, "请选择规格");
        if (n && n.fields.length > 0) {
            if (!e.verify(d, n)) return;
            console.log(n.f_data), a.post("order/create/diyform", {
                id: d.data.id,
                diyformdata: n.f_data
            }, function(t) {
                0 == d.data.goods.isgift || "goods_detail" != i ? wx.redirectTo({
                    url: "/pages/order/create/index?id=" + d.data.id + "&total=" + d.data.total + "&optionid=" + s + "&gdid=" + t.gdid + "&selectDate=" + l
                }) : "" != c || 1 == d.data.goods.gifts.length ? (1 == d.data.goods.gifts.length && (c = d.data.goods.gifts[0].id), 
                wx.redirectTo({
                    url: "/pages/order/create/index?id=" + d.data.id + "&total=" + d.data.total + "&optionid=" + s + "&gdid=" + t.gdid + "&giftid=" + c
                })) : o.toast(d, "请选择赠品");
            });
        } else 0 == d.data.goods.isgift || "goods_detail" != i ? wx.redirectTo({
            url: "/pages/order/create/index?id=" + d.data.id + "&total=" + d.data.total + "&optionid=" + s + "&selectDate=" + l
        }) : "" != c || 1 == d.data.goods.gifts.length ? (1 == d.data.goods.gifts.length && (c = d.data.goods.gifts[0].id), 
        wx.redirectTo({
            url: "/pages/order/create/index?id=" + d.data.id + "&total=" + d.data.total + "&optionid=" + s + "&giftid=" + c
        })) : o.toast(d, "请选择赠品");
    },
    getCart: function(t, d) {
        var i = d.data.optionid, s = d.data.goods.hasoption, r = d.data.diyform;
        if (s > 0 && !i) o.toast(d, "请选择规格"); else if (r && r.fields.length > 0) {
            if (!e.verify(d, r)) return;
            a.post("order/create/diyform", {
                id: d.data.id,
                diyformdata: r.f_data
            }, function(t) {
                console.log(d.data), a.post("member/cart/add", {
                    id: d.data.id,
                    total: d.data.total,
                    optionid: i,
                    diyformdata: r.f_data
                }, function(t) {
                    0 == t.error && (d.setData({
                        "goods.carttotal": t.carttotal,
                        active: "",
                        slider: "out",
                        isSelected: !0,
                        tempname: ""
                    }), o.toast(d, "添加成功"));
                });
            });
        } else a.post("member/cart/add", {
            id: d.data.id,
            total: d.data.total,
            optionid: i
        }, function(t) {
            0 == t.error && (d.setData({
                "goods.carttotal": t.carttotal,
                active: "",
                slider: "out",
                isSelected: !0,
                tempname: ""
            }), o.toast(d, "添加成功"));
        });
    },
    selectpicker: function(t, o, e) {
        var d = o.data.active, i = t.currentTarget.dataset.id;
        "" == d && o.setData({
            slider: "in",
            show: !0
        }), a.get("goods/get_picker", {
            id: i
        }, function(a) {
            var d = a.options;
            if ("goodsdetail" == e) o.setData({
                pickerOption: a,
                canbuy: o.data.goods.canbuy,
                buyType: t.currentTarget.dataset.buytype,
                options: d,
                minpicker: e
            }), s = 0 != a.goods.minbuy && o.data.total < a.goods.minbuy ? a.goods.minbuy : o.data.total; else if (o.setData({
                pickerOption: a,
                goods: a.goods,
                options: d,
                minpicker: e
            }), 0 != a.goods.minbuy && o.data.total < a.goods.minbuy) s = a.goods.minbuy; else var s = 1;
            a.diyform && o.setData({
                diyform: {
                    fields: a.diyform.fields,
                    f_data: a.diyform.lastdata
                }
            }), o.setData({
                id: i,
                pagepicker: e,
                total: s,
                tempname: "select-picker",
                active: "active",
                show: !0
            });
        });
    },
    specsTap: function(t, a) {
        var e = a.data.specs;
        e[t.target.dataset.idx] = {
            id: t.target.dataset.id,
            title: t.target.dataset.title
        }, console.log(e);
        var d = "", i = "";
        e.forEach(function(t) {
            d += t.title + ";", i += t.id + "_";
        }), i = i.substring(0, i.length - 1);
        var s = a.data.options;
        "" != t.target.dataset.thumb && a.setData({
            "goods.thumb": t.target.dataset.thumb
        }), s.forEach(function(t) {
            t.specs == i && (a.setData({
                optionid: t.id,
                "goods.total": t.stock,
                "goods.maxprice": t.marketprice,
                "goods.minprice": t.marketprice,
                "goods.marketprice": t.marketprice
            }), t.stock < a.data.total ? (a.setData({
                canBuy: "库存不足",
                stock: t.stock
            }), o.toast(a, "库存不足")) : a.setData({
                canBuy: "",
                stock: t.stock
            }));
        }), a.setData({
            specsData: e,
            specsTitle: d
        });
    }
};