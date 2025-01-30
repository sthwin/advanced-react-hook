let nextId = 20230420;

const generateId = (text = `${nextId++}`) => {
  const m = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]; // 0 ~ 9
  let hash = "";

  for (let i = 0; i < text.length; i++) {
    if (i > text.length / 2) {
      hash += text[i];
    } else {
      hash += m[Number(text[i])];
    }
  }
  return hash.toUpperCase();
};

const generateDate = (date = new Date()) => {
  return date.toLocaleString();
};

export interface Order {
  id: string;
  orderDate: string;
  status: string;
  name: string;

  totalPrice: number;
  paymentMethod: string;
  productPrice: number;
  deliveryPrice: number;
  discountPrice: number;

  deliveryAddress: string;
  deliveryContact: string;
  messageToShop: string;
  messageToRider: string;
  position: number[];
}

export const defaultOrder: Order = {
  id: generateId(),
  orderDate: generateDate(),
  status: "배달을 완료했어요",
  name: "짜장면",

  totalPrice: 7000,
  paymentMethod: "마이페이",
  productPrice: 6000,
  deliveryPrice: 3000,
  discountPrice: 2000,

  deliveryAddress: "서울특별시 송파구 잠실동 1번지",
  deliveryContact: "010-1111-2222",
  messageToShop: "포크는 주지 마세요",
  messageToRider: "안전하게 오세요",
  position: [60, 60],
};

export interface Product {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
}

export const data = {
  products: [
    {
      id: '1',
      name: "해물 계란 라면",
      price: 6000,
      thumbnail: "/images/menu-해물계란라면.jpg",
    },
    {
      id: '2',
      name: "햄 야채 토스트",
      price: 8000,
      thumbnail: "/images/menu-햄야채토스트.jpg",
    },
    {
      id: '3',
      name: "프레시 케밥",
      price: 8000,
      thumbnail: "/images/menu-프레시케밥.jpg",
    },
    {
      id: '4',
      name: "부드러운 치즈 버거",
      price: 15000,
      thumbnail: "/images/menu-부드러운치즈버거.jpg",
    },
    {
      id: '5',
      name: "매운 푸팟퐁 커리",
      price: 20000,
      thumbnail: "/images/menu-매운푸팟퐁커리.jpg",
    },
  ],

  order: defaultOrder,
};

const findProducts = (id = "") => {
  if (id) {
    return data.products.find((product) => product.id === id);
  }
  return data.products;
};

export const createOrder = (order: Partial<Order>) => {
  data.order = {
    ...defaultOrder,
    id: generateId(),
    orderDate: generateDate(),
    ...order,
  };
  return data.order;
};

const findOrder = () => {
  return data.order;
};

export const database = {
  findProducts,

  findOrder,
  createOrder,
};
