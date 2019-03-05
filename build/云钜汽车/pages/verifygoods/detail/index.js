var o = getApp(), e = o.requirejs("core");

o.requirejs("jquery"), Page({
    data: {
        verifygoods: []
    },
    onLoad: function(e) {
        this.setData({
            options: e
        }), o.url(e);
    },
    onShow: function() {
        this.get_detail();
    },
    get_detail: function() {
        var o = this;
        e.get("verifygoods/get_detail", o.data.options, function(t) {
            0 == t.error ? (console.log(t), o.setData({
                verifygoods: t.item,
                qrcode: t.qrcode,
                verifygoodlogs: t.verifygoodlogs,
                verifynum: t.verifynum,
                limitdatestr: t.limitdatestr,
                verifycode: t.verifycode
            })) : (5e4 != t.error && e.toast(t.message, "loading"), wx.redirectTo({
                url: "/pages/verifygoods/index"
            }));
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});