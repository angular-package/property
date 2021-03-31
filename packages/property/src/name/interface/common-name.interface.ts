import { ConfigName } from './config-name.interface';
import { NamePrefix } from '../lib/name-prefix.class';
import { NameSuffix } from '../lib/name-suffix.class';

export interface CommonName {
  get: string;
  generate: string;
  config: (config?: ConfigName) => this;
  prefix: (value: string) => this;
  suffix: (value: string) => this;
}
