
const app = getApp()


Page({
    data: {
        disabled: false
    },
    onLoad: function (options) {
        let qrContent = options.qrContent

        if(qrContent == null){
            app.services.utilService.toHomePage()
            return
        }

        app.services.utilService.showModal(qrContent)

        let arr = qrContent.split(',')

        this.setData({type: arr[0], userUid: arr[1], uid: arr[2]})
    },
    onBack: function(e){
        wx.navigateBack()
    },
    onUserCoupon: function(e){

    }
})