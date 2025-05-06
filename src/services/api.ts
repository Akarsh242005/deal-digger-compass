
import { toast } from "sonner";

// This is a mock API service for the price comparison app
// In a real app, you would connect to actual e-commerce APIs

// Product interface
export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  ratings: {
    amazon?: number;
    flipkart?: number;
  };
  prices: {
    amazon?: {
      current: number;
      original?: number;
      discount?: number;
      currency: string;
      url: string;
    };
    flipkart?: {
      current: number;
      original?: number;
      discount?: number;
      currency: string;
      url: string;
    };
  };
  delivery: {
    amazon?: {
      estimatedDate: string;
      isFree: boolean;
    };
    flipkart?: {
      estimatedDate: string;
      isFree: boolean;
    };
  };
  specs: {
    [key: string]: string;
  };
}

export interface PriceHistory {
  date: string;
  amazon?: number;
  flipkart?: number;
}

// Mock products data
const mockProducts: Product[] = [
  {
    id: "iphone-13-128gb",
    name: "iPhone 13 (128GB)",
    description: "6.1-inch Super Retina XDR display, Dual-camera system, A15 Bionic chip",
    image: "https://www.apple.com/v/iphone-13/g/images/key-features/hero__gm6j85ykk5e2_medium.jpg",
    ratings: {
      amazon: 4.5,
      flipkart: 4.3,
    },
    prices: {
      amazon: {
        current: 699,
        original: 799,
        discount: 12.5,
        currency: "USD",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 689,
        original: 799,
        discount: 13.8,
        currency: "USD",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 10, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 12, 2025",
        isFree: false,
      },
    },
    specs: {
      display: "6.1-inch Super Retina XDR",
      processor: "A15 Bionic",
      storage: "128GB",
      camera: "12MP dual-camera system",
      battery: "Up to 19 hours video playback",
    },
  },
  {
    id: "samsung-galaxy-s22",
    name: "Samsung Galaxy S22",
    description: "6.1-inch Dynamic AMOLED 2X, 120Hz, Triple camera system",
    image: "https://images.samsung.com/is/image/samsung/p6pim/in/sm-s901ezgdinu/gallery/in-galaxy-s22-s901-sm-s901ezgdinu-531435463",
    ratings: {
      amazon: 4.4,
      flipkart: 4.6,
    },
    prices: {
      amazon: {
        current: 599,
        original: 699,
        discount: 14.3,
        currency: "USD",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 619,
        original: 699,
        discount: 11.4,
        currency: "USD",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 8, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 9, 2025",
        isFree: true,
      },
    },
    specs: {
      display: "6.1-inch Dynamic AMOLED 2X",
      processor: "Snapdragon 8 Gen 1",
      storage: "128GB",
      camera: "50MP triple-camera system",
      battery: "3700 mAh",
    },
  },
  {
    id: "macbook-air-m2",
    name: "MacBook Air M2",
    description: "13.6-inch Liquid Retina display, Apple M2 chip, Up to 18 hours battery life",
    image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665",
    ratings: {
      amazon: 4.8,
      flipkart: 4.7,
    },
    prices: {
      amazon: {
        current: 1099,
        original: 1199,
        discount: 8.3,
        currency: "USD",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 1149,
        original: 1199,
        discount: 4.2,
        currency: "USD",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 15, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 12, 2025",
        isFree: true,
      },
    },
    specs: {
      display: "13.6-inch Liquid Retina",
      processor: "Apple M2",
      storage: "256GB SSD",
      memory: "8GB unified memory",
      battery: "Up to 18 hours",
    },
  },
  {
    id: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5",
    description: "Wireless Noise Cancelling Headphones with Auto Noise Cancelling Optimizer",
    image: "https://www.sony.com/image/f0c81c10-a9f9-45b7-a889-33f608afd01c?fmt=png-alpha&wid=800",
    ratings: {
      amazon: 4.7,
      flipkart: 4.6,
    },
    prices: {
      amazon: {
        current: 349,
        original: 399,
        discount: 12.5,
        currency: "USD",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 329,
        original: 399,
        discount: 17.5,
        currency: "USD",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 7, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 9, 2025",
        isFree: false,
      },
    },
    specs: {
      type: "Over-ear",
      connectivity: "Bluetooth 5.2",
      batteryLife: "Up to 30 hours",
      noiseCancelling: "Industry-leading",
      weight: "250g",
    },
  },
];

// Mock price history data
const mockPriceHistory: Record<string, PriceHistory[]> = {
  "iphone-13-128gb": [
    { date: "2025-01-01", amazon: 799, flipkart: 799 },
    { date: "2025-02-01", amazon: 779, flipkart: 789 },
    { date: "2025-03-01", amazon: 749, flipkart: 749 },
    { date: "2025-04-01", amazon: 729, flipkart: 719 },
    { date: "2025-05-01", amazon: 699, flipkart: 689 },
  ],
  "samsung-galaxy-s22": [
    { date: "2025-01-01", amazon: 699, flipkart: 699 },
    { date: "2025-02-01", amazon: 679, flipkart: 689 },
    { date: "2025-03-01", amazon: 659, flipkart: 679 },
    { date: "2025-04-01", amazon: 629, flipkart: 649 },
    { date: "2025-05-01", amazon: 599, flipkart: 619 },
  ],
  "macbook-air-m2": [
    { date: "2025-01-01", amazon: 1199, flipkart: 1199 },
    { date: "2025-02-01", amazon: 1199, flipkart: 1189 },
    { date: "2025-03-01", amazon: 1149, flipkart: 1179 },
    { date: "2025-04-01", amazon: 1129, flipkart: 1169 },
    { date: "2025-05-01", amazon: 1099, flipkart: 1149 },
  ],
  "sony-wh-1000xm5": [
    { date: "2025-01-01", amazon: 399, flipkart: 399 },
    { date: "2025-02-01", amazon: 389, flipkart: 379 },
    { date: "2025-03-01", amazon: 379, flipkart: 369 },
    { date: "2025-04-01", amazon: 369, flipkart: 349 },
    { date: "2025-05-01", amazon: 349, flipkart: 329 },
  ],
};

// Simulated API functions
export const searchProducts = async (query: string): Promise<Product[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!query) return [];

  // Filter products based on search query
  const normalizedQuery = query.toLowerCase().trim();
  
  try {
    const results = mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery) ||
        Object.values(product.specs).some(spec => 
          spec.toLowerCase().includes(normalizedQuery)
        )
    );

    if (results.length === 0) {
      return [];
    }

    return results;
  } catch (error) {
    console.error("Error searching products:", error);
    toast.error("Failed to search products. Please try again.");
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const product = mockProducts.find((product) => product.id === id);
    if (!product) {
      toast.error("Product not found");
      return null;
    }
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    toast.error("Failed to fetch product details");
    return null;
  }
};

export const getPriceHistory = async (productId: string): Promise<PriceHistory[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700));

  try {
    const history = mockPriceHistory[productId];
    if (!history) {
      return [];
    }
    return history;
  } catch (error) {
    console.error("Error fetching price history:", error);
    toast.error("Failed to fetch price history");
    return [];
  }
};
