import React, { useState, useEffect, useRef } from "react";
import "./app.less";
import json2ts from "json2ts";
import { align2Selection, genMock, getClosestTable, genResultFromTable } from "./utils";
import ConfigPopover from "./components/ConfigPopover";

const app = () => {
  const [show, setShow] = useState(false);

  const ref = useRef(null);

  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    document.addEventListener("mouseup", mouseUp, true);
  }, []);

  const mouseUp = (e) => {
    var text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
    }
    if ("" != text) {
      console.clear();
      align2Selection(e, ref.current);
      setSelectedText(text);
    }
  };

  const handleSure = () => {
    try {
      const res = json2ts.convert(selectedText);
      console.log([res, genMock(selectedText)].join("\n\n"));
    } catch (error) {
      console.log("error");

      const table = getClosestTable(window.getSelection().anchorNode);

      const { interfaces, mock } = genResultFromTable(table);
      console.log([interfaces, mock].join("\n\n"));
    }
  };

  return (
    <>
      {/* {false ? (
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
          <a
            target="_blank"
            href="https://github.com/binyellow/tempermonkey-plugins/tree/master/documention2IntefaceAndMock"
          >
            <img src="https://avatars.githubusercontent.com/u/29519985?v=4" className="Wokoo-hide-logo" alt="logo" />
          </a>
          heihei
        </div>
      )} */}
      <div className="popover">
        <ConfigPopover ref={ref} onSure={handleSure} />
      </div>
    </>
  );
};

export default app;
