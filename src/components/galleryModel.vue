<template>
  <div class="content">
    <webgl
      ref="webgl"
      :sceneLoad="init"
      :gellaryLoad="gellartInit"
      :deleteAllTrue="deleteAllTrue"
      :mouseClick="backItem"
    ></webgl>
    <!-- sceneLoad场景准备工作完成                                               -->
  </div>
</template>

<script>
import webgl from "./webgl";
export default {
  name: "insert",
  components: {
    webgl,
  },
  data() {
    return {
      threejsInit: false, //场景准备工作是否完成
      gellarOk:false,//画廊工作是否完成
      //   delpicstate: false, //图片是否删除完成
      Gallerynum: "", //画廊风格
      framestyle: "", //画框类别
      wallpaper: "wall1_1", //壁纸类型'wall1_1'，'wall1_2'，'wall1_3'，'wall1_4'，'wall1_5'
      picid: "1", //画作id
      picarr: [
        //画作数组
        // {
        //   id: "1",
        //   url: "http://192.168.1.198:8080/img/1.jpg",
        //   type: "0",
        //   index: "001",
        //   backcolor: 0x000000,
        // },
        // {
        //   id: "2",
        //   url: "http://192.168.1.198:8080/img/2.jpg",
        //   type: "0",
        //   index: "002",
        //   backcolor: 0x000000,
        // },
        // {
        //   id: "3",
        //   url: "http://192.168.1.198:8080/img/3.jpg",
        //   type: "0",
        //   index: "003",
        //   backcolor: 0x000000,
        // },
        // {
        //   id: "4",
        //   url: "http://192.168.1.198:8080/img/4.jpg",
        //   type: "0",
        //   index: "004",
        //   backcolor: 0x000000,
        // },
        // {
        //   id: "5",
        //   url: "http://192.168.1.198:8080/img/5.jpg",
        //   type: "0",
        //   index: "023",
        //   backcolor: 0x000000,
        // },
      ],
    };
  },
  props: {
    // Edit: Boolean, //是否编辑
    parent_angle: String, //视角
    parent_Gallerynum: String, //加载画廊风格
    // parent_frame: String, //画框类别
    parent_addwallpaper: String, //壁纸加载
    parent_addpic: Array, //添加画作数组
  },
  watch: {
    //加载画廊风格
    parent_Gallerynum: {
      handler(n, o) {
        this.LoadGallery(n); //拿到画廊风格参数
      },
      //   immediate: true, //刷新加载 立马触发一次handler
      deep: true, // 可以深度检测到对象的属性值的变化
    },
    //壁纸加载
    parent_addwallpaper: {
      handler(n, o) {
        this.addwallpaper(n);
      },
      deep: true,
    },
    //添加画作数组
    parent_addpic: {
      handler(n, o) {
        this.picarr = n;
        this.delAllpic();
      },
      deep: true,
    },
    //切换视角
    parent_angle: {
      handler(n, o) {
        this.change3D();
      },
      deep: true,
    },
  },
  destroyed() {
    //页面销毁清除内存
    this.$refs.webgl.clear_memory();
  },
  created() {},
  mounted() {},
  methods: {
    //加载画廊风格
    LoadGallery(Gallery) {
      this.$refs.webgl.load_gallery(Gallery);
    },
    //壁纸加载
    addwallpaper(wall) {
      this.$refs.webgl.replacement_wallpaper(wall);
    },
    //添加画作数组
    addpic(picarr) {
      for (let i = 0; i < picarr.length; i++) {
        this.$refs.webgl.insert(picarr[i]);
      }
    },
    //删除三维场景里所有画作
    delAllpic() {
      this.$refs.webgl.delete_all_frame();
    },
    //切换2.5D  3D 视角
    change3D() {
      //   this.isThree = !this.isThree;
      this.$refs.webgl.switch_camera(); //切换鹰眼模式和普通模式
    },
    //场景准备工作完成回调
    init() {
      //调用一次初始化函数
      //   this.$refs.webgl.initThreejs();
      //告诉soso画廊场景加载完成
      this.threejsInit = true;
      this.$emit("childstate", this.threejsInit);
    },
    gellartInit() {
      this.gellarOk = true;
      this.$emit("gellarstate", this.gellarOk);
    },
    //删除的回调函数里面执行画作数组的更新
    deleteAllTrue() {
      //   this.delpicstate = true;
      let data = this.picarr;
      this.addpic(data);
    },
    //画作反馈
    backItem(id) {
      //   debugger;
      //soso页面接收props里的parent_addpic数据
      for (let i = 0; i < this.picarr.length; i++) {
        if (id == this.picarr[i].id) {
          this.$emit("childData", this.picarr[i]); //返回点击的画的所有信息（对象）
        }
      }
      //本地测试
      //   for (let i = 0; i < this.picarr.length; i++) {
      //     if (id == this.picarr[i].id) {
      //       this.$emit("angle", this.picarr[i]); //返回点击的画的所有信息（对象）
      //     }
      //   }
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;
  height: 100vh;
}
</style>
