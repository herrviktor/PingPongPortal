import { Schema, model, Types } from 'mongoose';

interface ITimeslot {
  time: string;
  isBooked: boolean;
  isBookedBy: Types.ObjectId | null;
}

const TimeslotSchema = new Schema<ITimeslot>({
  time: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
  isBookedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null }
}, { _id: false });

interface IAvailableDate {
  date: Date;
  timeslots: ITimeslot[];
}

const AvailableDateSchema = new Schema<IAvailableDate>({
  date: { type: Date, required: true },
  timeslots: { type: [TimeslotSchema], default: [] }
}, { _id: false });

interface IFacility {
  name: string;
  hourlyRate: number;
  availableDates: IAvailableDate[];
}

const FacilitySchema = new Schema<IFacility>({
  name: { type: String, required: true },
  hourlyRate: { type: Number, required: true },
  availableDates: { type: [AvailableDateSchema], default: [] }
});

const FacilityModel= model<IFacility>('Facility', FacilitySchema);

export default FacilityModel;