var a = getApp();

Page({
    data: {
        checked: !0
    },
    onLoad: function() {
        var t = this, e = a.siteInfo.uniacid;
        a.util.request({
            url: "entry/wxapp/house",
            data: {
                m: "monaiapp_house",
                uniacid: e
            },
            cachetime: "0",
            success: function(a) {
                t.setData({
                    picture: a.data.data.picture,
                    detile: a.data.data.info,
                    tag: a.data.data.tag,
                    project: a.data.data.product
                });
            }
        });
    },
    toast: function() {
        wx.navigateTo({
            url: "../protocol/protocol"
        });
    },
    checkboxChange: function(a) {
        this.data.checked ? this.setData({
            checked: !1
        }) : this.setData({
            checked: !0
        });
    },
    formSubmit: function(t) {
        var e = this, i = t.detail.value;
        if (1 != e.validataInput("name", i.name) && 1 != e.validataInput("tel", i.tel)) {
            var c = a.siteInfo.uniacid;
            a.util.request({
                url: "entry/wxapp/appoint",
                data: {
                    m: "monaiapp_house",
                    uniacid: c,
                    tel: i.tel,
                    name: i.name,
                    uid: wx.getStorageSync("uid")
                },
                cachetime: "0",
                success: function(a) {
                    wx.showModal({
                        content: a.data.data,
                        showCancel: !1,
                        title: "预约成功",
                        confirmColor: "#00AA00",
                        success: function(a) {
                            wx.switchTab({
                                url: "../index/index"
                            });
                        }
                    });
                }
            });
        }
    },
    validataInput: function(a, t) {
        var e = 0, i = this;
        switch (a) {
          case "name":
            "" === t && (e = 1, i.valiMsg("请输入姓名！")), t.length > 16 && (e = 1, i.valiMsg("您输入的姓名过长！"));
            break;

          case "check":
            !1 === t && (e = 1, i.valiMsg("请阅读并同意服务协议"));
            break;

          case "tel":
            "" == t && (e = 1, i.valiMsg("请输入手机号码！")), 11 != t.length && (e = 1, i.valiMsg("您输入的手机号码有误！")), 
            /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(t) || (e = 1, 
            i.valiMsg("您输入的手机号码有误！"));
        }
        return e;
    },
    valiMsg: function(a) {
        wx.showModal({
            content: a,
            showCancel: !1,
            confirmColor: "#cc0000"
        });
    }
});