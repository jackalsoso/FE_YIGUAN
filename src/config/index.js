let BASEURL= ""; 

// switch (process.env.NODE_ENV) {
//     case 'development':
//       BASEURL = "http://exhall.dev.yiyiny.com"  //开发环境url
//       break;
//     case 'production':
//       BASEURL = "http://exhall.yiyiny.com"   //生产环境url
//       break;
// }

if (window.location.origin.indexOf("localhost:8088") != -1) {
  BASEURL = "/api";
} else if (window.location.origin.indexOf("p2.dev.yiyiny.com") != -1) {
  BASEURL = "http://exhall.dev.yiyiny.com";
} else if (window.location.origin.indexOf("p2.yiyiny.com") != -1) {
  BASEURL = "http://exhall.yiyiny.com";
} else {
  console.error("当前origin：",window.location.origin);
}

export default BASEURL;
