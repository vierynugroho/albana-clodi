import React, { createContext, useContext, useState, useEffect } from "react";

// Define the product type (can be extended as needed)
export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
  [key: string]: unknown;
};

type ProductContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  updateProduct: (product: Product) => void;
  getProductById: (id: string) => Product | undefined;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Optionally, fetch products from API here
    // Example:
    // fetchProducts().then(setProducts);
  }, []);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (product: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, ...product } : p))
    );
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        removeProduct,
        updateProduct,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
