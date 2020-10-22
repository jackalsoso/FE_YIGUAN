<template>
  <div class="content">
    <div class="nav-wrap">
      <div class="nav">
        <img
          src="@/static/img/back-icon.png"
          alt=""
          class="back"
          @click="$router.back(-1)"
        />
        <span>上传作品</span>
        <img src="@/static/img/set.png" alt="" class="set" @click="openSet" />
      </div>
    </div>
    <div class="hint-wrap">
      <div class="hint">
        <span>每次最多上传<i>9</i>/40张，单张文件不超过30MB</span>
        <img
          src="@/static/img/select-hl.png"
          alt=""
          @click="batchRemove"
        />
      </div>
    </div>
    <div class="list-wrap">
      <!-- 原数据 -->
      <div class="list" v-for="(v,i) in work_list" :key="i">
        <div class="img">
          <img :src="v.image" alt="" />
        </div>
        <div class="cont">
          <div class="o">
            <span class="l"><i>标题：</i><a>{{v.title}}</a></span>
            <span class="r">
              <img
                src="@/static/img/u-edit.png"
                alt=""
                @click="toEditHistory(v,i)"
              />
              <img @click="removeHistory(i)" src="@/static/img/u-del.png" alt="" />
            </span>
          </div>
          <div class="t"><i>分类：</i><a>{{v.catId}}</a></div>
          <div class="t"><i>详情：</i><a>{{v.desc}}</a></div>
          <div class="t"><i>价格：</i><a>¥{{v.price}}</a></div>
        </div>
      </div>
      <!-- 添加数据 -->
      <div class="list" v-for="(v,i) in uploadList" :key="`${work_list.length}+${i}`">
        <div class="img">
          <img :src="v.image" alt="" />
        </div>
        <div class="cont">
          <div class="o">
            <span class="l"><i>标题：</i><a>{{v.title}}</a></span>
            <span class="r">
              <img
                src="@/static/img/u-edit.png"
                alt=""
                @click="toEditAdd(v,i)"
              />
              <img @click="removeAdd(i)" src="@/static/img/u-del.png" alt="" />
            </span>
          </div>
          <div class="t"><i>分类：</i><a>{{v.catId}}</a></div>
          <div class="t"><i>详情：</i><a>{{v.desc}}</a></div>
          <div class="t"><i>价格：</i><a>¥{{v.price}}</a></div>
        </div>
      </div>

    </div>
    <div class="submit-but">
      <span @click="addImg">
        <img src="@/static/img/add-bt.png" alt="" />
        <i>继续添加</i>
      </span>
      <span @click="uploadok">
        <img src="@/static/img/up-t.png" alt="" />
        <i>确认上传</i>
      </span>
    </div>
    <!-- 继续添加 -->
    <div
      class="addPop"
      v-if="isShowAdd"
      :class="{ active: isAddActive }"
      @click.self="closeAddPop"
    >
      <div class="bottom">
        <div class="options">
          <span>现场拍照
            <take-photo @takePhotoData="takePhotoData" />
          </span>
          <span>相册选择
            <upload-img @uploadData="uploadData" />
          </span>
          <span>......</span>
        </div>
        <div class="button" @click.stop="closeAddPop">
          <span class="cancel">取消</span>
        </div>
      </div>
    </div>

    <!-- 设置 -->
    <div
      class="addPop"
      v-if="isShowSet"
      :class="{ active: isSetActive }"
      @click.self="closeSetPop"
    >
      <div class="bottom">
        <div class="options">
          <span>设置画框尺寸（cm）</span>
          <span v-for="v in sizeList" :key="v.id">
            <i>{{ v.size }}</i>
            <img
              class="icon"
              src="@/static/img/gouxuan.png"
              alt=""
              v-show="tabId == v.id"
            />
            <img
              class="icon"
              src="@/static/img/no-gouxuan.png"
              alt=""
              v-show="tabId !== v.id"
              @click="tabId = v.id"
            />
          </span>
        </div>
        <div class="button" @click.stop="closeSetPop">
          <span class="cf">确认</span>
          <span class="cf">取消</span>
        </div>
      </div>
    </div>

    <!-- 确认上传 -->
    <div class="addPop" v-if="isShowProgress == true">
      <div class="progress" @click="$router.push('/showGallery')">
        <img src="@/static/img/jindu-logo.png" alt="" />
        <div class="hint">作品上传中...</div>
        <van-progress :percentage="scaleNum" :show-pivot="true" color="#F2630D" />
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api/gallery/index';
import uploadImg from '@/components/uploadImg';
import takePhoto from '@/components/takePhoto';
import merge from 'webpack-merge';
export default {
  name: "upload",
  components: {
    uploadImg,
    takePhoto,
  },
  data() {
    return {
      isShowProgress: false,
      isShowAdd: false,
      isAddActive: false,
      isShowSet: false,
      isSetActive: false,
      tabId: 0,
      sizeList: [
        { id: 1, size: "81×60" },
        { id: 2, size: "100×81" },
        { id: 3, size: "146×97" },
        { id: 4, size: "162×130" },
      ],
      galleryInfo: {},
      userInfo: {},
      scaleNum: 0,
      ossImgUrl: '',
      work_list: [],
      uploadList: [],
    };
  },
  created() {
    this.ossImgUrl = window['ossImgUrl'];
    this.init();
  },
  methods: {
    batchRemove(){
      let obj = {
        wList: this.work_list,
        uList: this.uploadList
      }
      this.$router.push({
        path: '/batchDel', query: {
          obj: JSON.stringify(obj)
        }
      })
    },
    removeHistory(i){
      this.work_list.splice(i,1);
    },
    removeAdd(i){
      this.uploadList.splice(i,1);
    },
    toEditHistory(v,i){
      let obj = {
        type: 'history',
        key: i,
        [i]: v
      }
      this.$router.push({ path: '/productEdit', query: {
        obj: JSON.stringify(obj)
      } });
    },
    toEditAdd(v,i){
      let obj = {
        type: 'add',
        key: i,
        [i]: v
      }
      this.$router.push({ path: '/productEdit', query: {
        obj: JSON.stringify(obj)
      } });
    },
    uploadData(list){
      console.log('oss-data',list);
      this.isShowAdd = false;
      this.uploadList = list;
    },
    takePhotoData(list){
      this.isShowAdd = false;
      this.uploadList = list;
    },
    init(){
      Api.galleryDetailByMe([{},0,20]).then( res => {
        this.galleryInfo = res[1][0];
        //let list = [];
        // res[1].picturies.forEach( v => {
        //   list.push(Object.assign(v,{
        //     mmid: res[1].mmId
        //   }));
        // });
        this.work_list = res[1][0].picturies;
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if( typeof this.$route.query.obj !== 'undefined'){
          let obj = JSON.parse(this.$route.query.obj);
          console.log('编辑obj',obj);
          if(obj.type === 'history'){
            this.work_list.splice(obj.key,1,obj[obj.key]);
          }else if(obj.type === 'add'){
            this.uploadList.splice(obj.key,1,obj[obj.key]);
            console.log('编辑完成list',this.uploadList);
          }
        }
        if( typeof this.$route.query.delObj !== 'undefined'){
          let obj = JSON.parse(this.$route.query.delObj);
          console.log('删除obj',obj);
          this.work_list = obj.wList;
          this.uploadList = obj.uList;
        }
      });
    },
    // 打开添加弹窗
    addImg() {
      this.isShowAdd = true;
      setTimeout(() => {
        this.isAddActive = true;
      }, 50);
    },
    // 关闭添加弹窗
    closeAddPop() {
      this.isAddActive = false;
      setTimeout(() => {
        this.isShowAdd = false;
      }, 500);
    },
    // 打开设置弹窗
    openSet() {
      this.isShowSet = true;
      setTimeout(() => {
        this.isSetActive = true;
      }, 50);
    },
    // 关闭设置弹窗
    closeSetPop() {
      this.isSetActive = false;
      setTimeout(() => {
        this.isShowSet = false;
      }, 500);
    },
    uploadok() {
      this.isShowProgress = true;
      console.log('userid',this.userInfo);
      // let work_list = this.work_list.filter(item => {
      //   if(item.mmid === this.userInfo.id){
      //     return item;
      //   }
      // })
      let picturies = [...this.work_list,...this.uploadList];
      let params = {
        id: this.galleryInfo.id,
        mmId: this.userInfo.mmId,
        name: this.galleryInfo.name,
        image: this.galleryInfo.image,
        gallery: this.galleryInfo.gallery,
        picturies: picturies,
        reviewed: true
      }
      Api.galleryAddOrEdit([params]).then( res => {
        console.log('确认提交成功',res);
        this.$router.push({
          query: merge({},{})
        })
        this.progress_start();
      });
    },
    progress_start() {
      //定义定时器开始时间为0
      var progressnuw = 0; //顶一个定时器
      var timer = setInterval(() => {
        //变量一直++
        progressnuw++; //清楚定时器
        if (progressnuw >= 100) {
          clearInterval(timer);
          this.isShowProgress = false;
          this.$toast.success('上传成功');
          setTimeout(() => {
            //this.$router.push('/showGallery');
          },1500);
        } //获取重新赋值
        this.scaleNum = progressnuw;
      }, 20);
    },

  },
};
</script>

