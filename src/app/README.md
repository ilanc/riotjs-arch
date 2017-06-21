# Webpack

Demo shows:
1. App dir layout (and referencing shared tags = `../tick-cross-toggle`)
2. Static html
3. Assets - e.g. imgs
4. Check for outdated packages = `npm outdated`

## App dir layout

```
node_modules/
package.json
.babelrc                    %%
src/
└── all/                    &&
├── app1/
|   ├── index.html          $$
|   ├── app.js
|   ├── app.tag.html
|   ├── webpack.config.js   **, %%
|   ├── ...
|   └── README.md
└── app2/
└── shell/                  ++
dist/
├── app1/
|   ├── index.html
|   └── app.min.js
└── app2/
```

%%
* set compiler options in .babelrc, not in webpack.config.js : riot-tag-loader : options.type = es6
* = `<style>` not being injected into head problem

&&
* see `Static html`
* and `Assets - e.g. imgs`

$$
* contains no html
* skeleton from app.tag.html, and sub-components from module *.tag.htmls
* use html-webpack-plugin in order to inject app.min.js?[hash]

**
* can split into 2 webpack dlls:
    * webpack.vendor.config.js = 3rd party code (riotjs, ...)
    * webpack.app.config.js = module code

++
* shell = for admin dashboards i.e site.css and shell deps (e.g. pace, minimaliza, ...) 

### font-awesome
src/tick-cross-toggle/tick-cross-toggle.tag.html
```
import '../../node_modules/font-awesome/css/font-awesome.css'
```
includes .eot/.svg/.ttf fonts which are built to `dist/app/font`
```
{
 test: /\.(eot|svg|ttf|woff|woff2)/,
 loader: 'file-loader',
 options: { name: 'fonts/[name].[ext]' }
},
{
 test: /\.(png|jpg|jpeg|gif|svg)$/,
 exclude: /fontawesome-webfont/, // fontawesome-webfont.svg
 loader: 'file-loader',
 options: { name: 'img/[name].[ext]' }
}
```
NOTE: `exclude: /fontawesome-webfont/` prevent duplicates:
* dist/app/font/fontawesome-webfont.svg
* dist/app/img/fontawesome-webfont.svg

## Static html

* Use ../all/site.css & assets
* See `package.json`
```
"scripts": {
  "build-static": "cp src/favicon.ico dist/ && cp -R src/all dist/ && cp -R src/static-html dist/"
}
```

## Assets e.g. imgs

Hierarchy issues:
* .css `url(..)` are relative to .css file location
    * NB if .css is served, not if baked into app.min.js
* .html `<img src="a/b.png">` = relative to current url
    * e.g. /app/index.html =? /app/a/b.png

Build processes:
* .tag / .html `<img src>` = not copied to `dist/`
* .css = are copied to `dist/`
    * .css is baked into app.min.js
    * path hierarchy is flattened by `webpack file-loader options` (e.g. dist/app/img/camera.png)
    * `url(*.png)` refs are changed to `url(img/*.png)` in app.min.js

***Use ../all/appname/x.png for .html `<img src>`***

Makes it easier to build app imgs to `dist/`

***Prevent font .svg file-loader from duplicating app imgs***

solution = restrict font file-loader to font-awesome using `include`

src/app/webpack.config.js
```javascript
{
 test: /\.(eot|svg|ttf|woff|woff2)/,
 include: /fontawesome-webfont/, // exclude app svgs (e.g. ../all/app/icon-camera.svg from ./app.css)
 loader: 'file-loader',
 options: { name: 'fonts/[name].[ext]' }
}
```

***Minor problem: duplicate img's possible if .css and img src references same file***

src/app/app.tag.html
```
<img src="../all/app/icon-camera.svg" height="30" class="tr-logo" />
<div class="dup-camera-test"></div>
```

src/app/app.css
```
.dup-camera-test {
  background-image: url(../all/app/icon-camera.svg);
  height: 30px;
  background-repeat: no-repeat;
}
```

duplicates:
* `dist/all/app/icon-camera.svg`
    * ref in .tag.html <img src>
    * manually copied
        * see `Static html`
* dist/app/img/icon-camera.svg
    * ref in .css
    * copied by webpack build see `src/app/webpack.config.js`:
        * `/\.css$/` = css-loader -> style-loader
        * `/\.(png|jpg|jpeg|gif|svg)$/` = file-loader

