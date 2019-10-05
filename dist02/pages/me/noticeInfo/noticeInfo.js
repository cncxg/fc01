var t = getApp().data.url, a = getApp();

Page({
    data: {
        notice: [],
        description: "",
        url: t
    },
    onLoad: function(e) {
        var o = this;
        wx.request({
            url: t + "/company.notice/getNoticeNoe.html",
            data: {
                id: e.id
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                var e = a.towxml.toJson(t.data.content, "markdown");
                o.setData({
                    notice: t.data,
                    description: e
                });
            }
        });
    }
});