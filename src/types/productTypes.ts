export type Product = {
  id: number;
  name: string;
  cover_image: string;
  release_year: string;
  price: number;
  images: string[];
  available_colors: string[];
  available_sizes: string[];
  quantity: number;
  brand: {
    id: number;
    image: string;
    name: string;
  };
  description: string;
};
