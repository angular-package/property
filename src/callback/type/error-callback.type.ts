// External import: Type.
import { ResultCallback } from '@angular-package/type';
// Import: Type.
import { ErrorType } from './error-type.type';
// Export: Type.
export type ErrorCallback = (message: string, type?: ErrorType, on?: boolean) => ResultCallback;
