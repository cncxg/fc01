var t = getApp(), a = t.siteInfo.uniacid;

Page({
    data: {
        active: [],
        count: 0,
        check: !0,
        avatarUrl: null,
        pictures: [],
        is_show: !0,
        houseTypea: !1,
        pictureall: []
    },
    onLoad: function(e) {
        var i = this;
        t.util.request({
            url: "entry/wxapp/Detailed",
            data: {
                m: "monaiapp_house",
                uniacid: a
            },
            cachetime: "0",
            success: function(t) {
                for (var a = 0; a < t.data.data.length; a++) i.data.pictures.push(t.data.data[a].img);
                i.setData({
                    houseType: t.data.data,
                    count: t.data.data.length,
                    pictures: i.data.pictures,
                    pictureall: i.data.pictures
                });
            }
        }), t.util.request({
            url: "entry/wxapp/Housetype",
            data: {
                m: "monaiapp_house",
                uniacid: a
            },
            cachetime: "0",
            success: function(a) {
                var e = a.data.data.sale;
                for (var n in e) e[n].open_time = t.toDate(e[n].open_time), e[n].deliver_time = t.toDate(e[n].deliver_time);
                var s = a.data.data.saleType;
                i.setData({
                    picture: a.data.data.picture,
                    active: s,
                    sale: e,
                    info: a.data.data.info
                });
            }
        });
    },
    active: function(t) {
        for (var a = [], e = (parseInt(t.target.dataset.index), t.target.dataset.index), i = t.target.dataset.id, n = this.data.houseType, s = [], c = 0; c < n.length; c++) n[c].type == i && (a.push(n[c]), 
        s.push(n[c].img));
        if (0 == a.length) return this.setData({
            is_show: !1,
            checkIndex: e,
            check: !1,
            count: 0
        }), !1;
        var u = a.length;
        this.setData({
            houseTypea: a,
            count: u,
            checkIndex: e,
            check: !1,
            is_show: !0,
            pictures: s
        });
    },
    all: function() {
        this.setData({
            houseTypea: !1,
            houseType: this.data.houseType,
            checkIndex: 30,
            check: !0,
            count: this.data.houseType.length,
            pictures: this.data.pictureall
        });
    },
    bindViewTap: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var e = a.tempFilePaths;
                t.setData({
                    avatarUrl: e
                });
            },
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    previewImage: function(t) {
        var a = this, e = t.currentTarget.dataset.index, i = a.data.pictures;
        wx.previewImage({
            current: i[e],
            urls: i
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    mood: function() {
        wx.navigateTo({
            url: "../newtrends/newtrends"
        });
    },
    saleEvt: function(t) {
        t.currentTarget.dataset.id;
    }
});