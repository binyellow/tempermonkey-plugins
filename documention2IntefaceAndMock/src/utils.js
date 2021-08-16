import React from "react";
import { alignPoint } from "dom-align";

// 生成mock
export const genMock = (target) => {
  return target;
};

// popover align to selector
export const align2Selection = (e, dom = document) => {
  const { clientX, clientY } = e;
  console.log(e);

  alignPoint(dom, { clientX, clientY }, { points: ['tl'] });
};
