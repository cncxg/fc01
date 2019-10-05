Page({
    data: {},
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {},
    formSubmit: function(t) {
        var a = this, e = t.detail.value;
        1 != a.validataInput("name", e.name) && 1 != a.validataInput("tel", e.tel) && (e.email.length < 5 ? a.valiMsg("您输入的邮箱有误！") : e.weixin.length < 5 ? a.valiMsg("您输入的微信有误！") : wx.request({
            url: "https://www.monainet.com/wechatapi/company.cmenu/appoint.html",
            data: {
                name: e.name,
                tel: e.tel,
                email: e.email,
                weixin: e.weixin,
                token: wx.getStorageSync("token")
            },
            header: {
                "content-type": "application/json"
            },
            method: "POST",
            success: function(t) {
                console.log(t), wx.showModal({
                    content: t.data,
                    showCancel: !1,
                    title: "成功",
                    confirmColor: "#00AA00",
                    success: function(t) {
                        wx.switchTab({
                            url: "../index/index"
                        });
                    }
                });
            }
        }));
    },
    bindDateChange: function(t) {
        this.setData({
            date: t.detail.value
        });
    },
    bindTimeChange: function(t) {
        this.setData({
            time: t.detail.value
        });
    },
    getConfig: function() {
        var t = this;
        wx.request({
            url: http_url + "/wechatapi/company.cmenu/getConfig.html",
            data: {
                token: wx.getStorageSync("token")
            },
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                t.setData({
                    cfgData: a.data.data
                });
            }
        });
    },
    validataInput: function(t, a) {
        var e = 0, n = this;
        switch (t) {
          case "name":
            "" === a && (e = 1, n.valiMsg("请输入姓名！")), a.length > 16 && (e = 1, n.valiMsg("您输入的姓名过长！"));
            break;

          case "tel":
            "" == a && (e = 1, n.valiMsg("请输入手机号码！")), 11 != a.length && (e = 1, n.valiMsg("您输入的手机号码有误！")), 
            /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(a) || (e = 1, 
            n.valiMsg("您输入的手机号码有误！"));
            break;

          case "email":
            a.length < 5 && (e = 1, n.valiMsg("您输入的邮箱有误！"));
            break;

          case "weixin":
            a.length < 5 && (e = 1, n.valiMsg("您输入的微信有误！"));
        }
        return e;
    },
    valiMsg: function(t) {
        console.log(t), wx.showModal({
            content: t,
            showCancel: !1,
            confirmColor: "#cc0000"
        });
    }
});