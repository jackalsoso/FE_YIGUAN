import http from '../../utils/http'
import BASEURL from '@/config'

export default {
  // 登录
  login(params) {
    return http.post(`${BASEURL}/entry/login`,params);
  },
  //画廊列表
  galleryList(params) {
    return http.post(`${BASEURL}/visit/galleries`,params);
  },
  // 画廊详情
  galleryDetail(params) {
    return http.post(`${BASEURL}/visit/hang`,params);
  },
  //画展增幅
  galleryAdd(params) {
    return http.post(`${BASEURL}/works/hang`,params);
  },

  
}