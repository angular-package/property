import { Func } from '@angular-package/type';
/**
 * typeof === 'function'
 * instanceof Function === true
 * instanceof Object === true
 */
export const FUNCTION: Func = (x: number, y: string): any => x + y;
