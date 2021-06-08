import { ResultCallback, is } from '@angular-package/type';
/**
 * 
 * @param message 
 * @param on 
 * @returns 
 */
export const callbackErrorMessage = (
  message: string,
  on: boolean = false
): ResultCallback => {
  return (result: boolean, value: any): boolean => {
    if (result === on) {
      throw new Error(
        `${message}, got value ${
          is.object(value) ? JSON.stringify(value) : value
        }`
      );
    }
    return result;
  };
};
