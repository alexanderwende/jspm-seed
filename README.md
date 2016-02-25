# jspm-seed

## Prerequisites:

You will need nodejs and npm installed globally on your machine, but I assume
that's already done.

Then clone the repository:

    git clone git@github.com:alexanderwende/jspm-seed.git

## 1. Install jspm CLI:

    npm install jspm -g

A local, fixed version of jspm is already set up in `package.json`, along with
all other dependencies.

## 2. Install dependencies:

First install all project dependencies by running:

    npm install     // as usual...

Second, install all JavaScript dependencies (much like with bower) by running:

    jspm install    // this installs all the jspm dependencies with the correct versions

## 3. Build the CSS or build the whole app:

To run the app in development mode, you will only need to make sure, the css is
built by running:

    gulp sass       // build sass once into /css folder

or

    gulp sass:watch // build sass into /css folder and keep watching changes

If you want to build the whole application, there's a little caveat: `jspm install`
rewrites `config.js`, removing all the comments. However, the build step is looking
for a comment in `config.js` to remove the package option after inlining all modules.
For now, you will have to add those comments manually after installing jspm
dependencies:

    ...
    paths: {
      "github:*": "jspm_packages/github/*",
      "npm:*": "jspm_packages/npm/*"
    },
    /** build:remove **/        //<-- Add this one here
    packages: {
      "js/": {
        "meta": {
          "*.html": {
            "loader": "jst"
          },
          "*.ts": {
            "loader": "plugin-typescript"
          },
          "defaultExtension": false
        }
      }
    },
    /** endbuild **/            //<-- And add this one here
    map: {
      "babel": "npm:babel-core@5.8.35",
      ...

After adding the comments run:

    gulp build      // build the whole application into /dist folder

## 4. Start up development server

    npm start

This will open a tab in Chrome opening the development version of the app.
If you have built the entire app, you can navigate to <http://127.0.0.1:8080/dist/>
to see the application's production version.

## 5. Run tests:

You have two options to run tests, either using npm's test script which is defined
in `package.json` by running:

    npm test

Or by running the appropriate gulp task. They pretty much do the same, only that
with gulp, you can keep tests running while you're developing \(although I think
it's a bit overkill...\).

    gulp test
    gulp test:watch
