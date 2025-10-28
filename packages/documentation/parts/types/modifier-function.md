::: details Type definition

```ts
// One or more modifier presets and/or custom functions
modifiers?: Modifiers | Modifiers[];

// Combination of presets and/or functions
type Modifiers = ModifierPreset | TransformFunction;

// Available modifiers presets
type ModifierPreset = 'uppercase' | 'lowercase';

// Modifier function. Needs to return a string.
type TransformFunction = (value: string) => string;
```

:::
