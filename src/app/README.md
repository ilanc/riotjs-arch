# Webpack

Demo shows:
1. App dir layout (and referencing shared tags = `../tick-cross-toggle`)
2. Static html

## App dir layout

```
node_modules/
package.json
.babelrc
src/
├── app1/
|   ├── index.html          $$
|   ├── app.js
|   ├── app.tag.html
|   ├── webpack.config.js   **
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

Use ../all/site.css & assets