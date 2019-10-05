var a = getApp(), t = a.siteInfo.uniacid;

Page({
    data: {
        name: "",
        avatarUrl: null,
        pictures: [],
        urls: null
    },
    onLoad: function(e) {
        var i = this, s = e.id, n = e.build;
        this.setData({
            name: n
        }), a.util.request({
            url: "entry/wxapp/saleinfo",
            data: {
                m: "monaiapp_house",
                uniacid: t,
                id: s
            },
            cachetime: "0",
            success: function(a) {
                console.log(a);
                for (var t = 0; t < a.data.data.length; t++) i.data.pictures.push(a.data.data[t].img);
                i.setData({
                    houseType: a.data.data,
                    pictures: i.data.pictures
                });
            }
        });
    },
    bindViewTap: function() {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var e = t.tempFilePaths;
                a.setData({
                    avatarUrl: e
                });
            },
            fail: function(a) {},
            complete: function(a) {}
        });
    },
    previewImage: function(a) {
        var t = this, e = a.currentTarget.dataset.index, i = t.data.pictures;
        wx.previewImage({
            current: i[e],
            urls: i
        });
    }
});