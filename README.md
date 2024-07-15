# React + TypeScript + Vite + Shadcn

#Library - React
#Language - TypeScript
#UI Library - Shadcn (I Prefered ShadCn Over Mui because it is more reliable with Tailwind and Its compenents Have modern Touch )
#Css Framework - TailwindCss
#Build Tool - Vite

## Getting Started
### `npm install`
### `npm run dev`

This Website is based on Ui of Telegram , It is complete responsive site, where both light mode and dark mode are available , 

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
