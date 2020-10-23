<template>
  <div class="upload">
    <van-uploader multiple max-count="9" :before-read="beforeUpload" :after-read="uploadImg" />
  </div>
</template>
<script>
import Api from "@/api/gallery/index";
import Exif from 'exif-js'
import axios from 'axios'
export default {
  name: 'upload',
  model: {
    prop: 'uploadList',
    event: 'update'
  },
  props: {
    uploadList: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      //ossUrl: "http://exhall.dev.yiyiny.com/works/policy",
      ossUrl: "api/works/policy",
      ossData: [],

    }
  },
  methods: {
    beforeUpload(file){
      return new Promise((resolve) => {
        if(Array.isArray(file)){//判断是否是数组
          file.forEach(() => {
            let params = ['jpg']
            Api.galleryPolicy(params).then(res => {
              console.log('oss',res);
              this.ossData.push(res[1]);
              resolve()
            });
          });
        }else{
          let params = ['jpg']
          Api.galleryPolicy(params).then(res => {
            console.log('oss',res);
            this.ossData.push(res[1]);
            resolve()
          });
        }
      });
    },
    // 组件方法 获取 流
    uploadImg(file) {
      console.log('上传file',file);
      console.log('ossData',this.ossData);
      if(Array.isArray(file)){//判断是否是数组
        file.forEach((element,index) => {
          this.imgPreview(element.file,this.ossData[index]);
        });
      }else{
        this.imgPreview(file.file,this.ossData[0]);
      }
    },
    // 处理图片
    imgPreview(file,ossData) {
      let self = this
      let Orientation
      //去获取拍照时的信息，解决拍出来的照片旋转问题   npm install exif-js --save   这里需要安装一下包
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, 'Orientation')
      })
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader()
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result
          let img = new Image()
          img.src = result
          //判断图片是否大于500K,是就直接上传，反之压缩图片
          if (this.result.length <= 500 * 1024) {
            // 上传图片
            self.postImg(this.result,file,ossData);
          } else {
            img.onload = function() {
              let data = self.compress(img, Orientation)
              // 上传图片
              self.postImg(data,file,ossData);
            }
          }
        }
      }
    },
    // 压缩图片
    compress(img, Orientation) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      //瓦片canvas
      let tCanvas = document.createElement('canvas')
      let tctx = tCanvas.getContext('2d')
      // let initSize = img.src.length;
      let width = img.width
      let height = img.height
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio
      if ((ratio = (width * height) / 4000000) > 1) {
        // console.log("大于400万像素");
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
      //    铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      //如果图片像素大于100万则使用瓦片绘制
      let count
      if ((count = (width * height) / 1000000) > 1) {
        // console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1) //计算要分成多少块瓦片
        //      计算每块瓦片的宽和高
        let nw = ~~(width / count)
        let nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      //修复ios上传图片的时候 被旋转的问题
      if (Orientation != '' && Orientation != 1) {
        switch (Orientation) {
          case 6: //需要顺时针（向左）90度旋转
            this.rotateImg(img, 'left', canvas)
            break
          case 8: //需要逆时针（向右）90度旋转
            this.rotateImg(img, 'right', canvas)
            break
          case 3: //需要180度旋转
            this.rotateImg(img, 'right', canvas) //转两次
            this.rotateImg(img, 'right', canvas)
            break
        }
      }
      //进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.1)
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      console.log(ndata)
      return ndata
    },
    // 旋转图片
    rotateImg(img, direction, canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      const min_step = 0
      const max_step = 3
      if (img == null) return
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height
      let width = img.width
      let step = 2
      if (step == null) {
        step = min_step
      }
      if (direction == 'right') {
        step++
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step)
      } else {
        step--
        step < min_step && (step = max_step)
      }
      //旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180
      let ctx = canvas.getContext('2d')
      switch (step) {
        case 0:
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0)
          break
        case 1:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, 0, -height)
          break
        case 2:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, -height)
          break
        case 3:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, -width, 0)
          break
      }
    },
    //将base64转换为文件
    dataURLtoFile(dataurl,files) {
      var arr = dataurl.split(','),
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], files.name, {
        type: files.type
      })
    },
    // 提交图片到后端
    postImg(base64,files,ossData) {
      let _this = this;
      let file = this.dataURLtoFile(base64,files)
      let formData = new FormData();
      formData.append("OSSAccessKeyId", ossData.OSSAccessKeyId);
      formData.append("key", ossData.key);
      formData.append("policy", ossData.policy);
      formData.append("signature", ossData.signature);
      formData.append("success_action_status", "200");
      formData.append("file", file);
      axios.post(ossData.url,formData).then( res => {
        console.log('上传oss成功',res);
        let ossPath = `${res.config["url"]}/${ossData.key}`;
        console.log('ossPath',ossPath)
        this.uploadList.push({
          image: ossPath,
          title: "图片1",
          desc: "图片1",
          sound: "",
          video: "",
          price: 111,
          catId: 0,
        });
        console.log('更新uploadList数据',this.uploadList);
        _this.$emit('uploadData');
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
