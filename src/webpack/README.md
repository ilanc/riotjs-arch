# Webpack

Demo shows:
1. webpack2 bundling
2. es6
3. style injection

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
