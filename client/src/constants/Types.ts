export type IDragBorder = {
  [key: string]: (height: number, width: number) => IBorder;
};

export type IBorder = {
  xLeft: number;
  xRight: number;
  yBottom: number;
  yTop: number;
};
