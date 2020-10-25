<template>
  <div class="content">
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
        <span class="upload" @click="$router.push('/upload')">上传画作</span>
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
    <div v-if="browseShow == 0" class="popup-bottom animated fadeInUp">
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
    <!-- <browse v-show="browseShow" :data="browseData" @back="" /> -->
    <div v-if="browseShow == 1" class="imgview" style="z-index: 1001;position: absolute;background-color: red;width: 100%;height: 100%;left: 0;top: 0;">
      <img :src="browseData.sdata.image" />
      <van-popup v-model="browseShow" round position="bottom" class="animated fadeInUp">
        {{browseData}}
        <div class="edit">
          <div class="tit-1" @click="browseShow = 0">
            <span></span><span></span><span></span>
          </div>
          <div class="browse">
            <div class="voice-wrap">
              <div class="voice">
                <span>{{browseData.sdata.title}}<img src="@/static/img/voice.png" alt="" /><i>30”</i></span
                >
                <span>¥{{browseData.sdata.price}}<img src="@/static/img/car.png" alt=""/></span>
              </div>
              <div class="yh">油画</div>
            </div>
            <p class="cont">
              {{browseData.sdata.desc}}
              <!-- 一个屡受挫折的年轻士兵在一家出售进口商品的店里做伙计，
              当他打开这个从日本运来的陶器的包装纸后，惊奇地发现里面藏有一幅极富造诣的油画。 -->
            </p>
            <!-- <p class="cont">
              {{ browseData }}
              本书以日本东京的明治维新和法国巴黎的普法战争为背景，
              并围绕一幅神秘的油画展开故事情节。小说主要刻画了四个主人
              公，他们的命运轨迹或多或少地被这幅油画改写......小说将炽热
              的爱情和充满悬念的故事情节巧妙地结合在一起，艺术的神秘和
              生活的崎岖交相辉映，表现了艺术对生活的深刻影响。
            </p> -->
            <div class="video">
              <video
                ref="videoPlay"
                src=""
                controls
                poster="@/static/img/item-2.jpeg"
              ></video>
              <img
                src="@/static/img/play.png"
                alt=""
                v-show="!isPlay"
                @click="play(true)"
              />
              <img
                src="@/static/img/pause.png"
                alt=""
                v-show="isPlay"
                @click="play(false)"
              />
            </div>
          </div>
        </div>
      </van-popup>
    </div>


  </div>
</template>
<script>
import Api from '@/api/gallery/index';
import galleryModel from "@/components/galleryModel.vue";
import browse from "@/components/browse.vue";
export default {
  name: "galleryDetail",
  components: {
    galleryModel,
    browse
  },
  data() {
    return {
      browseShow:0,
      browseData:{},
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
    };
  },
  created() {},
  mounted(){
    this.Gallerynum = 'gallery_1'
    this.setOpus()
  },
  methods: {
    setOpus(){
      Api.galleryDetailByMe([{},0,20]).then( res => {
        let _data = res[1][0].picturies, _arr = []
        for(let i in _data){
          let _index = (parseInt(i) + 1) + ''
          _index.length == 1 ? _index = '00' + _index : ''
          _index.length == 2 ? _index = '0' + _index : ''
          _arr.push({
            id:i,
            url:_data[i].image,
            type: "0",
            index: _index,
            backcolor: 0x000000,
            sdata:_data[i]
          })
        }
        setTimeout((this.picarr = _arr),20000)
      })
    },
    changeBG(item){
      this.wallpaper = item.key
    },
    childstate(item) {
      console.log(111111);
    },
    //   画廊准备完成的返回信息
    gellarstate(item) {
      console.log(item);
    },
    //点击画作返回信息
    childData(item) {
      // this.$router.push('/browse')
      this.browseData = item
      this.browseShow = 1
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
  width: 100%;
  height: 100%;
  background: #000;
  .imgview{
    top:0;
    left:0;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9;
    img{
      width: 100%;
      height: 100%;
    }
  }
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

  /deep/ .van-overlay {
    // background: red;
  }
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
  .edit {
    padding-bottom: 15px;
    .tit-1 {
      padding: 8px 20px;
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
    .browse {
      padding: 15px;
      .voice-wrap {
        padding-bottom: 15px;
        border-bottom: 1px solid #dedede;
        margin-bottom: 15px;
        .voice {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 5px;
          span {
            width: 50%;
            display: flex;
            align-items: center;
            font-size: 20px;
            color: #010000;
            img {
              width: 17px;
              height: 15px;
              margin-left: 8px;
            }
            i {
              font-size: 16px;
              color: #3d4249;
              margin-left: 3px;
            }
            &:last-child {
              justify-content: flex-end;
              font-size: 16px;
              color: #f2630d;
              img {
                width: 20px;
                height: 15px;
                margin-left: 8px;
              }
            }
          }
        }
        .yh {
          display: inline-block;
          padding: 3px 10px;
          background-color: #efeeec;
          font-size: 10px;
          color: #6f8191;
        }
      }
      .cont {
        font-size: 12px;
        line-height: 25px;
        color: #3d4249;
        text-indent: 15px;
      }
      .video {
        width: 305px;
        height: 140px;
        margin: 15px auto 0;
        border-radius: 14px;
        overflow: hidden;
        position: relative;
        video {
          width: 100%;
          height: 100%;
          object-fit: fill;
        }
        img {
          width: 31px;
          height: 31px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }

</style>
