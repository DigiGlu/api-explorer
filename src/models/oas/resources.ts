import {Spec} from "swagger-schema-official";
import {IResource} from "./IResource";
import {IMap} from "./IMap";

export function resources(spec: Spec, map: IMap): IResource[] {
  const resources: IResource[] = []

  if (!spec.tags || (spec.tags.length === 0)) {
    resources.push({
      name: 'default',
      _opened: true,
      _display: true
    })
    map['default'] = 0;
  } else {
    for (let i = 0, l = spec.tags.length; i < l; i++) {
      let tag = spec.tags[i];
      (tag as IResource)._opened = true;
      (tag as IResource)._display = true;
      resources.push(tag)
      map[tag.name] = i
    }
  }

  return resources
}
