<template>
  <div class="content">
    <div class="nnn" style="position: absolute;left:0;top:500px;z-index:1111;transform:scale(3)">
      <button
        @click="bz5()"
        style="width: 70px;height:20px;position: absolute;top:40px;left:70px;font-size:10px"
      >
        添加所有画
      </button>
    <button
      @click="bz4()"
      style="width: 70px;height:20px;position: absolute;top:40px;left:70px;font-size:10px"
    >
      删除所有画
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
        <img v-if="angle == '0'" class="qiu" src="@/static/img/3D.png" @click="bz5('1')" />
        <img v-if="angle == '1'" class="qiu" src="@/static/img/2D.png" @click="bz5('0')" />
        <span class="upload" @click="$router.push('/upload')">上传1画作</span>
      </div>
    </div>
    <div class="model">
      <galleryModel
        ref="insert"
        :parent_Gallerynum="Gallerynum"
        :parent_addwallpaper="wallpaper"
        :parent_addpic="picarr"
        :parent_angle="angle"
        @childData="childData"
        @childstate="childstate"
        @gellarstate="gellarstate"
      ></galleryModel>
    </div>
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
          <span v-for="(item, index) in wallpapers" :style="{'background-color':item.color}" :key="index" @click="changeBG(item)">
            <img src="@/static/img/gouxuan.png" alt="" v-show="wallpaper == item.key" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import galleryModel from "@/components/galleryModel.vue";
export default {
  name: "galleryDetail",
  components: {
    galleryModel
  },
  data() {
    return {
      radio: "1",
      isShowHk: false,
      isShowBz: false,
      gouH: 0,
      isThree: false,
      wallpapers:[
        {
          color:'#D4D1CC',
          key:'wall1_1'
        },
        {
          color:'#BAB1A8',
          key:'wall1_2'
        },
        {
          color:'#BCC1BB',
          key:'wall1_3'
        },
        {
          color:'#BABEC1',
          key:'wall1_4'
        },
        {
          color:'#b63132',
          key:'wall1_5'
        },
      ],
      Gallerynum: "", //画廊风格
      wallpaper: "wall1_1", //壁纸类型'wall1_1'，'wall1_2'，'wall1_3'，'wall1_4'，'wall1_5'
      picarr: [],
      angle: "0",
      picarr2: [
        //画作数组   项目地址用本机ip+端口号，图片路径替换成本机ip+端口号
        {
          id: "1",
          url: "https://t7.baidu.com/it/u=3616242789,1098670747&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1604154212&t=1ec3f94cf7d41059ec8657d22876a34e",
          type: "0",
          index: "001",
          backcolor: 0x000000,
          sdata:[//sdata是soso那边的数据
              {aa:1}
          ]
        },
        {
          id: "2",
          url: "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1604154212&t=9a6b7cc24c24500fcf0547f9467bb88e",
          type: "0",
          index: "002",
          backcolor: 0x000000,
          sdata:[
              {aa:1}
          ]
        },
        {
          id: "3",
          url: "https://t9.baidu.com/it/u=583874135,70653437&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1604154212&t=ca63e5a3570a5e513b7615ee2c86e403",
          type: "0",
          index: "003",
          backcolor: 0x000000,
          sdata:[
              {aa:1}
          ]
        },
        {
          id: "4",
          url: "https://t9.baidu.com/it/u=1307125826,3433407105&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1604154212&t=4f2853904eac581fcefa6d8ea207b3b3",
          type: "0",
          index: "004",
          backcolor: 0x000000,
          sdata:[
              {aa:1}
          ]
        },
        {
          id: "5",
          url: "https://t9.baidu.com/it/u=2268908537,2815455140&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1604154212&t=4986454806dfc9e69edaa64965040789",
          type: "0",
          index: "023",
          backcolor: 0x000000,
          sdata:[
              {aa:1}
          ]
        },
      ],
      picarr3: [
        //画作数组   项目地址用本机ip+端口号，图片路径替换成本机ip+端口号
        {
          id: "1",
          url: "https://t9.baidu.com/it/u=1663565633,1824408680&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1604154212&t=0de695044656016edff816350af319a0",
          type: "0",
          index: "001",
          backcolor: 0x000000,
          sdata:[
              {aa:1}
          ]
        },
        {
          id: "2",
          url: "https://t7.baidu.com/it/u=3228836643,3370352928&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1604154212&t=25b9b98650880a921a64ac299619fd04",
          type: "0",
          index: "002",
          backcolor: 0x000000,
          sdata:[
              {aa:1}
          ]
        },
        {
          id: "3",
          url: "https://t9.baidu.com/it/u=2502882521,321079790&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1604154212&t=d3b98df2d7fd3e459b40aad9b51ff881",
          type: "0",
          index: "003",
          backcolor: 0x000000,
          sdata:[
              {aa:1}
          ]
        },
        {
          id: "4",
          url: "https://t9.baidu.com/it/u=1775900009,2371222529&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1604154212&t=0f2d2ed5ce6b2719a589103239b99582",
          type: "0",
          index: "004",
          backcolor: 0x000000,
          sdata:[
              {aa:1}
          ]
        },
        {
          id: "5",
          url: "https://t7.baidu.com/it/u=2729620587,1095451939&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1604154212&t=a7b72cb757d1818a931cbe3860610d6e",
          type: "0",
          index: "023",
          backcolor: 0x000000,
          sdata:[
              {aa:1}
          ]
        },
        {
          id: "6",
          url: "https://t9.baidu.com/it/u=2821245368,1313454205&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1604154212&t=92a70e5fac469828d988865209e7f263",
          type: "0",
          index: "024",
          backcolor: 0x000000,
          sdata:[
              {aa:1}
          ]
        },
      ],

    };
  },
  created() {},
  mounted(){
    this.Gallerynum = 'gallery_1'
  },
  methods: {
    changeBG(item){
      this.wallpaper = item.key
    },
    childstate(item) {
      console.log(111111);
      setTimeout(()=>{this.bz4()},5000)
    },
    //   画廊准备完成的返回信息
    gellarstate(item) {
      console.log(item);
    },
    //点击画作返回信息
    childData(item) {
      console.log("点击的画作信息:")
      console.log(item);
    },
    //步骤1
    bz1() {
      //   this.Gallerynum = "/resource/gallery.FBX"
      this.Gallerynum = "gallery_1";
    },
    bz2(i) {
      this.wallpaper = "wall1_" + i;
    },
    bz3() {
      this.picarr = this.picarr2;
    },
    bz6() {
      this.picarr = this.picarr3;
    },
    bz4() {
        //操作数据
      this.picarr = [];
    },
    bz5(i) {
      this.angle = i;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  background: #000;
  .model{
    width: 100%;
    height: 100%;
    z-index: 1000;
  }
  .search-warp {
    position: absolute;
    left: 0;
    top:0;
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
        width: calc(100% - 56px);
        margin: 0 auto;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        padding:0;
        span {
          // background: #ffdbe3;
          width: 15%;
          height: 20px;
          border-radius: 10px;
          position: relative;
          // margin: 0 15px 12px 0;
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

</style>
