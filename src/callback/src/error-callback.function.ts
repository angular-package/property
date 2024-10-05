// Type.
import { ErrorCallback } from '../type/error-callback.type';
import { ResultCallback } from '../../descriptor/type/result-callback.type';

/**
 * Wrapper for the `ResultCallback` type function to throw an `Error` with the specified message on the specified `false` or `true` state.
 * @param message The string type value for the `Error` instance.
 * @param on A `boolean` state on which an `Error` should be thrown.
 * @returns The return value is a `boolean` as the result of the check.
 */
export const errorCallback: ErrorCallback  = (
  message: string,
  on: boolean = false
): ResultCallback => {
  return (result: boolean, value: any): boolean => {
    if (result === on) {
      throw new Error(
        `${message}, got value ${
          typeof value === 'object' ? JSON.stringify(value) : value
        }`
      );
    }
    return result;
  };
};
