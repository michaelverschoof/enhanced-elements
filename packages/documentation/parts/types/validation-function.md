::: details Type definition

```ts
// One or more validation presets and/or custom functions
validators?: Validation | Validation[];

// Combination of presets and/or functions
type Validation = ValidationPreset | ValidationFunction;

// Available validation presets
type ValidationPreset = 'required';

// Validation function. Needs to return false or a string if validation fails,
// true otherwise
export type ValidationFunction<ModelValue = string> =
    (modelValue: ModelValue, ...args: unknown[]) => boolean | string;

```

:::
