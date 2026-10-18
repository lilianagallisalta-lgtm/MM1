import {HkCalendarOptions} from '../models/hk-datepicker.models';

/**
 * Internal library helper that helps to check if value is empty
 * @param value
 */
export const isNil = (value: Date | HkCalendarOptions) => {
  return (typeof value === 'undefined') || (value === null);
};
