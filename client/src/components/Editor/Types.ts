import { IHall } from '../Additions/Types';

export interface IAddTableProps {
  currentHall: IHall;
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  table: Element | undefined;
}

export interface IEditorProps {
  currentHall: IHall;
}
