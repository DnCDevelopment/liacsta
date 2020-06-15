import { ITable } from '../TableModal/Types';

export type ITableProps = {
  handleSave: ({
    count,
    position,
    rotation,
    size,
    type,
  }: ITable) => Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
