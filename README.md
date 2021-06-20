# Website

A simple Eleventy Starter Kit, my base for all new 11ty projects.

## Softwares
1. Text Editor - [VSCode](https://code.visualstudio.com/download) Preferred
2. [Git Software](https://git-scm.com/downloads)
3. [Node JS](https://nodejs.org/en/download/) - Download latest LTS
4. [Yarn](https://yarnpkg.com/lang/en/docs/install/)

## Getting Started for Contribution
* Execute `git clone https://github.com/Anuvrat-NITSKM/website.git`
* Execute `cd website`
* Execute `yarn install`
* After that create a new branch `git checkout -b <your-branch-name>`
* Make changes to the files and execute `git add .`
* Execute `git commit -m "<brief-description-of-your-changes>"`
* Then at last execute `git push`
* Go to `https://github.com/Anuvrat-NITSKM/website/pulls` in your browser and click on `New Pull Request`
* And select `<your-branch-name>` and `main` branch and raise a pull request

Note: Whenever starting a new work always create a new branch from `main` branch
- Execute `git checkout main`
- Execute `git pull`
- Execute `git checkout -b <your-branch-name>`

## Documentations
* https://mozilla.github.io/nunjucks/
* https://www.11ty.dev/docs/
* https://getbootstrap.com/docs/5.0/getting-started/introduction/
* https://sass-lang.com/documentation


(HTML CSS JS) https://developer.mozilla.org/en-US/docs/Web/Reference

## Getting Started
To install the necessary packages, run this command in the root folder of the site:

```sh
yarn install
```

### Commands

* Run `yarn run dev` for a development server and live reloading
* Run `yarn run build` to generate a production build

## Features

* CSS Pipeline (Sass, CleanCSS)
* JS Bundling (Webpack)
* HTML Minification
* No external builds, everything runs through 11ty


## CSS

Styling works with Sass. The main index file is in `src/assets/styles/main.scss`. Import any SCSS code you want in there; it will be processed and optimized. The output is in `dist/assets/styles/main.css`
`styles` shortcode can also be used within components to write sass.

## JS

Javascript can be written in ES6 syntax. The main index file is in `src/assets/scripts/main.js`. It will be transpiled to ES5 with babel, bundled together with webpack, and minified in production. The output is in `dist/assets/scripts/main.js`

## Improvements That Can be Done

* Store Images in the cloud (eg. firebase, imgur) and use eleventy-img to download and optimize images


## Credits

* Powered By https://github.com/maxboeck/eleventastic
