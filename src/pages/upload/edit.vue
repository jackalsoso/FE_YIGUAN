<template>
  <div class="content">
    <div class="nav-wrap">
      <div class="nav">
        <img src="@/static/img/back-icon.png" alt="" class="back" @click="$router.back(-1)">
        <span>画作编辑</span>
        <a></a>
      </div>
    </div>
    <div class="top-bg"></div>

    <div class="edit">
      <div class="img"> 
        <img :src="obj[obj.key].image" alt="">
      </div>
      <div class="options-wrap">
        <div class="options">
          <label class="tit">标题</label>
          <div class="make">
            <input v-model="obj[obj.key].title" type="text" placeholder="请输入标题">
          </div>
        </div>
        <div class="options">
          <label class="tit">分类</label>
          <div class="make" @click="showPicker = true">
            <span>{{ typeName }}</span>
            <img class="img1" src="@/static/img/pull-d.png" alt="">
          </div>
        </div>
        <div class="options">
          <label class="tit">作品详情</label>
          <div class="make">
            <input type="text" v-model="obj[obj.key].desc" placeholder="请输入详情">
          </div>
        </div>
        <div class="options">
          <label class="tit">上传语音</label>
          <div class="make">
            <upload-voice @uploadVoice="uploadVoice" />
            <img class="img2" src="@/static/img/up-h.png" alt="">
            <i>{{ fileVoice? fileVoice : '(支持格式：wma、aac、mp3、wav)' }}</i>
          </div>
        </div>
        <div class="options">
          <label class="tit">上传视频</label>
          <div class="make">
            <upload-video @uploadVideo="uploadVideo" />
            <img class="img2" src="@/static/img/up-h.png" alt="">
            <i>{{ fileVideo? fileVideo : '(支持格式：mp4)' }}</i>
          </div>
        </div>
        <div class="options">
          <label class="tit">输入价格</label>
          <div class="make">
            <input type="text" v-model="obj[obj.key].price" placeholder="请输入价格">
          </div>
        </div>
      </div>
    </div>

    <div class="submit-but">
      <span @click="confirmEdit">
        <i>确认</i>
      </span>
      <span @click="cancel">
        <i>取消</i>
      </span>
    </div>

    <!-- 选择器 -->
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        title="选择"
        item-height="1.17rem"
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>

  </div>
</template>

<script>
import Api from "@/api/gallery/index";
import uploadVoice from '@/components/uploadVoice';
import uploadVideo from '@/components/uploadVideo';
export default {
  name: 'productEdit',
  components:{
    uploadVoice,
    uploadVideo
  },
  data(){
    return{
      value: '',
      showPicker: false,
      columns: [],
      typeName: '',
      obj: {},
      fileVoice: '',
      fileVideo: '',

    }
  },
  created(){
    this.init();
  },
  methods:{
    init(){
      this.obj = JSON.parse(this.$route.query.obj);
      console.log('obj',this.obj);
      Api.galleryClassify().then(res => {
        this.columns = res[1].map(v => {
          return {
            id: v.id,
            text: v.name
          }
        });
        // let index = this.columns.findIndex( x => x.id === this.obj.catId);
        this.typeName = this.columns[0].text;
      });
    },
    onConfirm(value) {
      console.log('选择的值',value);
      this.obj[this.obj.key].catId = value.id;
      this.typeName = value.text;
      this.showPicker = false;
    },
    uploadVoice(url) {
      console.log('语音',url);
      this.obj[this.obj.key].sound = url;
      this.fileVoice = 'file.mp3';
    },
    uploadVideo(url) {
      console.log('视频',url);
      this.obj[this.obj.key].video = url;
      this.fileVideo = 'file.mp4';
    },
    cancel(){
      this.$toast('取消编辑');
      setTimeout(() => {
        this.$router.push('/upload');
      },1000);
    },
    confirmEdit(){
      let obj = JSON.stringify(this.obj);
      this.$router.push({ path: '/upload', query: {
        obj: obj
      } });
    },

  }
}
</script>

<style lang="scss" scoped>
  .content{
    .nav-wrap{
      height: 50px;
      .nav{
        width: 100%;
        height: 50px;
        background-color: #fff;
        padding: 0 15px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        justify-content: space-between;
        .back{
          width: 10px;
          height: 17px;
        }
        span{
          font-size: 18px;
          color: #000101;
        }
        .set{
          width: 18px;
          height: 17px;
        }
      }
    }
    .top-bg{
      height: 6px;
      background-color: #F5F5F5;
    }
    .submit-but{
      width: 100%;
      height: auto;
      padding: 15px 0;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 100;
      span{
        width: 150px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        i{
          font-size: 16px;
          margin-left: 5px;
        }
        &:first-child{
          background-color: #EFEEEC;
          border-radius: 14px 0 0 14px;
          img{
            width: 16px;
            height: 16px;
          }
          i{
            color: #000;
          } 
        }
        &:last-child{
          border-radius:0px 14px 14px 0px;
          background-color: #F2630D;
          img{
            width: 17px;
            height: 17px;
          }
          i{
            color: #fff;
          }
        }
      }
    }
  }
</style>
