// @angular-package/type
import { ResultCallback, is } from '@angular-package/type';
// Type.
import { ErrorCallback } from '../type/error-callback.type';
import { ErrorType } from '../../error/type/error-type.type';
/**
 * Wrapper for the `ResultCallback` type function to throw specified type of `Error` with the specified message
 * on the specified `false` or `true` state.
 * @param message The string type value, as a message for the `Error` instance.
 * @param type Type of error to throw - 'range, 'type', 'URI', by default it's just an `Error`.
 * @param on A `boolean` state on which an `Error` of the type specified in the provided `type` should be thrown.
 * @returns The return value is a `boolean` as the result of the check.
 */
export const errorCallback: ErrorCallback  = (
  message: string,
  type: ErrorType = '',
  on: boolean = false,
): ResultCallback => {
  // TODO: check `message`, `type`, `on`
  return (result: boolean, value: any): boolean => {
    message = `${message}, got value ${
      is.object(value) ? JSON.stringify(value) : value
    }`;
    if (result === on) {
      switch (type) {
        case 'range': throw new RangeError(message); break;
        case 'type': throw new TypeError(message); break;
        case 'URI': throw new URIError(message); break;
        default: throw new Error(message); break;
      }
    }
    return result;
  };
};
