import { PublicDomainFinder } from '../../services/public/finder/public-domain-finder'
import { PublicCmsFinder } from '../../services/public/finder/public-cms-finder'
import { CommonService } from '../../services/common-service'

let wxParse = require('../../wxParse/wxParse.js');

const app = getApp()

const publicDomainFinder = new PublicDomainFinder()
const publicCmsFinder = new PublicCmsFinder()
const commonService = new CommonService()

Page({
    data: {
        activeIndex: 0
    },
    onLoad: function(options) {

        if(options.sharerUid != null){
            commonService.addShare(options.sharerUid)
        }

        wx.showLoading({
            title: '加载中',
        })

        publicDomainFinder.getAllDomainWmaContact(app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.list != null && res.data.list.length>0){
                    res.data.list.sort(app.services.utilService.sortAsc)

                    this.setData({domainWmaContacts: res.data.list})

                    if(res.data.list[0].cmsUid!=null){

                        publicCmsFinder.getCmsCmsItems(res.data.list[0].cmsUid, app.services.constantService.CACHE_READ_WRITE)
                            .subscribe((res)=> {
                                    if(res.data.value.cms!=null){
                                        let that = this
                                        wxParse.wxParse('article', 'html', res.data.value.cms.content, that, 10)
                                    }
                            })
                    }

                    let tabs = []
                    for(let item of res.data.list){
                        tabs.push({domainWmaContactUid: item.domainWmaContactUid, latitude: item.latitude,longitude:item.longitude,
                            markers: [{
                                latitude: item.latitude,
                                longitude: item.longitude,
                                name: item.shopName
                            }]
                        })
                    }
                    this.setData({tabs: tabs})

                    let tabNames = []
                    for(let item of res.data.list){
                        tabNames.push(item.shopName)
                    }

                    this.setData({'appTab_0': {tabs: tabNames, activeIndex: this.data.activeIndex}})
                }
            },null,()=>{
                wx.hideLoading()
            })
    },
    onComponentEvent: function(e){
        this.setData({[`${e.detail.key}`] : e.detail.value})

        let domainWmaContact = this.data.domainWmaContacts[e.detail.value]

        if(domainWmaContact.cmsUid!=null){

            publicCmsFinder.getCmsCmsItems(domainWmaContact.cmsUid, app.services.constantService.CACHE_READ_WRITE)
                .subscribe((res)=> {
                    if(res.data.value.cms!=null){
                        let that = this
                        wxParse.wxParse('article', 'html', res.data.value.cms.content, that, 10)
                    }
                })
        }
    },
    onNavi: function(e){
        let index = e.currentTarget.dataset.index
        let domainWmaContact = this.data.domainWmaContacts[index]

        wx.openLocation({
            longitude: Number(domainWmaContact.longitude),
            latitude: Number(domainWmaContact.latitude),
            name: domainWmaContact.shopName,
            address: domainWmaContact.districtName + domainWmaContact.addressDetail
        })
    },
    onCall: function(e){
        let phone = e.currentTarget.dataset.phone
        if(phone!=null){
            wx.makePhoneCall({
                phoneNumber: phone
            })
        }
    },
    onShareAppMessage: function (res) {
        return commonService.onShareShop()
    },
    wxParseTagATap: function(e) {
        let href = e.currentTarget.dataset.src;
        app.services.utilService.wxParseTagATap(href)
    }
})