import { IHall } from '../Additions/Types';

export interface IAddHallProps {
  hall: IHall;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}