
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
        current: 59999,
        original: 69900,
        discount: 14.2,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 58499,
        original: 69900,
        discount: 16.3,
        currency: "INR",
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
        current: 49999,
        original: 59999,
        discount: 16.7,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 51999,
        original: 59999,
        discount: 13.3,
        currency: "INR",
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
        current: 92999,
        original: 99900,
        discount: 6.9,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 94999,
        original: 99900,
        discount: 4.9,
        currency: "INR",
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
        current: 29999,
        original: 34990,
        discount: 14.3,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 28490,
        original: 34990,
        discount: 18.6,
        currency: "INR",
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
  // Adding 46 more products (for a total of 50)
  {
    id: "oneplus-11-5g",
    name: "OnePlus 11 5G",
    description: "6.7-inch 2K 120Hz AMOLED, Snapdragon 8 Gen 2, 50MP Hasselblad Camera",
    image: "https://m.media-amazon.com/images/I/61amb0CfMGL._SL1500_.jpg",
    ratings: {
      amazon: 4.5,
      flipkart: 4.6,
    },
    prices: {
      amazon: {
        current: 56999,
        original: 61999,
        discount: 8.1,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 55499,
        original: 61999,
        discount: 10.5,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 7, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 8, 2025",
        isFree: true,
      },
    },
    specs: {
      display: "6.7-inch AMOLED 120Hz",
      processor: "Snapdragon 8 Gen 2",
      storage: "256GB",
      camera: "50MP Hasselblad triple-camera",
      battery: "5000 mAh, 100W charging",
    },
  },
  {
    id: "lg-c2-oled-tv-55",
    name: "LG C2 OLED TV 55\"",
    description: "55-inch 4K OLED Smart TV with Dolby Vision, WebOS, and HDMI 2.1",
    image: "https://m.media-amazon.com/images/I/71JTxMshX9L._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.8,
      flipkart: 4.7,
    },
    prices: {
      amazon: {
        current: 109999,
        original: 129999,
        discount: 15.4,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 112990,
        original: 129999,
        discount: 13.1,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 18, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 20, 2025",
        isFree: true,
      },
    },
    specs: {
      display: "55-inch 4K OLED",
      resolution: "3840 x 2160",
      refreshRate: "120Hz",
      smartFeatures: "WebOS, AI ThinQ",
      connectivity: "HDMI 2.1, Wi-Fi, Bluetooth",
    },
  },
  {
    id: "dyson-v15-detect",
    name: "Dyson V15 Detect",
    description: "Cordless vacuum with laser dust detection and LCD display",
    image: "https://m.media-amazon.com/images/I/61lsyadK6+L._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.6,
      flipkart: 4.5,
    },
    prices: {
      amazon: {
        current: 59990,
        original: 65900,
        discount: 9.0,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 61900,
        original: 65900,
        discount: 6.1,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 12, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 14, 2025",
        isFree: true,
      },
    },
    specs: {
      runtime: "Up to 60 minutes",
      dustBinCapacity: "0.76L",
      weight: "3.1 kg",
      filtration: "HEPA filtration",
      accessories: "Multiple cleaning heads",
    },
  },
  {
    id: "kindle-paperwhite",
    name: "Kindle Paperwhite (11th Gen)",
    description: "6.8-inch display, 20% faster page turns, adjustable warm light",
    image: "https://m.media-amazon.com/images/I/61LNGJEMh0L._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.7,
      flipkart: 4.5,
    },
    prices: {
      amazon: {
        current: 13999,
        original: 14999,
        discount: 6.7,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 13499,
        original: 14999,
        discount: 10.0,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 6, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 8, 2025",
        isFree: true,
      },
    },
    specs: {
      display: "6.8-inch 300 ppi",
      storage: "8GB",
      waterproof: "IPX8 rated",
      battery: "Up to 10 weeks",
      connectivity: "Wi-Fi",
    },
  },
  {
    id: "samsung-galaxy-watch5",
    name: "Samsung Galaxy Watch 5",
    description: "Advanced health tracking, sapphire crystal glass, Wear OS powered",
    image: "https://m.media-amazon.com/images/I/61aVQDazNHL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.4,
      flipkart: 4.3,
    },
    prices: {
      amazon: {
        current: 22999,
        original: 27999,
        discount: 17.9,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 23499,
        original: 27999,
        discount: 16.1,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 8, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 10, 2025",
        isFree: true,
      },
    },
    specs: {
      display: "1.4-inch AMOLED",
      os: "Wear OS",
      battery: "Up to 40 hours",
      sensors: "BioActive Sensor, ECG",
      durability: "5ATM + IP68, Sapphire Crystal",
    },
  },
  {
    id: "bose-qc45",
    name: "Bose QuietComfort 45",
    description: "Wireless noise cancelling headphones with high-fidelity audio",
    image: "https://m.media-amazon.com/images/I/51JbsHSktkL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.6,
      flipkart: 4.5,
    },
    prices: {
      amazon: {
        current: 26990,
        original: 32900,
        discount: 18.0,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 27990,
        original: 32900,
        discount: 14.9,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 9, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 11, 2025",
        isFree: false,
      },
    },
    specs: {
      type: "Over-ear",
      connectivity: "Bluetooth 5.1",
      batteryLife: "Up to 24 hours",
      noiseCancelling: "Advanced",
      fastCharge: "15 min for 3 hours",
    },
  },
  {
    id: "apple-watch-series-8",
    name: "Apple Watch Series 8",
    description: "Advanced health features, Always-On Retina display, Crash Detection",
    image: "https://m.media-amazon.com/images/I/71XMTLtZd5L._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.7,
      flipkart: 4.6,
    },
    prices: {
      amazon: {
        current: 41999,
        original: 45900,
        discount: 8.5,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 40499,
        original: 45900,
        discount: 11.8,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 10, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 9, 2025",
        isFree: true,
      },
    },
    specs: {
      display: "Always-On Retina",
      features: "ECG, Blood Oxygen",
      waterResistant: "50m",
      connectivity: "GPS + Cellular",
      sensor: "Temperature sensor",
    },
  },
  {
    id: "nintendo-switch-oled",
    name: "Nintendo Switch OLED Model",
    description: "7-inch OLED screen, enhanced audio, wired LAN port",
    image: "https://m.media-amazon.com/images/I/61dYrzvBLbL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.8,
      flipkart: 4.7,
    },
    prices: {
      amazon: {
        current: 30990,
        original: 34990,
        discount: 11.4,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 31490,
        original: 34990,
        discount: 10.0,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 11, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 13, 2025",
        isFree: true,
      },
    },
    specs: {
      display: "7-inch OLED",
      storage: "64GB",
      batteryLife: "4.5-9 hours",
      dockFeatures: "Wired LAN port",
      audioFeatures: "Enhanced audio",
    },
  },
  {
    id: "philips-hue-starter-kit",
    name: "Philips Hue White & Color Starter Kit",
    description: "Smart LED bulbs with Bridge, 16 million colors, voice control",
    image: "https://m.media-amazon.com/images/I/71CQeBSpYPL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.6,
      flipkart: 4.4,
    },
    prices: {
      amazon: {
        current: 11999,
        original: 13999,
        discount: 14.3,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 12499,
        original: 13999,
        discount: 10.7,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 8, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 10, 2025",
        isFree: false,
      },
    },
    specs: {
      bulbsIncluded: "4 color bulbs",
      compatibility: "Alexa, Google, HomeKit",
      control: "App, Voice, Automation",
      connection: "Hue Bridge included",
      wattage: "9W per bulb",
    },
  },
  {
    id: "dell-xps-13",
    name: "Dell XPS 13 (2023)",
    description: "13.4-inch InfinityEdge display, 12th Gen Intel Core, ultra-thin design",
    image: "https://m.media-amazon.com/images/I/71YdE55GwjL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.5,
      flipkart: 4.6,
    },
    prices: {
      amazon: {
        current: 124999,
        original: 139999,
        discount: 10.7,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 127999,
        original: 139999,
        discount: 8.6,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 14, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 16, 2025",
        isFree: true,
      },
    },
    specs: {
      processor: "12th Gen Intel Core i7",
      memory: "16GB LPDDR5",
      storage: "512GB SSD",
      display: "13.4-inch FHD+",
      battery: "Up to 12 hours",
    },
  },
  {
    id: "gopro-hero11",
    name: "GoPro HERO11 Black",
    description: "Waterproof action camera with 5.3K video, HyperSmooth 5.0 stabilization",
    image: "https://m.media-amazon.com/images/I/61LGbo0xwUL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.7,
      flipkart: 4.6,
    },
    prices: {
      amazon: {
        current: 39999,
        original: 44999,
        discount: 11.1,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 41999,
        original: 44999,
        discount: 6.7,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 9, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 11, 2025",
        isFree: true,
      },
    },
    specs: {
      video: "5.3K60 + 4K120",
      photo: "27MP",
      stabilization: "HyperSmooth 5.0",
      waterproof: "10m without case",
      battery: "Enduro battery",
    },
  },
  {
    id: "instant-pot-duo-plus",
    name: "Instant Pot Duo Plus 9-in-1",
    description: "9-in-1 electric pressure cooker with advanced safety features",
    image: "https://m.media-amazon.com/images/I/71i6LQjKGDL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.7,
      flipkart: 4.5,
    },
    prices: {
      amazon: {
        current: 8999,
        original: 11999,
        discount: 25.0,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 9499,
        original: 11999,
        discount: 20.8,
        currency: "INR",
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
      capacity: "6 Liters",
      functions: "9-in-1 functionality",
      programs: "15 smart programs",
      powerSupply: "1000W",
      safetyFeatures: "10+ built-in safety",
    },
  },
  {
    id: "samsung-t7-ssd-1tb",
    name: "Samsung T7 Portable SSD 1TB",
    description: "Portable SSD with read speeds up to 1,050 MB/s and password protection",
    image: "https://m.media-amazon.com/images/I/81ySoZT5UoL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.8,
      flipkart: 4.7,
    },
    prices: {
      amazon: {
        current: 9499,
        original: 12999,
        discount: 26.9,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 9999,
        original: 12999,
        discount: 23.1,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 6, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 7, 2025",
        isFree: true,
      },
    },
    specs: {
      capacity: "1TB",
      readSpeed: "1,050 MB/s",
      writeSpeed: "1,000 MB/s",
      interface: "USB 3.2 Gen 2",
      weight: "58g",
    },
  },
  {
    id: "logitech-mx-master-3s",
    name: "Logitech MX Master 3S",
    description: "Advanced wireless mouse with ultra-fast scrolling and MagSpeed wheel",
    image: "https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.7,
      flipkart: 4.6,
    },
    prices: {
      amazon: {
        current: 7999,
        original: 9999,
        discount: 20.0,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 8499,
        original: 9999,
        discount: 15.0,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 6, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 8, 2025",
        isFree: true,
      },
    },
    specs: {
      tracking: "8K DPI Darkfield",
      buttons: "7 customizable",
      battery: "Up to 70 days",
      connectivity: "Bluetooth or USB",
      compatibility: "Windows, macOS, Linux",
    },
  },
  {
    id: "anker-powercore-26800",
    name: "Anker PowerCore 26800mAh",
    description: "High capacity portable charger with 3 USB ports and fast charging",
    image: "https://m.media-amazon.com/images/I/61jCZBxBWxL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.8,
      flipkart: 4.6,
    },
    prices: {
      amazon: {
        current: 3999,
        original: 4999,
        discount: 20.0,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 4299,
        original: 4999,
        discount: 14.0,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 6, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 7, 2025",
        isFree: true,
      },
    },
    specs: {
      capacity: "26800mAh",
      outputPorts: "3 USB ports",
      inputPorts: "2 Micro USB",
      chargingTime: "6-7 hours",
      weight: "490g",
    },
  },
  {
    id: "fitbit-charge-5",
    name: "Fitbit Charge 5",
    description: "Advanced fitness tracker with built-in GPS and stress management tools",
    image: "https://m.media-amazon.com/images/I/61L5GgMnw+L._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.4,
      flipkart: 4.3,
    },
    prices: {
      amazon: {
        current: 11499,
        original: 14999,
        discount: 23.3,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 12499,
        original: 14999,
        discount: 16.7,
        currency: "INR",
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
      display: "AMOLED color",
      battery: "Up to 7 days",
      waterResistant: "50m",
      sensors: "ECG, EDA, GPS",
      features: "Sleep tracking, Stress management",
    },
  },
  {
    id: "lg-gram-16",
    name: "LG Gram 16",
    description: "Ultra-lightweight 16-inch laptop with 11th Gen Intel Core processor",
    image: "https://m.media-amazon.com/images/I/71RbTOi4LmL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.6,
      flipkart: 4.5,
    },
    prices: {
      amazon: {
        current: 104999,
        original: 119999,
        discount: 12.5,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 109999,
        original: 119999,
        discount: 8.3,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 15, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 17, 2025",
        isFree: true,
      },
    },
    specs: {
      processor: "11th Gen Intel Core i7",
      memory: "16GB LPDDR4x",
      storage: "1TB SSD",
      display: "16-inch WQXGA IPS",
      weight: "1.19kg",
    },
  },
  {
    id: "sony-a7-iv",
    name: "Sony Alpha a7 IV",
    description: "Full-frame mirrorless camera with 33MP sensor and 4K 60p video",
    image: "https://m.media-amazon.com/images/I/81HwzslJ3QL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.8,
      flipkart: 4.7,
    },
    prices: {
      amazon: {
        current: 214999,
        original: 239999,
        discount: 10.4,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 219999,
        original: 239999,
        discount: 8.3,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 14, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 16, 2025",
        isFree: true,
      },
    },
    specs: {
      sensor: "33MP full-frame",
      videoResolution: "4K 60p 10-bit 4:2:2",
      autofocus: "759-point phase-detection AF",
      stabilization: "5-axis in-body",
      storage: "Dual card slots",
    },
  },
  {
    id: "nespresso-vertuo-plus",
    name: "Nespresso Vertuo Plus",
    description: "Coffee and espresso maker with automatic blend recognition",
    image: "https://m.media-amazon.com/images/I/61pZb-IzJnL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.6,
      flipkart: 4.4,
    },
    prices: {
      amazon: {
        current: 15999,
        original: 19999,
        discount: 20.0,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 16999,
        original: 19999,
        discount: 15.0,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 8, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 10, 2025",
        isFree: true,
      },
    },
    specs: {
      cupSizes: "5 cup sizes",
      waterTank: "1.2L capacity",
      heatupTime: "20-25 seconds",
      powerOff: "Automatic after 9 min",
      capsuleContainer: "10 used capsules",
    },
  },
  {
    id: "samsung-galaxy-tab-s8",
    name: "Samsung Galaxy Tab S8",
    description: "11-inch tablet with Snapdragon 8 Gen 1 and S Pen included",
    image: "https://m.media-amazon.com/images/I/81d74GHCPEL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.7,
      flipkart: 4.5,
    },
    prices: {
      amazon: {
        current: 58999,
        original: 66999,
        discount: 11.9,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 60999,
        original: 66999,
        discount: 9.0,
        currency: "INR",
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
        isFree: true,
      },
    },
    specs: {
      display: "11-inch 120Hz LCD",
      processor: "Snapdragon 8 Gen 1",
      memory: "8GB RAM",
      storage: "128GB",
      battery: "8000mAh",
    },
  },
  {
    id: "dji-mini-3-pro",
    name: "DJI Mini 3 Pro",
    description: "Lightweight drone with 4K/60fps video and obstacle avoidance",
    image: "https://m.media-amazon.com/images/I/61Y1P6uIRML._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.7,
      flipkart: 4.6,
    },
    prices: {
      amazon: {
        current: 84999,
        original: 94999,
        discount: 10.5,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 87999,
        original: 94999,
        discount: 7.4,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 12, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 14, 2025",
        isFree: true,
      },
    },
    specs: {
      flightTime: "34 minutes",
      camera: "4K/60fps, 48MP photo",
      weight: "249g",
      range: "12km HD video transmission",
      features: "Tri-directional obstacle sensing",
    },
  },
  {
    id: "weber-spirit-ii-e-310",
    name: "Weber Spirit II E-310 Gas Grill",
    description: "Three-burner grill with GS4 grilling system and iGrill 3 compatible",
    image: "https://m.media-amazon.com/images/I/71c24HdA9xL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.7,
      flipkart: 4.5,
    },
    prices: {
      amazon: {
        current: 47999,
        original: 54999,
        discount: 12.7,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 49999,
        original: 54999,
        discount: 9.1,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 20, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 22, 2025",
        isFree: true,
      },
    },
    specs: {
      burners: "3 stainless steel burners",
      cookingArea: "529 sq in",
      fuelType: "Liquid Propane",
      dimensions: "52 x 27 x 44.5 inches",
      weight: "114 pounds",
    },
  },
  {
    id: "roomba-j7-plus",
    name: "iRobot Roomba j7+ Robot Vacuum",
    description: "Self-emptying robot vacuum with obstacle avoidance technology",
    image: "https://m.media-amazon.com/images/I/71S-RLzlHFL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.5,
      flipkart: 4.4,
    },
    prices: {
      amazon: {
        current: 59999,
        original: 74999,
        discount: 20.0,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 64999,
        original: 74999,
        discount: 13.3,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 12, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 14, 2025",
        isFree: true,
      },
    },
    specs: {
      suction: "10x power-lifting suction",
      navigation: "PrecisionVision Navigation",
      cleaning: "3-Stage Cleaning System",
      autoEmpty: "60-day capacity",
      batteryLife: "Up to 75 minutes",
    },
  },
  {
    id: "keychron-k8-pro",
    name: "Keychron K8 Pro Mechanical Keyboard",
    description: "Wireless hot-swappable mechanical keyboard with QMK/VIA support",
    image: "https://m.media-amazon.com/images/I/71DlpiQ0IGL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.7,
      flipkart: 4.6,
    },
    prices: {
      amazon: {
        current: 8999,
        original: 10999,
        discount: 18.2,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 9499,
        original: 10999,
        discount: 13.6,
        currency: "INR",
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
      layout: "TKL (87 keys)",
      switches: "Gateron G Pro",
      connectivity: "Bluetooth 5.1, USB-C",
      battery: "4000mAh",
      features: "Hot-swappable, QMK/VIA support",
    },
  },
  {
    id: "garmin-fenix-7",
    name: "Garmin Fenix 7 Sapphire",
    description: "Premium multisport GPS watch with solar charging and touchscreen",
    image: "https://m.media-amazon.com/images/I/71RosFIDQPL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.8,
      flipkart: 4.7,
    },
    prices: {
      amazon: {
        current: 74990,
        original: 84990,
        discount: 11.8,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 77990,
        original: 84990,
        discount: 8.2,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 9, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 11, 2025",
        isFree: true,
      },
    },
    specs: {
      display: "1.3-inch solar touchscreen",
      batteryLife: "Up to 28 days",
      waterRating: "10 ATM",
      sensors: "GPS, GLONASS, heart rate, pulse ox",
      lens: "Sapphire crystal",
    },
  },
  {
    id: "samsung-odyssey-g7",
    name: "Samsung Odyssey G7 32-inch Gaming Monitor",
    description: "32-inch curved gaming monitor with 240Hz refresh rate and 1ms response time",
    image: "https://m.media-amazon.com/images/I/61Sz+PmNbFL._AC_SL1000_.jpg",
    ratings: {
      amazon: 4.6,
      flipkart: 4.5,
    },
    prices: {
      amazon: {
        current: 54999,
        original: 64999,
        discount: 15.4,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 57999,
        original: 64999,
        discount: 10.8,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 15, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 17, 2025",
        isFree: true,
      },
    },
    specs: {
      resolution: "2560 x 1440 (WQHD)",
      refreshRate: "240Hz",
      responseTime: "1ms",
      panel: "VA, 1000R curved",
      features: "G-Sync, HDR600",
    },
  },
  {
    id: "lenovo-legion-5-pro",
    name: "Lenovo Legion 5 Pro Gaming Laptop",
    description: "16-inch QHD+ gaming laptop with RTX 3070 and AMD Ryzen 7",
    image: "https://m.media-amazon.com/images/I/81zcUyiRLnL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.6,
      flipkart: 4.7,
    },
    prices: {
      amazon: {
        current: 149999,
        original: 169999,
        discount: 11.8,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 147999,
        original: 169999,
        discount: 12.9,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 14, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 12, 2025",
        isFree: true,
      },
    },
    specs: {
      processor: "AMD Ryzen 7 5800H",
      graphics: "NVIDIA RTX 3070 8GB",
      memory: "16GB DDR4-3200",
      storage: "1TB SSD",
      display: "16\" QHD+ 165Hz",
    },
  },
  {
    id: "steelseries-arctis-pro",
    name: "SteelSeries Arctis Pro Wireless",
    description: "Premium wireless gaming headset with dual-wireless technology",
    image: "https://m.media-amazon.com/images/I/81lGa7i5U2L._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.5,
      flipkart: 4.4,
    },
    prices: {
      amazon: {
        current: 24999,
        original: 29999,
        discount: 16.7,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 25999,
        original: 29999,
        discount: 13.3,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 9, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 11, 2025",
        isFree: false,
      },
    },
    specs: {
      audio: "Hi-Res capable speakers",
      wireless: "2.4GHz & Bluetooth",
      microphone: "ClearCast bidirectional",
      battery: "Dual-battery system",
      compatibility: "PC, PS4/5",
    },
  },
  {
    id: "sonos-arc",
    name: "Sonos Arc Soundbar",
    description: "Premium smart soundbar with Dolby Atmos and voice control",
    image: "https://m.media-amazon.com/images/I/61EgwzhBrcL._AC_SL1000_.jpg",
    ratings: {
      amazon: 4.7,
      flipkart: 4.6,
    },
    prices: {
      amazon: {
        current: 84999,
        original: 94999,
        discount: 10.5,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 87999,
        original: 94999,
        discount: 7.4,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 13, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 15, 2025",
        isFree: true,
      },
    },
    specs: {
      channels: "5.0.2 channels",
      audio: "Dolby Atmos support",
      connectivity: "Wi-Fi, HDMI eARC",
      voiceControl: "Amazon Alexa, Google Assistant",
      dimensions: "45 x 4.5 x 3.4 inches",
    },
  },
  {
    id: "roborock-s7-maxv-ultra",
    name: "Roborock S7 MaxV Ultra",
    description: "Robot vacuum and mop with auto-empty, wash, and refill dock",
    image: "https://m.media-amazon.com/images/I/7166BQNQVUL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.5,
      flipkart: 4.4,
    },
    prices: {
      amazon: {
        current: 85999,
        original: 99999,
        discount: 14.0,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 89999,
        original: 99999,
        discount: 10.0,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 14, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 16, 2025",
        isFree: true,
      },
    },
    specs: {
      suction: "5100Pa",
      navigation: "ReactiveAI 2.0, LiDAR",
      batteryLife: "180 minutes",
      dockFeatures: "Self-empty, self-wash, self-refill",
      mopLift: "VibraRise mop lifting",
    },
  },
  {
    id: "wacom-cintiq-pro-16",
    name: "Wacom Cintiq Pro 16",
    description: "Creative pen display with 4K resolution and pro pen 2 technology",
    image: "https://m.media-amazon.com/images/I/71Vf2mB+KAL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.6,
      flipkart: 4.5,
    },
    prices: {
      amazon: {
        current: 159999,
        original: 179999,
        discount: 11.1,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 164999,
        original: 179999,
        discount: 8.3,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 16, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 18, 2025",
        isFree: true,
      },
    },
    specs: {
      display: "15.6-inch 4K display",
      pressureLevels: "8192 levels",
      resolution: "3840 x 2160",
      colorGamut: "98% Adobe RGB",
      connectivity: "USB-C, HDMI",
    },
  },
  {
    id: "breville-barista-express",
    name: "Breville Barista Express",
    description: "Espresso machine with built-in grinder and pressure gauge",
    image: "https://m.media-amazon.com/images/I/81+DUmQjE4L._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.7,
      flipkart: 4.6,
    },
    prices: {
      amazon: {
        current: 54999,
        original: 64999,
        discount: 15.4,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 57999,
        original: 64999,
        discount: 10.8,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 12, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 14, 2025",
        isFree: true,
      },
    },
    specs: {
      grinder: "Built-in conical burr",
      pressure: "15 bar Italian pump",
      steamWand: "360° swivel action",
      waterTank: "2L removable",
      controls: "Dose control grinding",
    },
  },
  {
    id: "canon-eos-r6",
    name: "Canon EOS R6",
    description: "Full-frame mirrorless camera with in-body stabilization and 4K video",
    image: "https://m.media-amazon.com/images/I/81aRhKFfYKL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.8,
      flipkart: 4.7,
    },
    prices: {
      amazon: {
        current: 199999,
        original: 229999,
        discount: 13.0,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 205999,
        original: 229999,
        discount: 10.4,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 13, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 15, 2025",
        isFree: true,
      },
    },
    specs: {
      sensor: "20MP full-frame CMOS",
      processor: "DIGIC X",
      autofocus: "1053-point Dual Pixel CMOS AF II",
      stabilization: "5-axis in-body IS",
      video: "4K60p, 10-bit 4:2:2 internal",
    },
  },
  {
    id: "theragun-pro",
    name: "Theragun Pro",
    description: "Professional-grade deep muscle treatment massage gun",
    image: "https://m.media-amazon.com/images/I/71bJoQJLM+L._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.7,
      flipkart: 4.6,
    },
    prices: {
      amazon: {
        current: 35990,
        original: 42999,
        discount: 16.3,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 37990,
        original: 42999,
        discount: 11.6,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 9, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 11, 2025",
        isFree: false,
      },
    },
    specs: {
      speeds: "5 built-in speeds",
      amplitude: "16mm percussion",
      batteryLife: "150 minutes total",
      noise: "QuietForce Technology",
      attachments: "6 interchangeable heads",
    },
  },
  {
    id: "samsung-990-pro-ssd-2tb",
    name: "Samsung 990 PRO 2TB SSD",
    description: "PCIe 4.0 NVMe SSD with heatsink for PC and PS5",
    image: "https://m.media-amazon.com/images/I/71LfnkRgZ4L._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.8,
      flipkart: 4.7,
    },
    prices: {
      amazon: {
        current: 19999,
        original: 24999,
        discount: 20.0,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 21499,
        original: 24999,
        discount: 14.0,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 7, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 8, 2025",
        isFree: true,
      },
    },
    specs: {
      capacity: "2TB",
      readSpeed: "7,450 MB/s",
      writeSpeed: "6,900 MB/s",
      interface: "PCIe Gen 4.0 x4, NVMe 2.0",
      form: "M.2 2280",
    },
  },
  {
    id: "oculus-quest-2",
    name: "Meta Quest 2",
    description: "All-in-one virtual reality headset with touch controllers",
    image: "https://m.media-amazon.com/images/I/615YaAiA-ML._SL1500_.jpg",
    ratings: {
      amazon: 4.7,
      flipkart: 4.6,
    },
    prices: {
      amazon: {
        current: 29999,
        original: 34999,
        discount: 14.3,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 31499,
        original: 34999,
        discount: 10.0,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 8, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 10, 2025",
        isFree: false,
      },
    },
    specs: {
      storage: "128GB",
      display: "1832 x 1920 per eye",
      processor: "Snapdragon XR2",
      memory: "6GB RAM",
      batteryLife: "2-3 hours",
    },
  },
  {
    id: "ninja-foodi-air-fryer",
    name: "Ninja Foodi 6-in-1 Air Fryer",
    description: "6-in-1 air fryer with 2-basket technology for multiple foods at once",
    image: "https://m.media-amazon.com/images/I/81+WxjROggL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.8,
      flipkart: 4.6,
    },
    prices: {
      amazon: {
        current: 12999,
        original: 16999,
        discount: 23.5,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 13999,
        original: 16999,
        discount: 17.6,
        currency: "INR",
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
      capacity: "7.6L (2x 3.8L baskets)",
      functions: "Air Fry, Roast, Bake, Reheat, Dehydrate, Max Crisp",
      power: "1750W",
      temperature: "40-240°C",
      technology: "DualZone Technology",
    },
  },
  {
    id: "lg-gram-17",
    name: "LG Gram 17",
    description: "Ultra-lightweight 17-inch laptop with long battery life",
    image: "https://m.media-amazon.com/images/I/816hZafXJ6L._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.7,
      flipkart: 4.6,
    },
    prices: {
      amazon: {
        current: 124999,
        original: 144999,
        discount: 13.8,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 129999,
        original: 144999,
        discount: 10.3,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 15, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 17, 2025",
        isFree: true,
      },
    },
    specs: {
      processor: "12th Gen Intel Core i7",
      memory: "16GB LPDDR5",
      storage: "1TB SSD",
      display: "17-inch WQXGA (2560x1600)",
      weight: "1.35kg",
    },
  },
  {
    id: "bose-soundbar-700",
    name: "Bose Soundbar 700",
    description: "Premium soundbar with Alexa voice control and immersive sound",
    image: "https://m.media-amazon.com/images/I/617Wl+kiN9L._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.6,
      flipkart: 4.5,
    },
    prices: {
      amazon: {
        current: 69990,
        original: 79990,
        discount: 12.5,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 72990,
        original: 79990,
        discount: 8.8,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 11, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 13, 2025",
        isFree: true,
      },
    },
    specs: {
      channels: "1 channel",
      connectivity: "Wi-Fi, Bluetooth, HDMI ARC",
      voiceAssistants: "Alexa, Google Assistant",
      dimensions: "4.25\" H x 38.5\" W x 2.25\" D",
      audioFormats: "Dolby Digital, DTS",
    },
  },
  {
    id: "fujifilm-x-t4",
    name: "Fujifilm X-T4",
    description: "Mirrorless camera with in-body stabilization and 4K/60p video",
    image: "https://m.media-amazon.com/images/I/71C68a5OmRL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.8,
      flipkart: 4.7,
    },
    prices: {
      amazon: {
        current: 149990,
        original: 169990,
        discount: 11.8,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 153990,
        original: 169990,
        discount: 9.4,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 13, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 15, 2025",
        isFree: true,
      },
    },
    specs: {
      sensor: "26.1MP APS-C X-Trans CMOS 4",
      processor: "X-Processor 4",
      stabilization: "5-axis IBIS, up to 6.5 stops",
      autofocus: "425-point hybrid phase/contrast AF",
      video: "4K/60p 10-bit internal recording",
    },
  },
  {
    id: "dyson-air-purifier-hot-cool",
    name: "Dyson Pure Hot+Cool",
    description: "Air purifier, heater and fan with air quality monitoring",
    image: "https://m.media-amazon.com/images/I/61oJmIf7CeL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.5,
      flipkart: 4.4,
    },
    prices: {
      amazon: {
        current: 47990,
        original: 54990,
        discount: 12.7,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 49990,
        original: 54990,
        discount: 9.1,
        currency: "INR",
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
        isFree: true,
      },
    },
    specs: {
      purification: "HEPA and activated carbon filters",
      sensors: "Real-time air quality monitoring",
      oscillation: "350° oscillation",
      modes: "Auto, Night, 10 airflow settings",
      control: "App and remote control",
    },
  },
  {
    id: "peloton-bike-plus",
    name: "Peloton Bike+",
    description: "Premium indoor exercise bike with rotating HD touchscreen",
    image: "https://m.media-amazon.com/images/I/61+K-mV+qRL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.7,
      flipkart: 4.6,
    },
    prices: {
      amazon: {
        current: 199990,
        original: 229990,
        discount: 13.0,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 209990,
        original: 229990,
        discount: 8.7,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 20, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 22, 2025",
        isFree: true,
      },
    },
    specs: {
      display: "23.8\" HD touchscreen",
      features: "360° rotating screen",
      resistance: "Digital resistance control",
      audio: "4-channel audio with subwoofer",
      connectivity: "WiFi, Bluetooth, ANT+",
    },
  },
  {
    id: "pilot-precise-v7-pens",
    name: "Pilot Precise V7 Pens (12-pack)",
    description: "Premium rollerball pens with precision fine point (0.7mm)",
    image: "https://m.media-amazon.com/images/I/71UXG-JvZfL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.8,
      flipkart: 4.6,
    },
    prices: {
      amazon: {
        current: 799,
        original: 999,
        discount: 20.0,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 849,
        original: 999,
        discount: 15.0,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 7, 2025",
        isFree: false,
      },
      flipkart: {
        estimatedDate: "May 8, 2025",
        isFree: false,
      },
    },
    specs: {
      pointSize: "0.7mm (fine)",
      inkType: "Liquid ink",
      colors: "Assorted colors",
      quantity: "12-pack",
      features: "Airplane-safe, refillable",
    },
  },
  {
    id: "north-face-borealis-backpack",
    name: "The North Face Borealis Backpack",
    description: "28L backpack with laptop sleeve and FlexVent suspension system",
    image: "https://m.media-amazon.com/images/I/71SVw+8cOnL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.7,
      flipkart: 4.6,
    },
    prices: {
      amazon: {
        current: 5499,
        original: 6999,
        discount: 21.4,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 5999,
        original: 6999,
        discount: 14.3,
        currency: "INR",
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
      capacity: "28 liters",
      laptopSleeve: "Fits 15\" laptop",
      material: "Recycled polyester ripstop",
      pockets: "Multiple compartments",
      suspension: "FlexVent suspension system",
    },
  },
  {
    id: "xbox-series-x",
    name: "Xbox Series X",
    description: "Next-gen gaming console with 4K gaming and fast load times",
    image: "https://m.media-amazon.com/images/I/61JGKhqxHxL._SL1500_.jpg",
    ratings: {
      amazon: 4.8,
      flipkart: 4.7,
    },
    prices: {
      amazon: {
        current: 49990,
        original: 54990,
        discount: 9.1,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 50990,
        original: 54990,
        discount: 7.3,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 12, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 14, 2025",
        isFree: true,
      },
    },
    specs: {
      processor: "8-core AMD Zen 2",
      gpu: "12 TFLOPS, RDNA 2",
      storage: "1TB Custom SSD",
      resolution: "4K gaming at 60-120 FPS",
      features: "Ray tracing, Quick Resume",
    },
  },
  {
    id: "playstation-5",
    name: "PlayStation 5",
    description: "Sony's next-gen console with ultra-high speed SSD and 3D audio",
    image: "https://m.media-amazon.com/images/I/51wPWj--PLL._SL1059_.jpg",
    ratings: {
      amazon: 4.8,
      flipkart: 4.7,
    },
    prices: {
      amazon: {
        current: 49990,
        original: 54990,
        discount: 9.1,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 50990,
        original: 54990,
        discount: 7.3,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 13, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 15, 2025",
        isFree: true,
      },
    },
    specs: {
      processor: "8-core AMD Zen 2",
      gpu: "10.3 TFLOPS, RDNA 2",
      storage: "825GB SSD",
      resolution: "4K gaming at 60-120 FPS",
      controller: "DualSense with haptic feedback",
    },
  },
  {
    id: "aesop-resurrection-hand-wash",
    name: "Aesop Resurrection Aromatique Hand Wash",
    description: "Premium hand wash with mandarin rind, rosemary leaf, and cedar atlas",
    image: "https://m.media-amazon.com/images/I/61RXss3detL._SL1500_.jpg",
    ratings: {
      amazon: 4.6,
      flipkart: 4.4,
    },
    prices: {
      amazon: {
        current: 2499,
        original: 2999,
        discount: 16.7,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 2599,
        original: 2999,
        discount: 13.3,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 8, 2025",
        isFree: false,
      },
      flipkart: {
        estimatedDate: "May 10, 2025",
        isFree: false,
      },
    },
    specs: {
      volume: "500ml",
      ingredients: "Plant-based, vegan",
      fragrance: "Citrus, woody, herbaceous",
      packaging: "Amber glass bottle",
      skinType: "All skin types",
    },
  },
  {
    id: "ember-temperature-control-mug",
    name: "Ember Temperature Control Smart Mug 2",
    description: "Smart mug that maintains your perfect drinking temperature",
    image: "https://m.media-amazon.com/images/I/618cfJWxWbL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.4,
      flipkart: 4.2,
    },
    prices: {
      amazon: {
        current: 9999,
        original: 12999,
        discount: 23.1,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 10999,
        original: 12999,
        discount: 15.4,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 9, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 11, 2025",
        isFree: false,
      },
    },
    specs: {
      capacity: "295ml",
      batteryLife: "1.5 hours",
      temperatureRange: "50-62.5°C",
      chargingCoaster: "Included",
      control: "Smartphone app",
    },
  },
  {
    id: "philips-sonicare-9900",
    name: "Philips Sonicare 9900 Prestige",
    description: "Advanced electric toothbrush with SenseIQ technology",
    image: "https://m.media-amazon.com/images/I/717I7QMgCiL._SL1500_.jpg",
    ratings: {
      amazon: 4.6,
      flipkart: 4.5,
    },
    prices: {
      amazon: {
        current: 21999,
        original: 27999,
        discount: 21.4,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 23499,
        original: 27999,
        discount: 16.1,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 8, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 10, 2025",
        isFree: false,
      },
    },
    specs: {
      technology: "SenseIQ pressure sensing",
      brushingModes: "5 modes, 3 intensities",
      batteryLife: "Up to 2 weeks",
      accessories: "Premium travel case",
      connectivity: "Bluetooth app connection",
    },
  },
  {
    id: "lego-star-wars-millennium-falcon",
    name: "LEGO Star Wars Millennium Falcon",
    description: "Ultimate Collector Series with 7,541 pieces and detailed interior",
    image: "https://m.media-amazon.com/images/I/914ODQnR1yL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.9,
      flipkart: 4.8,
    },
    prices: {
      amazon: {
        current: 74999,
        original: 84999,
        discount: 11.8,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 77999,
        original: 84999,
        discount: 8.2,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 18, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 20, 2025",
        isFree: true,
      },
    },
    specs: {
      pieces: "7,541 pieces",
      minifigures: "7 minifigures",
      dimensions: "84 x 56 x 21 cm",
      ageRecommendation: "16+",
      features: "Detailed interior, swiveling gun turrets",
    },
  },
  {
    id: "le-creuset-round-dutch-oven",
    name: "Le Creuset Enameled Cast Iron Round Dutch Oven",
    description: "Premium enameled cast iron dutch oven for perfect cooking results",
    image: "https://m.media-amazon.com/images/I/71q+321eOIL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.8,
      flipkart: 4.7,
    },
    prices: {
      amazon: {
        current: 29999,
        original: 36999,
        discount: 18.9,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 31999,
        original: 36999,
        discount: 13.5,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 12, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 14, 2025",
        isFree: true,
      },
    },
    specs: {
      capacity: "5.3 liters",
      material: "Enameled cast iron",
      compatibility: "All cooktops including induction",
      dishwasherSafe: "Yes",
      warranty: "Limited lifetime warranty",
    },
  },
  {
    id: "stagg-ekg-electric-kettle",
    name: "Fellow Stagg EKG Electric Kettle",
    description: "Pour-over electric kettle with variable temperature control",
    image: "https://m.media-amazon.com/images/I/71E-1FXeH0L._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.6,
      flipkart: 4.5,
    },
    prices: {
      amazon: {
        current: 12999,
        original: 15999,
        discount: 18.8,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 13999,
        original: 15999,
        discount: 12.5,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 9, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 11, 2025",
        isFree: false,
      },
    },
    specs: {
      capacity: "0.9 liters",
      temperature: "Variable temperature control",
      holdFunction: "60-minute temperature hold",
      material: "304 stainless steel",
      power: "1200 watts",
    },
  },
  {
    id: "ooni-koda-gas-pizza-oven",
    name: "Ooni Koda Gas Powered Pizza Oven",
    description: "Portable gas-powered pizza oven that reaches 500°C in 15 minutes",
    image: "https://m.media-amazon.com/images/I/71IvhGxUIUL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.7,
      flipkart: 4.5,
    },
    prices: {
      amazon: {
        current: 29999,
        original: 36999,
        discount: 18.9,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 31999,
        original: 36999,
        discount: 13.5,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 14, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 16, 2025",
        isFree: true,
      },
    },
    specs: {
      cookingTemp: "Up to 500°C",
      cookingTime: "60 seconds per pizza",
      fuelType: "Propane gas",
      dimensions: "63 x 40 x 29cm",
      weight: "9.25kg",
    },
  },
  {
    id: "vitamix-a3500",
    name: "Vitamix A3500 Ascent Series Blender",
    description: "Professional-grade blender with touchscreen controls and programmable settings",
    image: "https://m.media-amazon.com/images/I/71TwXqcsTuL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.8,
      flipkart: 4.7,
    },
    prices: {
      amazon: {
        current: 59999,
        original: 69999,
        discount: 14.3,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 62999,
        original: 69999,
        discount: 10.0,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 11, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 13, 2025",
        isFree: true,
      },
    },
    specs: {
      power: "1500 watts",
      capacity: "2 liters",
      programs: "5 program settings",
      features: "Self-detect containers, wireless connectivity",
      warranty: "10-year warranty",
    },
  },
  {
    id: "nest-learning-thermostat",
    name: "Google Nest Learning Thermostat",
    description: "Smart thermostat that learns your schedule and programs itself",
    image: "https://m.media-amazon.com/images/I/71GIRQHecmL._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.6,
      flipkart: 4.5,
    },
    prices: {
      amazon: {
        current: 18999,
        original: 23999,
        discount: 20.8,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 20499,
        original: 23999,
        discount: 14.6,
        currency: "INR",
        url: "https://www.flipkart.com",
      },
    },
    delivery: {
      amazon: {
        estimatedDate: "May 8, 2025",
        isFree: true,
      },
      flipkart: {
        estimatedDate: "May 10, 2025",
        isFree: false,
      },
    },
    specs: {
      display: "High-resolution color screen",
      sensors: "Temperature, humidity, activity",
      compatibility: "Works with 95% of heating systems",
      control: "Mobile app, voice control",
      features: "Self-learning, energy history",
    },
  },
  {
    id: "jabra-elite-7-pro",
    name: "Jabra Elite 7 Pro",
    description: "True wireless earbuds with MultiSensor Voice technology",
    image: "https://m.media-amazon.com/images/I/71mzC8bst9L._AC_SL1500_.jpg",
    ratings: {
      amazon: 4.5,
      flipkart: 4.4,
    },
    prices: {
      amazon: {
        current: 16999,
        original: 21999,
        discount: 22.7,
        currency: "INR",
        url: "https://www.amazon.com",
      },
      flipkart: {
        current: 17999,
        original: 21999,
        discount: 18.2,
        currency: "INR",
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
      batteryLife: "Up to 9 hours (30 with case)",
      waterRating: "IP57 water and dust resistant",
      noiseCancelling: "Adjustable ANC",
      microphones: "4-microphone technology",
      connectivity: "Bluetooth 5.2",
    },
  },
];

