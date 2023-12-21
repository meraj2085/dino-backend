import mongoose, { Schema, model } from 'mongoose';
import { IOrganization, OrganizationModel } from './organization.interface';

const OrganizationSchema = new Schema<IOrganization, OrganizationModel>(
  {
    gst_number: String,
    pan_number: String,
    tan_number: String,
    email: String,
    street: String,
    city: String,
    landmark: String,
    country: String,
    state: String,
    postal_code: Number,
    billing_street: String,
    billing_city: String,
    billing_landmark: String,
    billing_country: String,
    billing_state: String,
    billing_postal_code: Number,
    registered_street: String,
    registered_city: String,
    registered_landmark: String,
    registered_country: String,
    registered_state: String,
    registered_postal_code: Number,
    contact_person_first_name: String,
    contact_person_last_name: String,
    contact_person_middle_name: String,
    contact_person_email: String,
    contact_person_phone_number: String,
    account_manager_first_name: String,
    account_manager_last_name: String,
    account_manager_middle_name: String,
    account_manager_designation: String,
    account_manager_email: String,
    account_manager_phone_number: String,
    billing_contact_person_first_name: String,
    billing_contact_person_last_name: String,
    billing_contact_person_middle_name: String,
    billing_contact_person_email: String,
    billing_contact_person_phone_number: String,
    bank_name: String,
    account_number: Number,
    ifsc_code: String,
    plan_validity: String,
    number_of_users: String,
    profile_picture: String,
    coordinates: mongoose.Schema.Types.Mixed,
    company_name: {
      type: String,
      unique: true,
    },
    company_code: {
      type: String,
      unique: true,
    },
    is_profile_completed: {
      type: Boolean,
      default: false,
    },
    is_admin_user_created: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['Deleted', 'Disabled', 'Active'],
      default: 'Active',
    },
    enabled_apps: { type: Array, default: [] },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const User = model<IOrganization, OrganizationModel>(
  'Organization',
  OrganizationSchema
);
