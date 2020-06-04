export type ITable = {
  count: number;
  position: {
    x: number;
    y: number;
  };
  rotation: number;
  size: {
    [key: string]: number;
  };
  type: string;
};

export type ITableModalProps = {
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tableType: keyof ITableOptions;
};

export type ITableOptions = {
  GShaped: React.FC;
  PShaped: React.FC;
  NShaped: React.FC;
};
