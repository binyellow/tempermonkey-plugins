import React, { forwardRef, useState, useEffect } from "react";
import "./index.less";
import { align2Selection } from "../../utils";

const cls = "popover-wrapper";

const ConfigPopover = (props, ref) => {
  const { onSure } = props;
  const [interfaceChecked, setInterfaceChecked] = useState(true);
  const [mockChecked, setMockChecked] = useState(true);

  useEffect(() => {
    ref.current.addEventListener(
      "mouseUp",
      (e) => {
        e.stopPropagation();
      },
      true
    );
  }, []);

  const toggleChecked = (key) => {
    if (key === "interface") {
      setInterfaceChecked(!interfaceChecked);
      return;
    }
    setMockChecked(!mockChecked);
  };

  return (
    <div ref={ref} className={cls}>
      <label htmlFor="interface" onClick={() => toggleChecked("interface")}>
        interface
      </label>
      <input id="interface" type="checkbox" checked={interfaceChecked} onClick={() => toggleChecked("interface")} />
      <label style={{ marginLeft: 12 }} htmlFor="mock" onClick={() => toggleChecked("mock")}>
        mock
      </label>
      <input id="mock" type="checkbox" checked={mockChecked} onClick={() => toggleChecked("mock")} />

      <div>
        <button onClick={() => align2Selection({ clientX: -1000, clientY: -1000 }, ref.current)}>取消</button>
        <button style={{ marginLeft: 12 }} onClick={onSure}>
          确定
        </button>
      </div>
    </div>
  );
};

export default forwardRef(ConfigPopover);
