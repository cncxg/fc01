var a = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var e = a.siteInfo.uniacid, i = this;
        a.util.request({
            url: "entry/wxapp/new",
            data: {
                m: "monaiapp_house",
                uniacid: e,
                project_id: t.project_id
            },
            cachetime: "0",
            success: function(t) {
                console.log(t);
                for (var e = 0; e < t.data.data.length; e++) t.data.data[e].time = a.toDate(t.data.data[e].time);
                i.setData({
                    sale: t.data.data
                });
            }
        });
    }
});