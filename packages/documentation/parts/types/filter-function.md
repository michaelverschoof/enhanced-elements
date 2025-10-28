::: details Type definition

```ts
// One or more filter presets, regular expressions and/or custom functions
filters?: Filters | Filters[];

// Combination of presets and/or functions
type Filters = FilterPreset | RegExp | TransformFunction;

// Available filter presets
type FilterPreset = 'letters' | 'numbers';

// Filter function. Needs to return a string.
type TransformFunction = (value: string) => string;
```

:::
