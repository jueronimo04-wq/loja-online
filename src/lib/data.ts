import { Product, Category, Review } from './types';

export const categories: Category[] = [
  { id: 'all', name: 'All Products', count: 12 },
  { id: 'electronics', name: 'Electronics', count: 4 },
  { id: 'home', name: 'Home & Garden', count: 3 },
  { id: 'fashion', name: 'Fashion', count: 3 },
  { id: 'books', name: 'Books', count: 2 },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'electronics',
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    features: ['Noise Cancelling', '30h Battery', 'Wireless', 'Premium Sound']
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'electronics',
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    features: ['Heart Rate Monitor', 'GPS Tracking', '7-day Battery', 'Water Resistant']
  },
  {
    id: '3',
    name: 'Organic Cotton Bed Sheets',
    description: 'Luxurious 100% organic cotton bed sheets, hypoallergenic and breathable for perfect sleep.',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop',
    category: 'home',
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    features: ['100% Organic Cotton', 'Hypoallergenic', 'Breathable', 'Machine Washable']
  },
  {
    id: '4',
    name: 'Professional Coffee Maker',
    description: 'Barista-quality coffee maker with programmable settings and thermal carafe.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
    category: 'home',
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    features: ['Programmable', 'Thermal Carafe', 'Auto Shut-off', '12-cup Capacity']
  },
  {
    id: '5',
    name: 'Designer Leather Handbag',
    description: 'Elegant genuine leather handbag with multiple compartments and adjustable strap.',
    price: 129.99,
    originalPrice: 179.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    category: 'fashion',
    rating: 4.5,
    reviewCount: 67,
    inStock: true,
    features: ['Genuine Leather', 'Multiple Compartments', 'Adjustable Strap', 'Designer Quality']
  },
  {
    id: '6',
    name: 'Wireless Phone Charger',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1609592806596-4d8b5b1d7e7e?w=400&h=400&fit=crop',
    category: 'electronics',
    rating: 4.4,
    reviewCount: 91,
    inStock: true,
    features: ['Fast Charging', 'Qi Compatible', 'LED Indicator', 'Non-slip Base']
  },
  {
    id: '7',
    name: 'Indoor Plant Collection',
    description: 'Set of 3 low-maintenance indoor plants perfect for home or office decoration.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
    category: 'home',
    rating: 4.8,
    reviewCount: 134,
    inStock: true,
    features: ['Low Maintenance', 'Air Purifying', 'Decorative Pots', 'Care Instructions']
  },
  {
    id: '8',
    name: 'Premium Wool Scarf',
    description: 'Soft merino wool scarf in classic design, perfect for any season.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop',
    category: 'fashion',
    rating: 4.6,
    reviewCount: 45,
    inStock: true,
    features: ['Merino Wool', 'Classic Design', 'Soft Texture', 'Versatile Style']
  },
  {
    id: '9',
    name: 'Bluetooth Speaker',
    description: 'Portable waterproof Bluetooth speaker with 360-degree sound and 12-hour battery.',
    price: 69.99,
    originalPrice: 89.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    category: 'electronics',
    rating: 4.7,
    reviewCount: 178,
    inStock: true,
    features: ['Waterproof', '360° Sound', '12h Battery', 'Portable Design']
  },
  {
    id: '10',
    name: 'Classic Denim Jacket',
    description: 'Timeless denim jacket made from premium cotton denim with vintage wash.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    category: 'fashion',
    rating: 4.5,
    reviewCount: 82,
    inStock: true,
    features: ['Premium Cotton', 'Vintage Wash', 'Classic Fit', 'Durable Construction']
  },
  {
    id: '11',
    name: 'Productivity Planner',
    description: 'Daily planner designed to boost productivity with goal tracking and time management.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    category: 'books',
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    features: ['Goal Tracking', 'Time Management', 'Daily Planning', 'Premium Paper']
  },
  {
    id: '12',
    name: 'Mindfulness Journal',
    description: 'Guided journal for mindfulness practice with daily prompts and reflection exercises.',
    price: 19.99,
    originalPrice: 29.99,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
    category: 'books',
    rating: 4.9,
    reviewCount: 234,
    inStock: true,
    features: ['Daily Prompts', 'Reflection Exercises', 'Mindfulness Guide', 'Quality Binding']
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userName: 'Sarah M.',
    rating: 5,
    comment: 'Absolutely love these headphones! The sound quality is incredible and they\'re so comfortable.',
    date: '2024-01-15',
    verified: true
  },
  {
    id: '2',
    productId: '1',
    userName: 'James R.',
    rating: 4,
    comment: 'Great value for money. Battery life is as advertised and noise cancelling works well.',
    date: '2024-01-10',
    verified: true
  },
  {
    id: '3',
    productId: '3',
    userName: 'Emma L.',
    rating: 5,
    comment: 'These sheets are amazing! So soft and breathable. Best purchase I\'ve made this year.',
    date: '2024-01-12',
    verified: true
  }
];

// Utility functions for localStorage
export const getCartFromStorage = () => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('directone-cart');
  return cart ? JSON.parse(cart) : [];
};

export const saveCartToStorage = (cart: any[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('directone-cart', JSON.stringify(cart));
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(price);
};

export const calculateDiscount = (originalPrice: number, currentPrice: number) => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};