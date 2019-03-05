var e = getApp(), a = e.requirejs("jquery"), t = e.requirejs("core");

e.requirejs("foxui"), module.exports = {
    get: function(e, i, o) {
        t.get("diypage", {
            type: i
        }, function(i) {
            i.diypage = i.diypage || {};
            for (var r in i.diypage.items) "topmenu" == i.diypage.items[r].id && e.setData({
                topmenu: i.diypage.items[r]
            });
            e.setData({
                customer: i.customer,
                phone: i.phone,
                phonecolor: i.phonecolor,
                phonenumber: i.phonenumber,
                customercolor: i.customercolor
            });
            var p = {
                loading: !1,
                pages: i.diypage.page,
                usediypage: !0,
                startadv: i.startadv
            };
            if (i.diypage.page && e.setData({
                diytitle: i.diypage.page.title
            }), 0 == i.error) {
                if (void 0 != i.diypage.items) {
                    var g = [];
                    if (a.each(i.diypage.items, function(a, o) {
                        if (g.push(o.id),"topmenu" == o.id) e.setData({
                            topmenu: o,
                            istopmenu: !0
                        }), r = o.data[0].linkurl, t.get("diypage/getInfo", {
                            dataurl: r
                        }, function(a) {
                            o.data[0].data = a.goods.list, p.diypages = i.diypage, p.topmenuDataType = a.type, 
                            e.setData(p);
                        }); else if ("tabbar" == o.id) {
                            var r = o.data[0].linkurl;
                            t.get("diypage/getInfo", {
                                dataurl: r
                            }, function(a) {
                                o.data[0].data = a.goods.list, o.type = a.type, p.diypages = i.diypage, p.tabbarDataType = a.type, 
                                p.tabbarData = a.goods, e.setData(p);
                            });
                        }
                    }), wx.setNavigationBarTitle({
                        title: p.pages.title
                    }), wx.setNavigationBarColor({
                        frontColor: p.pages.titlebarcolor,
                        backgroundColor: p.pages.titlebarbg
                    }), o && o(i), -1 != g.indexOf("topmenu") || -1 != g.indexOf("tabbar")) return;
                    p.diypages = i.diypage, e.setData(p);
                }
                wx.setNavigationBarTitle({
                    title: p.pages.title
                }), wx.setNavigationBarColor({
                    frontColor: p.pages.titlebarcolor,
                    backgroundColor: p.pages.titlebarbg
                }), o && o(i);
            } else e.setData({
                diypages: !1,
                loading: !1
            });
        });
    }
};