<style lang="scss" scoped>
.content {
  .nav-wrap {
    height: 50px;
    .nav {
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
      .back {
        width: 10px;
        height: 17px;
      }
      span {
        font-size: 18px;
        color: #000101;
      }
      .set {
        width: 18px;
        height: 17px;
      }
    }
  }
  .hint-wrap {
    height: 48px;
    .hint {
      border-top: 6px solid #f5f5f5;
      width: 100%;
      height: 42px;
      background-color: #6f8191;
      padding: 0 15px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: fixed;
      left: 0;
      top: 50px;
      z-index: 10000;
      span {
        width: 90%;
        font-size: 14px;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        i {
          color: #f2630d;
          display: inline;
        }
      }
      img {
        width: 26px;
        height: 26px;
      }
    }
  }
  .list-wrap {
    padding-bottom: 80px;
    .list {
      padding: 15px;
      display: flex;
      border-bottom: 1px solid #dedede;
      .img {
        width: 77px;
        height: 103px;
        border-radius: 3px;
        overflow: hidden;
        display: flex;
        align-items: center;
        margin-right: 15px;
        img {
          width: 100%;
        }
      }
      .cont {
        width: 252px;
        .t {
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #999;
          i {
            width: 45px;
          }
          a {
            color: #000;
            width: 205px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .o {
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .l {
            @extend .t;
            margin-bottom: 0;
            a {
              width: 145px;
            }
          }
          .r {
            display: flex;
            align-items: center;
            img {
              &:first-child {
                width: 15px;
                height: 16px;
              }
              &:last-child {
                width: 15px;
                height: 15px;
                margin-left: 12px;
              }
            }
          }
        }
      }
    }
  }
  .submit-but {
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
    z-index: 10000;
    span {
      width: 150px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        font-size: 16px;
        margin-left: 5px;
      }
      &:first-child {
        background-color: #efeeec;
        border-radius: 14px 0 0 14px;
        img {
          width: 16px;
          height: 16px;
        }
        i {
          color: #000;
        }
      }
      &:last-child {
        border-radius: 0px 14px 14px 0px;
        background-color: #f2630d;
        img {
          width: 17px;
          height: 17px;
        }
        i {
          color: #fff;
        }
      }
    }
  }
  .addPop {
    .progress {
      width: 275px;
      height: auto;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      img {
        display: block;
        width: 58px;
        height: 46px;
        margin: 0 auto 12px;
      }
      .hint {
        font-size: 16px;
        color: #fff;
        text-align: center;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
