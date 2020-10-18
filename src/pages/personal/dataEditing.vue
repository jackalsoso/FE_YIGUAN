<template>
  <div class="content">
    <div class="top">
      <img
        class="back"
        src="../../static/icon/返回箭头--黑色.png"
        alt=""
        @click="$router.back(-1)"
      />
      <div class="search">
        <p>资料编辑</p>
      </div>
    </div>
    <div class="top_right">
      <div class="right_main">
        <!-- @touchstart="$router.push('/dataEditing')" -->
        <!-- <div class="img">
          <div class="icon"></div>
        </div> -->
        <van-uploader :after-read="onRead">
          <img src="../../static/icon/图片/头像6.png" alt="你的头像" />
          <div class="icon"></div>
          <!-- 用来更新头像，去掉会导致上传后头像无法及时更新,只有多加这个副本才能监听到头像变化，可能是个组件的bug -->
          <img v-show="false" :src="avatar2" :key="avatar2 + '1'" />
        </van-uploader>
      </div>
    </div>
    <div class="main">
      <div class="name">
        <p>昵称</p>
        <van-cell-group style="float:left;">
          <van-field v-model="name1" label="" placeholder="请输入昵称" />
        </van-cell-group>
      </div>
      <div class="sex">
        <p>性别</p>
        <van-dropdown-menu style="width:1.3rem;">
          <van-dropdown-item v-model="value1" :options="option1" />
        </van-dropdown-menu>
      </div>
      <div class="birthday">
        <p>生日</p>
        <van-field
          v-model="birth_time"
          placeholder="选择时间"
          readonly="readonly"
          @click="show = true"
        />
        <!-- readonly="readonly" 阻止手机自带键盘事件 -->
        <van-popup v-model="show" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            item-height="1.17rem"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="show = false"
            @confirm="show = false"
            @change="endTimeChange"
          />
        </van-popup>
      </div>
      <div class="qianm">
        <p>签名</p>
        <van-field
          style="height:100%;float:left;position: relative;"
          v-model="message"
          rows="2"
          :autosize="{ maxHeight: '0.5rem', minHeight: '0.5rem' }"
          label=""
          type="textarea"
          maxlength="20"
          placeholder="请输入留言"
          show-word-limit
        />
      </div>
    </div>

    <div class="submit-but">
      <span @click="$router.push('/upload')">
        <i>确认</i>
      </span>
      <span @click="$router.push('/upload')">
        <i>取消</i>
      </span>
    </div>
  </div>
</template>

<script>
import {
  Field,
  DatetimePicker,
  DropdownMenu,
  DropdownItem,
  Cell,
  CellGroup,
  Popup,
  Uploader,
  ActionSheet,
  Button
} from "vant";
export default {
  name: "dataEditing",
  components: {
    // [Button.name]: Button,
    // [Loading.name]: Loading
    [Field.name]: Field,
    [DatetimePicker.name]: DatetimePicker,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Popup.name]: Popup,
    [Uploader.name]: Uploader,
    [ActionSheet.name]: ActionSheet,
    [Button.name]: Button
    // [Grid.name]: Grid,
    // [GridItem.name]: GridItem,
    // [VanImage.name]: VanImage,
    // [Checkbox.name]: Checkbox,
    // [CheckboxGroup.name]: CheckboxGroup
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      name1: "xxxxx", //昵称
      value1: "男",
      option1: [
        { text: "男", value: "男" },
        { text: "女", value: "女" }
      ],
      show: false,
      birth_time: "",
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(), //生日
      message: "每个人都有快乐的时候，你呢？",
      //头像
      imgshow: false,
      userInfo: {
        avatar: "../../static/icon/图片/头像6.png"
      },
      avatar2: ""
    };
  },
  methods: {
    onRead(file) {
      //   let params = new FormData(); //创建form对象
      //   params.append("file", file.file); //通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      //   let config = {
      //     headers: { //添加请求头
      //       Authorization:
      //         "Bearer " + window.localStorage.getItem("managementToken"),
      //       "Content-Type": "multipart/form-data"
      //     }
      //   };
      //  let url = "";
      //   axios.post(url, params, config).then(res => {
      //       console.log(res);
      //   debugger
      //   this.userInfo.avatar=res.avatar
      // this.userInfo.avatar = "../../static/icon/图片/头像1.png";//切换头像
      this.userInfo.avatar = file.content
    //   this.avatar2 = res.avatar;
      //     }).catch(err => {
      //       console.log(err)
      //     });
    },
    endTimeChange(e) {
      let endTimeArr = e.getValues(); //["2019", "03", "22", "17", "28"]
      this.birth_time = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}`;
    }
  },
  mounted() {
    //初始日期
    let endTimeArr = ["2020", "03", "03"];
    this.birth_time = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}`;
  }
};
</script>
<style lang="scss" scoped>
.sex > .van-dropdown-menu > .van-dropdown-menu__bar {
  box-shadow: none !important;
}
.van-dropdown-menu__bar{
  box-shadow:none !important;
}
/* .van-cell::after{
        border: 0 solid #ffffff !important; 
} */
/* .name > .van-cell-group{
    
} */
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0px;
}
.van-cell::after {
  border: none;
}
.van-field__body {
  width: 85%;
}
.van-field__word-limit {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  position: relative;
  /* display: flex; */
  /* justify-content: flex-end; */
}
.top {
  width: 100%;
  height: auto;
  padding: 0.533333rem 0.4rem;
  box-sizing: border-box;
  background-color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  border-bottom: 5px solid #F7F7F7;
  .back{
    width: 10px;
    height: 17px;
  }
}
.search {
  width: 100%;
  height: 100%;
  font-weight: bold;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #000101;
}
.top_right {
  width: 100%;
  padding: 0.533333rem 0.4rem;
  box-sizing: border-box;
  margin-top: 1.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  border-bottom: 1px solid #ccc;
}
.right_main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.right_main img {
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
}
.img {
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  background: url(../../static/icon/图片/头像6.png);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.icon {
  position: absolute;
  top: 35%;
  left: 39%;
  width: 0.5rem;
  height: 0.5rem;
  background: url(../../static/icon/替换头像.png) no-repeat;
  background-size: 100%;
}
.main {
  width: 100%;
  padding: 0.533333rem 0.4rem;
  box-sizing: border-box;
  font-size: 0.26rem;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: flex-start; */
}
.main > div {
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.main > div > p {
  width: 20%;
  height: 100%;
  box-sizing: border-box;
  /* width: 100%; */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 16px;
  float: left;
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: rgba(153, 153, 153, 1);
}
/deep/ .van-dropdown-menu__bar{
  box-shadow: none;
}
/* 底部 */
.bottom {
  width: 100%;
  height: 8%;
  box-sizing: border-box;
  background: rgb(255, 255, 255);
  /* border-top: 1px solid #cbd2d9; */
  position: fixed;
  bottom: 0.5rem;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: space-around;
  align-items: center;
  
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
</style>
