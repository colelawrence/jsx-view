# jsx-view

![JSX View look and feel image](./jsx-view.webp)

**Features**

- No DOM diffing and no "lifecycle loop". Only Observables which get subscribed to and [directly update the DOM elements](src/examples/observable-elements.spec.tsx).
- Minimal JSX wiring up with full type definitions for all common `HTMLElement` attributes.
- Any attribute accepts an Observable of its value, and this is type checked.
- An Observable of any [`JSX.Child`](src/lib/jsxSpec.ts) (`string`, `null`, `JSX.Element`, etc), can be used as a `JSX.Child`.
- Adds [special props](src/lib/declare/declare-special-props.ts): `is`, `$style`, `$class`, `ref`, and `tags`.
- exports declaration maps (go-to-def goes to TypeScript source code)

#### Setting up your `tsconfig.json` or `jsconfig.json`

```json
{
  "compilerOptions": {
    "lib": ["DOM"],
    "jsx": "react-jsxdev",
    "jsxImportSource": "jsx-view",
  }
}
```

#### Setting up with vite

```js
// vite.config.js or vite.config.ts
import * as path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  // ...

  esbuild: {
    jsx: "automatic",
    jsxImportSource: "jsx-view",
  },
});
```

### Contributing

Clone the repository with
```sh
git clone https://github.com/colelawrence/jsx-view.git
```

Open the repository in terminal, and install dependencies using [pnpm](https://pnpm.io/).
```sh
cd jsx-view
pnpm install
```

Now, you have this locally, you may try things out by opening the
dev server with
```sh
pnpm playground
```
