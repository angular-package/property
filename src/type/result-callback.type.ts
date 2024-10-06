export type ResultCallback<Value = any, Payload = object> = (
  result: boolean,
  value: Value,
  payload?: Payload
) => boolean;
