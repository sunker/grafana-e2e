const semver = require('semver');
import { Selectors, E2ESelectors } from './types';

export const resolveSelectorVersion = <S extends Selectors>(
  selectors: E2ESelectors<S>,
  version: string
): E2ESelectors<S> => {
  const keys = Object.keys(selectors);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const value = selectors[key];

    if (
      typeof value === 'object' &&
      Object.keys(value).length > 0 &&
      !semver.valid(Object.keys(value)[0])
    ) {
      // @ts-ignore
      selectors[key] = resolveSelectorVersion(value, version);
    }

    if (
      typeof value === 'object' &&
      Object.keys(value).length > 0 &&
      semver.valid(Object.keys(value)[0])
    ) {
      // @ts-ignore
      const sorted = Object.keys(value).sort(semver.rcompare);
      let validVersion = sorted[0];
      for (let index = 0; index < sorted.length; index++) {
        const version = sorted[index];
        if (semver.satisfies(version, version)) {
          validVersion = version;
          break;
        }
      }
      // @ts-ignore
      selectors[key] = value[validVersion];
    } else {
      // @ts-ignore
      selectors[key] = value;
    }

    continue;
  }

  return selectors;
};
