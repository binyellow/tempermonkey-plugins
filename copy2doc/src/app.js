import React from "react";
import "./app.less";
import logo from "../public/icon.jpg";
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
  }

  $ = (selector) => {
    document.querySelectorAll(selector)[0];
  };

  componentDidMount() {
    // demo 程序将粘贴事件绑定到 document 上
    document.addEventListener(
      "paste",
      function (e) {
        var cbd = e.clipboardData;
        var ua = window.navigator.userAgent;

        // 如果是 Safari 直接 return
        if (!(e.clipboardData && e.clipboardData.items)) {
          return;
        }

        // Mac平台下Chrome49版本以下 复制Finder中的文件的Bug Hack掉
        if (
          cbd.items &&
          cbd.items.length === 2 &&
          cbd.items[0].kind === "string" &&
          cbd.items[1].kind === "file" &&
          cbd.types &&
          cbd.types.length === 2 &&
          cbd.types[0] === "text/plain" &&
          cbd.types[1] === "Files" &&
          ua.match(/Macintosh/i) &&
          Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49
        ) {
          return;
        }

        for (var i = 0; i < cbd.items.length; i++) {
          var item = cbd.items[i];

          item.getAsString((e) => {
            console.log("string===>", e);
          });
          // 'file===>', item.getAsFile()
          if (item.kind == "file") {
            var blob = item.getAsFile();
            if (blob.size === 0) {
              return;
            }
            console.log(blob);
            // blob 就是从剪切板获得的文件 可以进行上传或其他操作
          }
        }
      },
      false
    );

    // document.addEventListener("copy", function (e) {
    //   const data = window.clipboardData || e.clipboardData;

    //   for (let i = 0; i < data.items.length; i++) {
    //     const item = data.items[i];
    //     if (item.type === "text/html") {
    //       item.getAsString((e) => {
    //         console.log(e);
    //       });
    //     }
    //   }

    //   if (!data) return;

    //   let text = window.getSelection();

    //   console.log(text, text.toString());

    //   // e.clipboardData.setData('text/plain', 'Hello, world!');
    //   e.clipboardData.setData(
    //     "text/html",
    //     `<h4><strong>图：</strong></h4>
    //     <p><img src="http://tapd.oa.com/tfl/pictures/202108/tapd_20425357_1628497502_68.png" height="453" style="width: 767px;" /></p>`
    //   );
    //   e.preventDefault(); // We want our data, not data from any selection, to be written to the clipboard
    // });
  }

  handleCopy() {
    $("#description-inline-edit").click();

    setTimeout(() => {
      document.getElementById("CommentDescriptionEditor_ifr").contentWindow.document.addEventListener("copy", async (e) => {
        const data = window.clipboardData || e.clipboardData;
        e.preventDefault();

        let typeArr = data.types;

        for (let i = 0; i < data.items.length; i++) {
          const type = typeArr[i];
          const data = e.clipboardData.getData(type);
          e.clipboardData.setData(type, data.replace(
            /([-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)?)/g,
            ($1) => `http://tapd.oa.com${$1}`
          ));
          console.log(data);
        }
      });
    }, 1500);
  }

  handleClose() {
    this.setState({
      show: !this.state.show,
    });
  }
  render() {
    return (
      <button style={{ position: "absolute", right: 0, bottom: 0 }} onClick={this.handleCopy}>
        复制
      </button>
    );
  }
}
