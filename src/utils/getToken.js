(function () {
  var ab_ = window.ab_ = {
    el(el) {
      return el || ab_.$el ||
        (ab_.$el =
          document.getElementsByTagName('head')[0] ||
          document.getElementsByTagName('body')[0] ||
          document)
    },

    reqJs(js, el, call) {
      console.log('reqJs, ' + js)
      var script = document.createElement('script')
      script.type = 'text/javascript'
      if (call) {
        if (script.readyState) { //IE
          script.onreadystatechange = call

        } else { //Other
          script.onload = call
        }
      }

      script.src = js
      ab_.el(el).appendChild(script)
    },

    // 鏀寔formData file var form = new FormData();form.append("file", fileObj);
    xhrReq(loading, headers, url, posts, callback, init) {
      var xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          loading && loading()
          if (callback) {
            if (xhr.status === 200) {
              callback(null, xhr.responseText)

            } else {
              callback(xhr.text || 'fail', null)
            }
          }
        }
      }

      init && init(xhr)
      if (posts) {
        xhr.open('POST', url, true)

      } else {
        xhr.open('GET', url, true)
        posts = undefined
      }

      if (headers) {
        for (var name in headers) {
          xhr.setRequestHeader(name, headers[name])
        }
      }

      xhr.send(posts)
      loading && loading(1)
    },

    uniApp: /uni-app/i.test(navigator.userAgent) || /Html5Plus/i.test(navigator.userAgent),

    plusReady(callback) {
      if (window.plus) {
        callback()

      } else {
        document.addEventListener('plusready', callback)
      }
    },

    newReady(last) {
      var backs = []

      function ready(back) {
        if (backs) {
          backs.push(back)

        } else {
          back()
        }
      }

      ready.start = function () {
        if (backs) {
          var calls = backs
          backs = undefined
          for (var i = 0; i < calls.length; i++) {
            try {
              calls[i]()

            } catch (e) {
              console.error(e)
            }
          }

          if (last) {
            var call = last
            last = undefined
            try {
              call()

            } catch (e) {
              console.error(e)
            }
          }
        }
      }

      return ready
    },

    newStart(run) {
      var i = 0

      function start(inited) {
        if (++i > 0 || inited) {
          if (run != null) {
            var call = run
            run = undefined
            try {
              call()

            } catch (e) {
              //console.log(call)
              console.error(e)
            }
          }
        }
      }

      start.waite = function () {
        i--
      }

      return start
    },
  }

  window.onmessage = function (e) {
    // console.log(e)
    var t = typeof (e)
    if (t === 'object') {
      onmessage(e.data)

    } else if (t === 'string') {
      if (e.startsWith('reqJs,')) {
        ab_.reqJs(e.substr('reqJs,'.length))
      }
    }
  }

  function setPostMessage(postMessage) {
    var postTag = ''
    if (ab_.uniApp) {
      postTag = plus.webview.currentWebview().id || ''
    }

    window.$postTag = function () {
      return postTag
    }

    window.$postMessage = function (name, paras) {
      if (paras) {
        name = name + ',' + paras
      }

      ab_.debug && console.log(name)
      postMessage(name)
    }

    setTimeout(function () {
      var appId = window.$appId || 0
      if (window.$reqSdk) {
        ab_.reqJs(window.$reqSdk, 0, function () {
          $postMessage('@' + $postTag() + ',loaded,' + appId)
        })

      } else {
        $postMessage('@' + $postTag() + ',sdk,' + appId)
      }
    }, 1)
  }

  if (window.parent && window.parent != window) {
    ab_.h5 = true
    setPostMessage(function (name) {
      window.parent.postMessage(name, '*')
    })

  } else {
    ab_.plusReady(function () {
      ab_.uniApp = true
      var native
      var center
      try {
        native = plus.os.name.toLowerCase()
        if (native === 'android') {
          center = plus.android.importClass("com.absir.uniplugin.AbCenter").ME()

        } else if (plus.ios) {
          center = plus.ios.importClass("AbCenter").ME()
        }

      } catch (e) {
        console.error(e)
      }

      ab_.native = native
      ab_.center = center
      ab_.postEvent = function (event, paras) {
        if (center) {
          if (native === 'android') {
            center.postEvent(event, paras)

          } else {
            plus.ios.invoke(center, 'postEvent:paras:', event, paras)
          }

          return true
        }
      }

      setPostMessage(function (name) {
        ab_.postEvent('message', name)
      })
    })
  }

  // plusReady
  window.plusReady = ab_.plusReady
  // uniReady
  window.uniReady = ab_.uniReady = ab_.newReady(function () {
    window.onmessage('uniReady')
  })

  // href
  ab_.href = location.href

  // vconsole
  window.uniConsole = function () {
    ab_.vconsoled = true
  }

  window.uniDebug = function () {
    ab_.debug = true
  }

  console.log('open.plt.init')
})()