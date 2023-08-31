export interface IProduct {
  id: number;
  name: string;
  quantity: number;
  price: number;
  status: string;
  type: string;
  brand: string;
  brandImage: string;
}
export interface ProductsState {
  products: IProduct[];
}

export interface IColumn {
  key: string;
  header: string;
  render: (data: IProduct) => React.ReactNode;
}
