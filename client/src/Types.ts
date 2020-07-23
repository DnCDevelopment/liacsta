export interface ICategory {
  id: string;
  name: string;
}

export interface IDish {
  category: string;
  description: string;
  key: string;
  name: string;
  price: number;
}

export type TAppProps = {
  children?: React.ReactNode;
}
