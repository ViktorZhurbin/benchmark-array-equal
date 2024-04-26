## Description

## TL;DR

- Use `lodash.isEqual` for any object types.
- `shallow-equal` is faster than `lodash.isEqual` only by a fraction of ms (with arrays of 1-100k items).
- Don't use `shallowEqual` from 'react-redux' for arrays.

## HYPOTHESIS

Since deep equal check could be more expensive, would shallow equal check be faster? Testing on flat arrays of primitive values (e.g.: [1, 2, 3]).

## FINDINGS

`lodash.isEqual` applies specialized methods for different object types, which seem to be well optimized.
Link https://github.com/lodash/lodash/blob/4.17.15/lodash.js#L3314

Specialized methods from "shallow-equal" library are somewhat faster than `lodash.isEqual`, but the difference in negligible: some 0.001 ms for arrays of 100k elements. That difference is likely there because `lodash` needs to do a few checks before defining object type and picking the right method.

`shallowEqual` from 'react-redux' seems to be designed for objects, and is pretty slow on arrays.
Link https://github.com/reduxjs/react-redux/blob/master/src/utils/shallowEqual.ts#L21
