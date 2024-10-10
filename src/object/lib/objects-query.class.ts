// Type.
import { Objects } from "./objects.class";

/**
 *
 */
export class ObjectsQuery<
  Objs extends object,
  Names extends keyof Objs
> extends Objects<Objs, Names> {
  /**
   * Creates an instance of `Objects`.
   * @param object 
   * @angularpackage
   */
  constructor(objects: Objs) {
    super(objects);
  }

  /**
   * 
   * @param param0 
   * @returns 
   * @angularpackage
   */
  public query<
    Name extends Names,
    Key extends keyof Objs[Name],
    ToName extends Names,
  >({}: Partial<{
    connect: {
      [N in Name]: {
        [K in Key]: Partial<{
          [TN in ToName]: keyof Objs[TN] | (keyof Objs[TN])[]
        }>
      }
    },

    // forEach.
    forEach: (name: Names, objects: Objs) => void,

    // Get.
    get: {
      [N in Name]: {
        [K in Key]: (value: Objs[N][K]) => void
      }
    },

    // Set.
    set: {
      [N in Name]: {
        [K in Key]: {
          value: Objs[N][K],
          callbackfn: (value: Objs[N][K]) => void
        }
      }
    },
  }>) {
    // forEach
    if (arguments[0].forEach) {
      (Object
        .entries(this.objects) as [Name, Objs[Names]][])
        .forEach(([name, obj]) => arguments[0].forEach(name, this.objects));
    }

    // Get.
    if (arguments[0].get) {
      (Object
        .entries(arguments[0].get) as [Name, {
          [K in Key]: (value: Objs[Name][K]) => void
        }][])
        .forEach(([name, keyCallbackFn]) => 
          (Object
            .entries(keyCallbackFn) as [Key, (value: Objs[Name][Key]) => void][])
            .forEach(([key, callbackfn]) => callbackfn(Objects.objects[name].get[key]))
        );
    }

    // Set.
    if (arguments[0].set) {
      (Object
        .entries(arguments[0].set) as [Name, {
          [K in Key]: Partial<{ value: Objs[Name][K], callbackfn: (value: Objs[Name][Key]) => void }>
        }][])
        .forEach(([name, keyToValue]) => 
          (Object
            .entries(keyToValue) as [Key, Partial< { value: Objs[Name][Key], callbackfn: (value: Objs[Name][Key]) => void }>][])
            .forEach(([key, set]) => (
              Object.assign(Objects.objects[name].get, {[key]: set.value}),
              set.callbackfn && set.value && set.callbackfn(set.value)
            ))
        )
    }

    // Connect.
    if (arguments[0].connect) {
      (Object
        .entries(arguments[0].connect) as [Name, {
          [K in Key]: Partial<{ [TN in ToName]: keyof Objs[TN] | (keyof Objs[TN])[] }>
        }][])
        .forEach(([name, keyTo]) => 
          (Object
            .entries(keyTo) as [Key, Partial<{ [TN in ToName]: keyof Objs[TN] | (keyof Objs[TN])[] }>][])
            .forEach(([key, to]) => {
              (Object
                .entries(to) as [ToName, keyof Objs[ToName] | (keyof Objs[ToName])[]][])
                .forEach(([toName, toKey]) => this.connect(name, key, [toName, toKey]));
            })
        );
    }
    return this;
  }
}
