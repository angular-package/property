import { is, ResultCallback, Func } from '@angular-package/type';
export class Objects<Obj> {

  #object: any;

  get get(): any {
    return this.#object;
  }

  public set<O extends Obj>(object: O): this  {
    this.#object = this.detect(object);
    return this;
  }

  public detect = <O extends Obj>(object: O, callback?: ResultCallback): O => {
    return is.class<Func>(object, callback) ? Object.getPrototypeOf(object) : is.object<O>(object, callback) ? object : object;
  }

  public hasOwnProperty<O extends Obj, K extends keyof O>(object: O, key: K): boolean {
    return ({}).hasOwnProperty.call(object, key);
  }
}
