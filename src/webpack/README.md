# Webpack

Demo shows:
1. webpack2 bundling
2. es6
3. style injection
4. webpack-dev-server with hot module reloading
5. use .tag.html

## Style injection

riot automatically prepends tagname to prevent global styles from being affected

src/webpack/random.tag
```html
<style>
  h1 {
    color: red;
  }
</style>
```

src/webpack/index.html
```html
<body>
  <!-- h1 is not impacted by random.tag <style> -->
  <h1>Not red title (outside random tag)</h1>
  <random></random>
</body>
```

dist/webpack/bundle.js
```javascript
riot.tag2('random',
  ...html',
  'random h1,[data-is="random"] h1{ color: red; }', // NOTE: tag name = random prepended
  ...)
```

## webpack-dev-server with hot module reloading
* npm run start-webpack
* open http://localhost:3001/webpack-dev-server/
* make change - e.g. src/webpack/random.tag - change `color` to `blue`

## use .tag.html
* So that `> Format document` and intellisense works in VS Code.
* From https://github.com/voorhoede/riotjs-style-guide#use-taghtml-extension
