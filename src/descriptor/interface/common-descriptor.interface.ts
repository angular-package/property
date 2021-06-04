/**
 * Common keys `configurable` and `enumerable` of a `boolean` type for accessor and data descriptor,
 * picked from the default `PropertyDescriptor`.
 * "If a descriptor has neither of `value`, `writable`, `get` and `set` keys, it is treated as a data descriptor. "
 */
export type CommonDescriptor = Pick<PropertyDescriptor, 'configurable' | 'enumerable'>;
