## Description

## TL;DR

- Use `lodash.isEqual` for any object types.
- `shallow-equal` is up to 50% faster than `lodash.isEqual`... But it's just 0.01 ms (at worst).
- Don't use `shallowEqual` from 'react-redux' for arrays.

## HYPOTHESIS

Since deep equal check could be more expensive, would shallow equal check be faster? Testing on flat arrays of primitive values (e.g.: `[1, 2, 3]`).

## FINDINGS

`lodash.isEqual` applies specialized methods for different object types, which seem to be well optimized.
Link https://github.com/lodash/lodash/blob/4.17.15/lodash.js#L3314

`shallow-equal` library is somewhat faster than `lodash.isEqual`, but it's 0.01 ms (at worst) on average for arrays with 10k elements. That difference is likely there because `lodash` needs to do a few checks before defining object type and picking the right method.

`shallowEqual` from 'react-redux' seems to be designed for objects, and is very slow on arrays.
Link https://github.com/reduxjs/react-redux/blob/master/src/utils/shallowEqual.ts#L21
