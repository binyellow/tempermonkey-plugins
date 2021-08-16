import React, { useState, useEffect } from "react";
import "./app.less";
import logo from "../public/icon.jpg";
import json5 from "json5";
import json2ts from 'json2ts';

const app = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    document.addEventListener("mouseup", mouseUp, true);
  }, []);

  const mouseUp = () => {
    var text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
    }
    if ("" != text) {
      const res = json2ts.convert(text);

      console.log(res);
    }
  };

  return (
    <>
      {show ? (
        <div className="Wokoo">
          <header className="Wokoo-header">
            <img src={logo} className="Wokoo-logo" alt="logo" />
            <span className="Wokoo-close-icon" onClick={() => setShow(false)}>
              X
            </span>
            <p>
              Edit <code>App.js</code> and save to reload.
            </p>
            <a
              className="Wokoo-link"
              href="https://juejin.cn/post/6922815205575491597"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Wokoo
            </a>
          </header>
        </div>
      ) : (
        <div className="Wokoo-hide" onClick={() => setShow(true)}>
          <img src={logo} className="Wokoo-hide-logo" alt="logo" />
          open
        </div>
      )}
    </>
  );
};

export default app;
