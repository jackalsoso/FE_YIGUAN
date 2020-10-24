import axios from 'axios';
import {Toast} from 'vant'
axios.defaults.timeout = 15000;

//设置token到请求头
axios.interceptors.request.use((config) => {
  // if(config.method === 'get'){
  //   axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  // }

  config.headers['atoken'] = localStorage.getItem('token');
  // config.headers['atoken'] = 'B1BwIxc1Qh9ubwcQE3kL'

  //config.headers['atoken'] = 'UgUldkJgF0o1fw0wGAED';
  return config
}, (error) => {
  return Promise.reject(error)
})

//判断token过期重新请求获取token
axios.interceptors.response.use((response) => {
  if(response.data.status === 1001){
    Toast({ message: response.data.message, duration: 5000 });
  }
  return response
}, (error) => {
  return Promise.reject(error)
})

//请求方式
export default {
  get: (url, params = {}) => {
    return new Promise((resolve, reject) => {
      axios.get(url, {params}).then(res => {
        let data = res.data;
        resolve(data);
      }).catch(err => {
        reject(err);
      })
    });
  },
  post: (url, params = {}) => {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        let data = res.data;
        resolve(data);
      }).catch(err => {
        reject(err);
      })
    });
  },
}
