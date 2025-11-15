import { REACT_ELEMENT_TYPE } from "shared/ReactSymbol";

export const SINGLE_ELEMENT = {
  $$typeof: REACT_ELEMENT_TYPE,
  type: "div",
  key: null,
  props: {
    children: {
      $$typeof: REACT_ELEMENT_TYPE,
      type: "p",
      key: null,
      props: {
        children: "hello",
      },
      ref: null,
    },
  },
  ref: null,
};

export const MULTIPLE_ELEMENT = {
  $$typeof: REACT_ELEMENT_TYPE,
  type: "div",
  key: null,
  props: {
    children: [
      {
        $$typeof: REACT_ELEMENT_TYPE,
        type: "h1",
        key: null,
        props: {
          children: "Hello,my react!!!",
        },
        ref: null,
      },
      {
        $$typeof: REACT_ELEMENT_TYPE,
        type: "p",
        key: null,
        props: {
          children: [
            "du1 react",
            {
              $$typeof: REACT_ELEMENT_TYPE,
              type: "span",
              key: null,
              props: {
                children: "span text",
              },
              ref: null,
            },
          ],
        },
        ref: null,
      },
    ],
  },
  ref: null,
};