// Mock price history data
const mockPriceHistory: Record<string, PriceHistory[]> = {
  // Original 4 products
  "iphone-13-128gb": [
    { date: "2025-01-01", amazon: 69900, flipkart: 69900 },
    { date: "2025-02-01", amazon: 65999, flipkart: 66999 },
    { date: "2025-03-01", amazon: 62999, flipkart: 61999 },
    { date: "2025-04-01", amazon: 60999, flipkart: 59499 },
    { date: "2025-05-01", amazon: 59999, flipkart: 58499 },
  ],
  "samsung-galaxy-s22": [
    { date: "2025-01-01", amazon: 59999, flipkart: 59999 },
    { date: "2025-02-01", amazon: 57999, flipkart: 58999 },
    { date: "2025-03-01", amazon: 55999, flipkart: 56999 },
    { date: "2025-04-01", amazon: 51999, flipkart: 53999 },
    { date: "2025-05-01", amazon: 49999, flipkart: 51999 },
  ],
  "macbook-air-m2": [
    { date: "2025-01-01", amazon: 99900, flipkart: 99900 },
    { date: "2025-02-01", amazon: 99900, flipkart: 98900 },
    { date: "2025-03-01", amazon: 96999, flipkart: 97900 },
    { date: "2025-04-01", amazon: 94999, flipkart: 96999 },
    { date: "2025-05-01", amazon: 92999, flipkart: 94999 },
  ],
  "sony-wh-1000xm5": [
    { date: "2025-01-01", amazon: 34990, flipkart: 34990 },
    { date: "2025-02-01", amazon: 32990, flipkart: 31990 },
    { date: "2025-03-01", amazon: 31490, flipkart: 30990 },
    { date: "2025-04-01", amazon: 30990, flipkart: 29490 },
    { date: "2025-05-01", amazon: 29999, flipkart: 28490 },
  ],
  
  // Add price history for all new products
  "oneplus-11-5g": [
    { date: "2025-01-01", amazon: 61999, flipkart: 61999 },
    { date: "2025-02-01", amazon: 60999, flipkart: 59999 },
    { date: "2025-03-01", amazon: 58999, flipkart: 57999 },
    { date: "2025-04-01", amazon: 57499, flipkart: 56499 },
    { date: "2025-05-01", amazon: 56999, flipkart: 55499 },
  ],
  "lg-c2-oled-tv-55": [
    { date: "2025-01-01", amazon: 129999, flipkart: 129999 },
    { date: "2025-02-01", amazon: 124999, flipkart: 126990 },
    { date: "2025-03-01", amazon: 119999, flipkart: 122990 },
    { date: "2025-04-01", amazon: 114999, flipkart: 117990 },
    { date: "2025-05-01", amazon: 109999, flipkart: 112990 },
  ],
  "dyson-v15-detect": [
    { date: "2025-01-01", amazon: 65900, flipkart: 65900 },
    { date: "2025-02-01", amazon: 63990, flipkart: 64900 },
    { date: "2025-03-01", amazon: 61990, flipkart: 63900 },
    { date: "2025-04-01", amazon: 60990, flipkart: 62900 },
    { date: "2025-05-01", amazon: 59990, flipkart: 61900 },
  ],
  "kindle-paperwhite": [
    { date: "2025-01-01", amazon: 14999, flipkart: 14999 },
    { date: "2025-02-01", amazon: 14499, flipkart: 14499 },
    { date: "2025-03-01", amazon: 13999, flipkart: 13999 },
    { date: "2025-04-01", amazon: 13999, flipkart: 13749 },
    { date: "2025-05-01", amazon: 13999, flipkart: 13499 },
  ],
  "samsung-galaxy-watch5": [
    { date: "2025-01-01", amazon: 27999, flipkart: 27999 },
    { date: "2025-02-01", amazon: 26499, flipkart: 26999 },
    { date: "2025-03-01", amazon: 24999, flipkart: 25999 },
    { date: "2025-04-01", amazon: 23999, flipkart: 24499 },
    { date: "2025-05-01", amazon: 22999, flipkart: 23499 },
  ],
  "bose-qc45": [
    { date: "2025-01-01", amazon: 32900, flipkart: 32900 },
    { date: "2025-02-01", amazon: 30990, flipkart: 31990 },
    { date: "2025-03-01", amazon: 29990, flipkart: 30990 },
    { date: "2025-04-01", amazon: 27990, flipkart: 29990 },
    { date: "2025-05-01", amazon: 26990, flipkart: 27990 },
  ],
  "apple-watch-series-8": [
    { date: "2025-01-01", amazon: 45900, flipkart: 45900 },
    { date: "2025-02-01", amazon: 44900, flipkart: 44900 },
    { date: "2025-03-01", amazon: 43499, flipkart: 42900 },
    { date: "2025-04-01", amazon: 42499, flipkart: 41499 },
    { date: "2025-05-01", amazon: 41999, flipkart: 40499 },
  ],
  "nintendo-switch-oled": [
    { date: "2025-01-01", amazon: 34990, flipkart: 34990 },
    { date: "2025-02-01", amazon: 33990, flipkart: 34490 },
    { date: "2025-03-01", amazon: 32990, flipkart: 33490 },
    { date: "2025-04-01", amazon: 31990, flipkart: 32490 },
    { date: "2025-05-01", amazon: 30990, flipkart: 31490 },
  ],
  "philips-hue-starter-kit": [
    { date: "2025-01-01", amazon: 13999, flipkart: 13999 },
    { date: "2025-02-01", amazon: 13499, flipkart: 13799 },
    { date: "2025-03-01", amazon: 12999, flipkart: 13499 },
    { date: "2025-04-01", amazon: 12499, flipkart: 12999 },
    { date: "2025-05-01", amazon: 11999, flipkart: 12499 },
  ],
  "dell-xps-13": [
    { date: "2025-01-01", amazon: 139999, flipkart: 139999 },
    { date: "2025-02-01", amazon: 137999, flipkart: 138999 },
    { date: "2025-03-01", amazon: 134999, flipkart: 136999 },
    { date: "2025-04-01", amazon: 129999, flipkart: 132999 },
    { date: "2025-05-01", amazon: 124999, flipkart: 127999 },
  ],
  "gopro-hero11": [
    { date: "2025-01-01", amazon: 44999, flipkart: 44999 },
    { date: "2025-02-01", amazon: 43999, flipkart: 44499 },
    { date: "2025-03-01", amazon: 42999, flipkart: 43999 },
    { date: "2025-04-01", amazon: 40999, flipkart: 42999 },
    { date: "2025-05-01", amazon: 39999, flipkart: 41999 },
  ],
  "instant-pot-duo-plus": [
    { date: "2025-01-01", amazon: 11999, flipkart: 11999 },
    { date: "2025-02-01", amazon: 10999, flipkart: 11499 },
    { date: "2025-03-01", amazon: 9999, flipkart: 10999 },
    { date: "2025-04-01", amazon: 9499, flipkart: 9999 },
    { date: "2025-05-01", amazon: 8999, flipkart: 9499 },
  ],
  "samsung-t7-ssd-1tb": [
    { date: "2025-01-01", amazon: 12999, flipkart: 12999 },
    { date: "2025-02-01", amazon: 11999, flipkart: 12499 },
    { date: "2025-03-01", amazon: 10999, flipkart: 11499 },
    { date: "2025-04-01", amazon: 9999, flipkart: 10499 },
    { date: "2025-05-01", amazon: 9499, flipkart: 9999 },
  ],
  "logitech-mx-master-3s": [
    { date: "2025-01-01", amazon: 9999, flipkart: 9999 },
    { date: "2025-02-01", amazon: 9499, flipkart: 9699 },
    { date: "2025-03-01", amazon: 8999, flipkart: 9499 },
    { date: "2025-04-01", amazon: 8499, flipkart: 8999 },
    { date: "2025-05-01", amazon: 7999, flipkart: 8499 },
  ],
  "anker-powercore-26800": [
    { date: "2025-01-01", amazon: 4999, flipkart: 4999 },
    { date: "2025-02-01", amazon: 4799, flipkart: 4899 },
    { date: "2025-03-01", amazon: 4499, flipkart: 4799 },
    { date: "2025-04-01", amazon: 4299, flipkart: 4599 },
    { date: "2025-05-01", amazon: 3999, flipkart: 4299 },
  ],
  "fitbit-charge-5": [
    { date: "2025-01-01", amazon: 14999, flipkart: 14999 },
    { date: "2025-02-01", amazon: 13999, flipkart: 14499 },
    { date: "2025-03-01", amazon: 12999, flipkart: 13999 },
    { date: "2025-04-01", amazon: 11999, flipkart: 12999 },
    { date: "2025-05-01", amazon: 11499, flipkart: 12499 },
  ],
  "lg-gram-16": [
    { date: "2025-01-01", amazon: 119999, flipkart: 119999 },
    { date: "2025-02-01", amazon: 117999, flipkart: 118999 },
    { date: "2025-03-01", amazon: 114999, flipkart: 116999 },
    { date: "2025-04-01", amazon: 109999, flipkart: 112999 },
    { date: "2025-05-01", amazon: 104999, flipkart: 109999 },
  ],
  "sony-a7-iv": [
    { date: "2025-01-01", amazon: 239999, flipkart: 239999 },
    { date: "2025-02-01", amazon: 234999, flipkart: 236999 },
    { date: "2025-03-01", amazon: 229999, flipkart: 232999 },
    { date: "2025-04-01", amazon: 219999, flipkart: 224999 },
    { date: "2025-05-01", amazon: 214999, flipkart: 219999 },
  ],
  "nespresso-vertuo-plus": [
    { date: "2025-01-01", amazon: 19999, flipkart: 19999 },
    { date: "2025-02-01", amazon: 18999, flipkart: 19499 },
    { date: "2025-03-01", amazon: 17999, flipkart: 18999 },
    { date: "2025-04-01", amazon: 16999, flipkart: 17999 },
    { date: "2025-05-01", amazon: 15999, flipkart: 16999 },
  ],
  "samsung-galaxy-tab-s8": [
    { date: "2025-01-01", amazon: 66999, flipkart: 66999 },
    { date: "2025-02-01", amazon: 65999, flipkart: 66499 },
    { date: "2025-03-01", amazon: 64999, flipkart: 65499 },
    { date: "2025-04-01", amazon: 61999, flipkart: 62999 },
    { date: "2025-05-01", amazon: 58999, flipkart: 60999 },
  ],
  "dji-mini-3-pro": [
    { date: "2025-01-01", amazon: 94999, flipkart: 94999 },
    { date: "2025-02-01", amazon: 92999, flipkart: 93999 },
    { date: "2025-03-01", amazon: 89999, flipkart: 91999 },
    { date: "2025-04-01", amazon: 87999, flipkart: 89999 },
    { date: "2025-05-01", amazon: 84999, flipkart: 87999 },
  ],
  "weber-spirit-ii-e-310": [
    { date: "2025-01-01", amazon: 54999, flipkart: 54999 },
    { date: "2025-02-01", amazon: 52999, flipkart: 53999 },
    { date: "2025-03-01", amazon: 50999, flipkart: 52999 },
    { date: "2025-04-01", amazon: 48999, flipkart: 50999 },
    { date: "2025-05-01", amazon: 47999, flipkart: 49999 },
  ],
  "roomba-j7-plus": [
    { date: "2025-01-01", amazon: 74999, flipkart: 74999 },
    { date: "2025-02-01", amazon: 72999, flipkart: 73999 },
    { date: "2025-03-01", amazon: 69999, flipkart: 71999 },
    { date: "2025-04-01", amazon: 64999, flipkart: 67999 },
    { date: "2025-05-01", amazon: 59999, flipkart: 64999 },
  ],
  "keychron-k8-pro": [
    { date: "2025-01-01", amazon: 10999, flipkart: 10999 },
    { date: "2025-02-01", amazon: 10499, flipkart: 10799 },
    { date: "2025-03-01", amazon: 9999, flipkart: 10499 },
    { date: "2025-04-01", amazon: 9499, flipkart: 9999 },
    { date: "2025-05-01", amazon: 8999, flipkart: 9499 },
  ],
  "garmin-fenix-7": [
    { date: "2025-01-01", amazon: 84990, flipkart: 84990 },
    { date: "2025-02-01", amazon: 82990, flipkart: 83990 },
    { date: "2025-03-01", amazon: 79990, flipkart: 81990 },
    { date: "2025-04-01", amazon: 76990, flipkart: 79990 },
    { date: "2025-05-01", amazon: 74990, flipkart: 77990 },
  ],
  "samsung-odyssey-g7": [
    { date: "2025-01-01", amazon: 64999, flipkart: 64999 },
    { date: "2025-02-01", amazon: 62999, flipkart: 63999 },
    { date: "2025-03-01", amazon: 59999, flipkart: 61999 },
    { date: "2025-04-01", amazon: 56999, flipkart: 59999 },
    { date: "2025-05-01", amazon: 54999, flipkart: 57999 },
  ],
  "lenovo-legion-5-pro": [
    { date: "2025-01-01", amazon: 169999, flipkart: 169999 },
    { date: "2025-02-01", amazon: 164999, flipkart: 166999 },
    { date: "2025-03-01", amazon: 159999, flipkart: 161999 },
    { date: "2025-04-01", amazon: 154999, flipkart: 154999 },
    { date: "2025-05-01", amazon: 149999, flipkart: 147999 },
  ],
  "steelseries-arctis-pro": [
    { date: "2025-01-01", amazon: 29999, flipkart: 29999 },
    { date: "2025-02-01", amazon: 28999, flipkart: 29499 },
    { date: "2025-03-01", amazon: 27499, flipkart: 28499 },
    { date: "2025-04-01", amazon: 25999, flipkart: 26999 },
    { date: "2025-05-01", amazon: 24999, flipkart: 25999 },
  ],
  "sonos-arc": [
    { date: "2025-01-01", amazon: 94999, flipkart: 94999 },
    { date: "2025-02-01", amazon: 92999, flipkart: 93999 },
    { date: "2025-03-01", amazon: 89999, flipkart: 91999 },
    { date: "2025-04-01", amazon: 87999, flipkart: 89999 },
    { date: "2025-05-01", amazon: 84999, flipkart: 87999 },
  ],
  "roborock-s7-maxv-ultra": [
    { date: "2025-01-01", amazon: 99999, flipkart: 99999 },
    { date: "2025-02-01", amazon: 97999, flipkart: 98999 },
    { date: "2025-03-01", amazon: 94999, flipkart: 96999 },
    { date: "2025-04-01", amazon: 89999, flipkart: 92999 },
    { date: "2025-05-01", amazon: 85999, flipkart: 89999 },
  ],
  "wacom-cintiq-pro-16": [
    { date: "2025-01-01", amazon: 179999, flipkart: 179999 },
    { date: "2025-02-01", amazon: 174999, flipkart: 176999 },
    { date: "2025-03-01", amazon: 169999, flipkart: 172999 },
    { date: "2025-04-01", amazon: 164999, flipkart: 167999 },
    { date: "2025-05-01", amazon: 159999, flipkart: 164999 },
  ],
  "breville-barista-express": [
    { date: "2025-01-01", amazon: 64999, flipkart: 64999 },
    { date: "2025-02-01", amazon: 62999, flipkart: 63999 },
    { date: "2025-03-01", amazon: 59999, flipkart: 61999 },
    { date: "2025-04-01", amazon: 56999, flipkart: 59999 },
    { date: "2025-05-01", amazon: 54999, flipkart: 57999 },
  ],
  "canon-eos-r6": [
    { date: "2025-01-01", amazon: 229999, flipkart: 229999 },
    { date: "2025-02-01", amazon: 224999, flipkart: 226999 },
    { date: "2025-03-01", amazon: 214999, flipkart: 219999 },
    { date: "2025-04-01", amazon: 204999, flipkart: 209999 },
    { date: "2025-05-01", amazon: 199999, flipkart: 205999 },
  ],
  "theragun-pro": [
    { date: "2025-01-01", amazon: 42999, flipkart: 42999 },
    { date: "2025-02-01", amazon: 41999, flipkart: 42499 },
    { date: "2025-03-01", amazon: 39999, flipkart: 40999 },
    { date: "2025-04-01", amazon: 37990, flipkart: 38990 },
    { date: "2025-05-01", amazon: 35990, flipkart: 37990 },
  ],
  "samsung-990-pro-ssd-2tb": [
    { date: "2025-01-01", amazon: 24999, flipkart: 24999 },
    { date: "2025-02-01", amazon: 23999, flipkart: 24499 },
    { date: "2025-03-01", amazon: 22499, flipkart: 23499 },
    { date: "2025-04-01", amazon: 20999, flipkart: 21999 },
    { date: "2025-05-01", amazon: 19999, flipkart: 21499 },
  ],
  "oculus-quest-2": [
    { date: "2025-01-01", amazon: 34999, flipkart: 34999 },
    { date: "2025-02-01", amazon: 33999, flipkart: 34499 },
    { date: "2025-03-01", amazon: 32499, flipkart: 33499 },
    { date: "2025-04-01", amazon: 30999, flipkart: 31999 },
    { date: "2025-05-01", amazon: 29999, flipkart: 31499 },
  ],
  "ninja-foodi-air-fryer": [
    { date: "2025-01-01", amazon: 16999, flipkart: 16999 },
    { date: "2025-02-01", amazon: 15999, flipkart: 16499 },
    { date: "2025-03-01", amazon: 14999, flipkart: 15499 },
    { date: "2025-04-01", amazon: 13999, flipkart: 14499 },
    { date: "2025-05-01", amazon: 12999, flipkart: 13999 },
  ],
  "lg-gram-17": [
    { date: "2025-01-01", amazon: 144999, flipkart: 144999 },
    { date: "2025-02-01", amazon: 139999, flipkart: 141999 },
    { date: "2025-03-01", amazon: 134999, flipkart: 137999 },
    { date: "2025-04-01", amazon: 129999, flipkart: 134999 },
    { date: "2025-05-01", amazon: 124999, flipkart: 129999 },
  ],
  "bose-soundbar-700": [
    { date: "2025-01-01", amazon: 79990, flipkart: 79990 },
    { date: "2025-02-01", amazon: 77990, flipkart: 78990 },
    { date: "2025-03-01", amazon: 74990, flipkart: 76990 },
    { date: "2025-04-01", amazon: 72990, flipkart: 74990 },
    { date: "2025-05-01", amazon: 69990, flipkart: 72990 },
  ],
  "fujifilm-x-t4": [
    { date: "2025-01-01", amazon: 169990, flipkart: 169990 },
    { date: "2025-02-01", amazon: 164990, flipkart: 166990 },
    { date: "2025-03-01", amazon: 159990, flipkart: 161990 },
    { date: "2025-04-01", amazon: 154990, flipkart: 156990 },
    { date: "2025-05-01", amazon: 149990, flipkart: 153990 },
  ],
  "dyson-air-purifier-hot-cool": [
    { date: "2025-01-01", amazon: 54990, flipkart: 54990 },
    { date: "2025-02-01", amazon: 52990, flipkart: 53990 },
    { date: "2025-03-01", amazon: 50990, flipkart: 51990 },
    { date: "2025-04-01", amazon: 48990, flipkart: 50990 },
    { date: "2025-05-01", amazon: 47990, flipkart: 49990 },
  ],
  "peloton-bike-plus": [
    { date: "2025-01-01", amazon: 229990, flipkart: 229990 },
    { date: "2025-02-01", amazon: 224990, flipkart: 226990 },
    { date: "2025-03-01", amazon: 219990, flipkart: 221990 },
    { date: "2025-04-01", amazon: 209990, flipkart: 214990 },
    { date: "2025-05-01", amazon: 199990, flipkart: 209990 },
  ],
  "pilot-precise-v7-pens": [
    { date: "2025-01-01", amazon: 999, flipkart: 999 },
    { date: "2025-02-01", amazon: 949, flipkart: 979 },
    { date: "2025-03-01", amazon: 899, flipkart: 929 },
    { date: "2025-04-01", amazon: 849, flipkart: 879 },
    { date: "2025-05-01", amazon: 799, flipkart: 849 },
  ],
  "north-face-borealis-backpack": [
    { date: "2025-01-01", amazon: 6999, flipkart: 6999 },
    { date: "2025-02-01", amazon: 6799, flipkart: 6899 },
    { date: "2025-03-01", amazon: 6499, flipkart: 6599 },
    { date: "2025-04-01", amazon: 5999, flipkart: 6299 },
    { date: "2025-05-01", amazon: 5499, flipkart: 5999 },
  ],
  "xbox-series-x": [
    { date: "2025-01-01", amazon: 54990, flipkart: 54990 },
    { date: "2025-02-01", amazon: 53990, flipkart: 54490 },
    { date: "2025-03-01", amazon: 52990, flipkart: 53490 },
    { date: "2025-04-01", amazon: 50990, flipkart: 51990 },
    { date: "2025-05-01", amazon: 49990, flipkart: 50990 },
  ],
  "playstation-5": [
    { date: "2025-01-01", amazon: 54990, flipkart: 54990 },
    { date: "2025-02-01", amazon: 53990, flipkart: 54490 },
    { date: "2025-03-01", amazon: 52990, flipkart: 53490 },
    { date: "2025-04-01", amazon: 50990, flipkart: 51990 },
    { date: "2025-05-01", amazon: 49990, flipkart: 50990 },
  ],
  "aesop-resurrection-hand-wash": [
    { date: "2025-01-01", amazon: 2999, flipkart: 2999 },
    { date: "2025-02-01", amazon: 2899, flipkart: 2949 },
    { date: "2025-03-01", amazon: 2799, flipkart: 2899 },
    { date: "2025-04-01", amazon: 2599, flipkart: 2699 },
    { date: "2025-05-01", amazon: 2499, flipkart: 2599 },
  ],
  "ember-temperature-control-mug": [
    { date: "2025-01-01", amazon: 12999, flipkart: 12999 },
    { date: "2025-02-01", amazon: 12499, flipkart: 12799 },
    { date: "2025-03-01", amazon: 11999, flipkart: 12499 },
    { date: "2025-04-01", amazon: 10999, flipkart: 11499 },
    { date: "2025-05-01", amazon: 9999, flipkart: 10999 },
  ],
  "philips-sonicare-9900": [
    { date: "2025-01-01", amazon: 27999, flipkart: 27999 },
    { date: "2025-02-01", amazon: 26999, flipkart: 27499 },
    { date: "2025-03-01", amazon: 24999, flipkart: 25999 },
    { date: "2025-04-01", amazon: 22999, flipkart: 24499 },
    { date: "2025-05-01", amazon: 21999, flipkart: 23499 },
  ],
  "lego-star-wars-millennium-falcon": [
    { date: "2025-01-01", amazon: 84999, flipkart: 84999 },
    { date: "2025-02-01", amazon: 82999, flipkart: 83999 },
    { date: "2025-03-01", amazon: 79999, flipkart: 81999 },
    { date: "2025-04-01", amazon: 76999, flipkart: 79999 },
    { date: "2025-05-01", amazon: 74999, flipkart: 77999 },
  ],
  "le-creuset-round-dutch-oven": [
    { date: "2025-01-01", amazon: 36999, flipkart: 36999 },
    { date: "2025-02-01", amazon: 35999, flipkart: 36499 },
    { date: "2025-03-01", amazon: 33999, flipkart: 34999 },
    { date: "2025-04-01", amazon: 31999, flipkart: 32999 },
    { date: "2025-05-01", amazon: 29999, flipkart: 31999 },
  ],
  "stagg-ekg-electric-kettle": [
    { date: "2025-01-01", amazon: 15999, flipkart: 15999 },
    { date: "2025-02-01", amazon: 15499, flipkart: 15799 },
    { date: "2025-03-01", amazon: 14999, flipkart: 15499 },
    { date: "2025-04-01", amazon: 13999, flipkart: 14999 },
    { date: "2025-05-01", amazon: 12999, flipkart: 13999 },
  ],
  "ooni-koda-gas-pizza-oven": [
    { date: "2025-01-01", amazon: 36999, flipkart: 36999 },
    { date: "2025-02-01", amazon: 35999, flipkart: 36499 },
    { date: "2025-03-01", amazon: 33999, flipkart: 34999 },
    { date: "2025-04-01", amazon: 31999, flipkart: 32999 },
    { date: "2025-05-01", amazon: 29999, flipkart: 31999 },
  ],
  "vitamix-a3500": [
    { date: "2025-01-01", amazon: 69999, flipkart: 69999 },
    { date: "2025-02-01", amazon: 67999, flipkart: 68999 },
    { date: "2025-03-01", amazon: 64999, flipkart: 66999 },
    { date: "2025-04-01", amazon: 62999, flipkart: 64999 },
    { date: "2025-05-01", amazon: 59999, flipkart: 62999 },
  ],
  "nest-learning-thermostat": [
    { date: "2025-01-01", amazon: 23999, flipkart: 23999 },
    { date: "2025-02-01", amazon: 22999, flipkart: 23499 },
    { date: "2025-03-01", amazon: 21999, flipkart: 22499 },
    { date: "2025-04-01", amazon: 19999, flipkart: 21499 },
    { date: "2025-05-01", amazon: 18999, flipkart: 20499 },
  ],
  "jabra-elite-7-pro": [
    { date: "2025-01-01", amazon: 21999, flipkart: 21999 },
    { date: "2025-02-01", amazon: 20999, flipkart: 21499 },
    { date: "2025-03-01", amazon: 19999, flipkart: 20499 },
    { date: "2025-04-01", amazon: 17999, flipkart: 18999 },
    { date: "2025-05-01", amazon: 16999, flipkart: 17999 },
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
