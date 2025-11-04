import type {ReactNode} from 'react'

export interface IUser {
    _id?: string;
    username: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IAuthContext {
    user: IUser | null;
    login: (email: string, password: string) => Promise<void>;
    register: (formData: IUser) => Promise<void>;
    logout: () => void;
}

export interface IAuthProviderProps {
  children: ReactNode;
}

export interface ITimeslot {
  time: string;
  isBooked: boolean;
  isBookedBy: string | null;
}

export interface IAvailableDate {
  date: string;
  timeslots: ITimeslot[];
}

export interface IFacility {
  _id: string;
  name: string;
  hourlyRate: number;
  availableDate: IAvailableDate[];
}

interface IFacilityInfo {
  id: string;
  name: string;
  hourlyRate?: number;
}

export interface IBooking {
  _id: string;
  date: string;
  time: string;
  facility: IFacilityInfo;
}

export interface ISearchFacility {
  _id: string;
  name: string;
}

export interface IFormErrors {
  email?: string;
  password?: string;
  username?: string;
  general?: string;
}
