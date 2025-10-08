import { Schema, model, Types } from 'mongoose';

interface Ibooking {
  date: Date;
  time: string;
  facility: Types.ObjectId;
}

const BookingSchema = new Schema<Ibooking>({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  facility: { type: Schema.Types.ObjectId, ref: 'Facility', required: true }
});

interface Iuser {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  bookings: Ibooking[];
}

const UserSchema = new Schema<Iuser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  bookings: { type: [BookingSchema], default: [] }
});

const UserModel = model<Iuser>('User', UserSchema);

export default UserModel;