// แก้ไขในไฟล์ src/interface.ts

export interface VenueItem {
  _id: string;
  // ...
}

export interface VenueJson {
  // ...
  data: VenueItem[];
}

export interface User {
  _id: string;
  name: string;
}

export interface CoworkingSpace {
  _id: string;
  name: string;
  address: string;
  telephoneNumber: string;
  openTime: string;
  closeTime: string;
}

export interface BookingItem {
  _id: string;
  reservationDate: string;
  user: User;
  coworkingSpace: CoworkingSpace;
  status: string;
  createdAt: string;
}