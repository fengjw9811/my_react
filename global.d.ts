declare namespace JSX {
  interface Element {
    $$typeof: symbol;
    type: any;
    key: any;
    props: any;
    ref: any;
  }
  interface IntrinsicElements {
    div: any;
    p: any;
    span: any;
  }
}
