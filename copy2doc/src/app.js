import React from "react";
import "./app.less";
import logo from "../public/icon.jpg";
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
  }

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

          console.log(item.getAsString(e=> {
            console.log(e);
          }), item.getAsFile());
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

    document.addEventListener('copy', function(e){
      const data = e.clipboardData || window.clipboardData;

      if(!data) return;

      let text = window.getSelection();

      console.log(text, text.toString());

      // e.clipboardData.setData('text/plain', 'Hello, world!');
      // e.clipboardData.setData('text/html', '<b>Hello, world!</b>');
      e.preventDefault(); // We want our data, not data from any selection, to be written to the clipboard
  });
  }

  handleClose() {
    this.setState({
      show: !this.state.show,
    });
  }
  render() {
    return null;
  }
}