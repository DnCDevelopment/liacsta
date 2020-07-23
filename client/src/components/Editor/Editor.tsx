import React, { useEffect, useState } from 'react';

import AddTable from './AddTable';

import { IEditorProps } from './Types';

const Editor: React.FC<IEditorProps> = ({ currentHall }): JSX.Element => {
  const [hall, setHall] = useState<string>('');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [table, setTable] = useState<Element | undefined>();

  const { fileName, id, name } = currentHall;

  const addTable = (elem: Element) => {
    setModalOpen(true);
    setTable(elem);
  };

  useEffect(() => {
    if (hall) {
      const tables = document.querySelectorAll('.st1');
      tables.forEach((elem) => {
        elem.addEventListener('click', () => addTable(elem));
      });
      return () => {
        tables.forEach((elem) => {
          elem.removeEventListener('click', () => addTable(elem));
        });
      };
    }
  }, [hall]);

  useEffect(() => {
    if (fileName) {
      fetch(`http://localhost:3200/halls/${fileName}`)
        .then((res) => res.json())
        .then((result) => setHall(result['hall']))
        .catch((err) => console.error(err));
    }
  }, [fileName]);

  return (
    <>
      {hall && <div dangerouslySetInnerHTML={{ __html: hall }} />}
        <AddTable
          currentHall={currentHall}
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          table={table}
        />
    </>
  );
};

export default Editor;
