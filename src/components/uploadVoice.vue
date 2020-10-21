<template>
  <div class="upload">
    <van-uploader accept="video/*" :before-read="beforeUpload" :after-read="uploadImg" />
  </div>
</template>
<script>
import Api from "@/api/gallery/index";
import axios from 'axios'
export default {
  name: 'upload',
  data() {
    return {
      //ossUrl: "http://exhall.dev.yiyiny.com/works/policy",
      ossUrl: "api/works/policy",
      ossData: {},
      uploadList: [],

    }
  },
  methods: {
    beforeUpload(){
      return new Promise((resolve) => {
        let params = ['mp3']
        Api.galleryPolicy(params).then(res => {
          console.log('oss',res);
          this.ossData = res[1];
          resolve()
        });
      });
    },
    // 组件方法 获取 流
    uploadImg(file) {
      console.log('上传file',file);
      console.log('ossData',this.ossData);
      this.postImg(file.file);
    },
    // 提交图片到后端
    postImg(file) {
      let _this = this;
      let formData = new FormData();
      formData.append("OSSAccessKeyId", _this.ossData.OSSAccessKeyId);
      formData.append("key", _this.ossData.key);
      formData.append("policy", _this.ossData.policy);
      formData.append("signature", _this.ossData.signature);
      formData.append("success_action_status", "200");
      formData.append("file", file);
      axios.post(_this.ossData.url,formData).then( res => {
        console.log('上传oss成功',res);
        let ossPath = `${res.config["url"]}/${_this.ossData.key}`;
        _this.$emit('uploadVoice',ossPath);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  /deep/ .van-uploader{
    width: 100%;
    height: 100%;
  }
  /deep/ .van-uploader__wrapper{
    width: 100%;
    height: 100%;
  }
  /deep/ .van-uploader__upload{
    width: 100%;
    height: 100%;
    margin: 0;
  }
</style>
