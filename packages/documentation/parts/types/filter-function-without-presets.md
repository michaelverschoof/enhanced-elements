::: details Type definition

```ts
// One or more filter presets, regular expressions and/or custom functions
filters?: Filters | Filters[];

// Combination of presets and/or functions
type Filters = RegExp | TransformFunction;

// Filter function. Needs to return a string.
type TransformFunction = (value: string) => string;
```

:::
