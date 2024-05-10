export interface Product {
  status: string;
  message: string;
  data: {
    product: {
      id: number;
      productName: string;
      img: string;
      productCode: number;
      lprice: number;
      brand: string;
      maker: string;
      category1: string;
      category2: string;
      category3: string;
      category4: string;
    };
    pages: [
      {
        id: number;
        price: number;
        link: string;
        storeName: string;
      },
    ];
  };
}
