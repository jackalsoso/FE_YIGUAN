<template>
  <div class="content">
    <div style="position: absolute;left:0;top:100px;">
    <button
      @click="bz1"
      style="width: 60px;height:20px;position: absolute;font-size:10px"
    >
      加载画廊
    </button>
    <button
      @click="bz2('2')"
      style="width: 60px;height:20px;position: absolute;top:20px;font-size:10px"
    >
      改壁纸2
    </button>
    <button
      @click="bz2('4')"
      style="width: 60px;height:20px;position: absolute;top:20px;left:60px;font-size:10px"
    >
      改壁纸5
    </button>
    <button
      @click="bz3()"
      style="width: 70px;height:20px;position: absolute;top:40px;font-size:10px"
    >
      添加5个画
    </button>
    <button
      @click="bz4()"
      style="width: 70px;height:20px;position: absolute;top:40px;left:70px;font-size:10px"
    >
      删除所有画
    </button>
    <button
      @click="bz6()"
      style="width: 70px;height:20px;position: absolute;top:40px;left:140px;font-size:10px"
    >
      添加6个画
    </button>
    <button
      @click="bz5('0')"
      v-if="angle == '1'"
      style="width: 60px;height:20px;position: absolute;top:60px;font-size:10px"
    >
      切换普通
    </button>
    <button
      v-if="angle == '0'"
      @click="bz5('1')"
      style="width: 60px;height:20px;position: absolute;top:60px;font-size:10px"
    >
      切换鹰眼
    </button>
  </div>
    <div class="search-warp">
      <div class="search">
        <img
          class="back"
          src="@/static/img/back-icon2.png"
          alt=""
          @click="$router.push('/gallery')"
        />
        <img
          class="qiu"
          src="@/static/img/3D.png"
          alt=""
          v-show="!isThree"
          @click="change3D"
        />
        <img
          class="qiu"
          src="@/static/img/2D.png"
          alt=""
          v-show="isThree"
          @click="change3D"
        />
        <span class="upload" @click="$router.push('/upload')">上传1画作</span>
      </div>
    </div>
    <webgl
      ref="insert"
      :parent_Gallerynum="Gallerynum"
      :parent_addwallpaper="wallpaper"
      :parent_addpic="picarr"
      :parent_angle="angle"
      @childData="childData"
      @childstate="childstate"
      @gellarstate="gellarstate"
    ></webgl>
    <!-- <webgl
      style="width: 100%; height: 100%; position: absolute;top:0; z-index: 1000;"
      ref="webgl"
    ></webgl> -->
    <div class="popup-bottom animated fadeInUp">
      <div class="pop-type">
        <div class="tit" @click="(isShowHk = !isShowHk), (isShowBz = false)">
          <span></span><span></span>
        </div>
        <div class="type">画框类别</div>
        <div class="choose" v-if="isShowHk">
          <label>画框类型:</label>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="1">欧式</van-radio>
            <van-radio name="2">中式</van-radio>
            <van-radio name="3">极简</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="pop-bz">
        <div class="tit" @click="isShowBz = true">壁纸</div>
        <div class="backdrop" v-if="isShowBz">
          <span v-for="(v, i) in 4" :key="v" @click="choose(i)">
            <img
              src="@/static/img/gouxuan.png"
              alt=""
              v-show="checkIndex == i"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import webgl from "@/components/galleryModel.vue";
export default {
  name: "galleryDetail",
  components: {
    //webgl,
  },
  data() {
    return {
      radio: "1",
      checkIndex: -1,
      isShowHk: false,
      isShowBz: false,
      gouH: 0,
      isThree: false,
    };
  },
  created() {},
  methods: {
    choose(i) {
      this.checkIndex = i;
    },
    change3D(){
      this.isThree = !this.isThree
      this.$refs.webgl.switch_camera()
    }
  },
};
</script>

<style lang="scss" scoped>
.content {
  background: #000;
  .search-warp {
    background: none;

    z-index: 2000;
    .search {
      background: none;
      padding: 20px 0;
      justify-content: space-between;
      .back {
        margin-left: 15px;
      }
      .qiu {
        width: 37px;
        height: 37px;
      }
      .upload {
        width: 74px;
        height: 28px;
        background: rgba(241, 99, 13, 1);
        border-radius: 14px 0px 0px 14px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        line-height: 28px;
      }
    }
  }
  width: 100%;
  height: 100%;
  // background: url(../../static/img/item-1.jpeg) center / cover no-repeat;
  position: relative;
  .popup-bottom {
    width: 100%;
    height: auto;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10000;
    background: #fff;
    .pop-type {
      border-radius: 14px 14px 0px 0px;
      .tit {
        padding: 5px 20px;
        border-bottom: 1px dashed #cbd1d9;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span {
          width: 45px;
          height: 2px;
          background-color: #cbd1d9;
          margin-bottom: 3px;
        }
      }
      .type {
        padding: 10px 25px;
        font-size: 16px;
        color: #000;
        text-align: center;
      }
      .choose {
        padding: 0 28px 30px;
        display: flex;
        flex-wrap: wrap;
        label {
          width: 65px;
          text-align: center;
          font-size: 14px;
          color: #000;
          margin-right: 10px;
        }
        /deep/ .van-radio-group--horizontal {
          width: 240px;
        }
        /deep/ .van-radio--horizontal {
          margin-right: 30px;
          margin-bottom: 12px;
        }
      }
    }
    .pop-bz {
      width: 100%;
      height: auto;
      background: rgba(61, 65, 73, 1);
      border-radius: 14px;
      box-sizing: border-box;
      padding: 6px 0;
      position: relative;
      top: 0;
      left: 0;
      .tit {
        text-align: center;
        font-size: 16px;
        color: #fff;
        margin-bottom: 12px;
      }
      .backdrop {
        display: flex;
        flex-wrap: wrap;
        padding-left: 28px;
        span {
          // background: #ffdbe3;
          width: 65px;
          height: 20px;
          border-radius: 10px;
          position: relative;
          margin: 0 15px 12px 0;
          img {
            width: 15px;
            height: 15px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
.backdrop span:nth-child(1){
     background: #D4D1CC;
}
.backdrop span:nth-child(2){
     background: #BAB1A8;
}
.backdrop span:nth-child(3){
     background: #BCC1BB;
}
.backdrop span:nth-child(4){
     background: #BABEC1;
}
</style>
