var t = require("../../wxParse/wxParse.js"), a = getApp();

Page({
    data: {
        indicatorDots: !1,
        autoplay: !1,
        interval: 5e3,
        duration: 1e3,
        winWidth: 0,
        winHeight: 0,
        swiArr: [],
        clientHeight: 0,
        show: !1
    },
    onLoad: function(t) {},
    onShow: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    clientHeight: t.windowHeight
                });
            }
        }), e.setData({
            currentTab: 0
        });
        var n = a.siteInfo.uniacid;
        a.util.request({
            url: "entry/wxapp/move",
            data: {
                m: "monaiapp_house",
                uniacid: n
            },
            cachetime: "0",
            success: function(a) {
                var n = [];
                if (a.data.data.length > 1) {
                    n.push(a.data.data[0].content), n.push(a.data.data[1].content);
                    for (var r = 0; r < n.length; r++) t.wxParse("reply" + r, "html", n[r], e), r === n.length - 1 && t.wxParseTemArray("replyTemArray", "reply", n.length, e);
                    e.setData({
                        detile: a.data.data,
                        swiArr: [ a.data.data[0].name, a.data.data[1].name ]
                    });
                } else e.setData({
                    article_content: t.wxParse("article_content", "html", a.data.data[0].content, e, 5),
                    swiArr: [ a.data.data[0].name ],
                    show: !0
                });
            }
        });
    },
    scroll: function(t) {
        this.setData({
            scrollTop: t.detail.scrollTop
        });
    },
    bindChange: function(t) {
        this.setData({
            currentTab: t.detail.current
        });
    },
    swichNav: function(t) {
        var a = this;
        if (this.data.currentTab === t.target.dataset.current) return !1;
        a.setData({
            currentTab: t.target.dataset.current
        });
    }
});