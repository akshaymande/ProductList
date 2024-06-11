export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  brand:string;
  images:any;
  rating:number;
  reviews: Array<{ reviewerName: string; comment: string; rating: number }>;

}
