import { NUMBER } from './number.const';
import { STRING } from './string.const';
import { SYMBOL_NUMBER, SYMBOL_STRING } from './symbol.const';

export interface ObjectOne {
  test: string;
  'key as string'?: boolean;
  1030405027: string;
  5?: string;
  [NUMBER]: string;
  [STRING]: string;
  [SYMBOL_NUMBER]: string;
  [SYMBOL_STRING]: number;
  x: number;
}
export interface ObjectTwo { x: string; y: number; }
/**
 * @example https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
 */
/**
 * typeof === 'object'
 * instanceof Boolean === false
 * instanceof Function === false
 * instanceof Number === false
 * instanceof Object === true
 * instanceof String === false
 * instanceof Symbol === false
 */
export const OBJECT_ONE: ObjectOne = {
  test: 'string',
  'key as string': true,
  1030405027: 'key is number',
  5: 'key is also number',
  [NUMBER]: 'key is number',
  [STRING]: 'key is string',
  [SYMBOL_NUMBER]: 'key is symbol number',
  [SYMBOL_STRING]: 6,
  x: 3000
};

/**
 * typeof === 'object'
 * instanceof Boolean === false
 * instanceof Function === false
 * instanceof Number === false
 * instanceof Object === true
 * instanceof String === false
 * instanceof Symbol === false
 */
export const OBJECT_TWO: ObjectTwo = { x: 'One Two Three', y: 10000  };

/**
 * typeof === 'object'
 * instanceof Boolean === false
 * instanceof Function === false
 * instanceof Number === false
 * instanceof Object === true
 * instanceof String === false
 * instanceof Symbol === false
 */
export const OBJECT_ONE_NEW = new Object(OBJECT_ONE);

/**
 * typeof === 'object'
 * instanceof Boolean === false
 * instanceof Function === false
 * instanceof Number === false
 * instanceof Object === true
 * instanceof String === false
 * instanceof Symbol === false
 */
export const OBJECT_TWO_NEW = new Object(OBJECT_TWO);
