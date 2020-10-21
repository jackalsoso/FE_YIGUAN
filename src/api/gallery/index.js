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
  galleryAddOrEdit(params) {
    return http.post(`${BASEURL}/works/hang`,params);
  },
  //oss
  galleryPolicy(params) {
    return http.post(`${BASEURL}/works/policy`,params);
  },
  //画作分类
  galleryClassify(params) {
    return http.post(`${BASEURL}/entry/cats`,params);
  },

}
