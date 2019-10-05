import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedHouseFinder{

    subject = 'House'

    getFavoriteHouseObjectsByUserUid(localCacheIndicator){

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedHouseFinder/getFavoriteHouseObjectsByUserUid'

        let key = JSON.stringify({service:'customizedHouseFinder', method:'getFavoriteHouseObjectsByUserUid'})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
}