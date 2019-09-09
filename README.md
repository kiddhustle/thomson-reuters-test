This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## [Demo](https://kiddhustle.github.io/thomson-reuters-test/)


# Medal Count Widget
The widget is meant to be embedded on client’s websites during the Olympic
games. The widget shows up to 10 countries that have won the most medals of a
given kind in the Olympics games. It has the following requirements:

* It can accept up to two parameters:
* element_id – an id of the element that the module will use as its container.
* sort - determines the type of medals to sort by. It can have one of the following values: 'total', 'gold', 'silver' and 'bronze'.


* If no sort parameter is passed the sort should be by gold medals.
* When ranking by total medals, ties are broken by most gold.
* When ranking by gold, ties are broken by most silver.
* When ranking by silver, ties are broken by most gold.
* When ranking by bronze, ties are broken by most gold.
* Users can click the column headers to re-sort the countries by gold, silver,
bronze, or total medals won. With each sort the possibility exists that new
countries will enter and depart the top 10. The medals data should not be
re-fetched from the server when sort changes.
* Please follow the design shown in the screenshots on the following pages.
A sprite with the 13 countries flags (in alphabetical order according to their

country code) can be found here: https://s3-us-west-2.amazonaws.com/reuters.medals-widget/flags.png

To get the list of countries and their medals use the following URL: https://s3-us-west-2.amazonaws.com/reuters.medals-widget/medals.json.

Note that this

should be loaded dynamically using an Ajax call (simulate a call to a live API endpoint). Give an appropriate error message if there was an error retrieving the JSON data (if in real production scenario the API is down, you can simulate that by
running the widget but turning off your wifi/internet connection). Also note that although this is hosted on S3, a CORS file was set on this folder and thus this data can be retrieved with a regular Ajax request.
We prefer that the solution will be implemented using react or if you are familiar
with ClojureScript you can submit it as ClojureScript code using reagent library as
the React wrapper.
If you’re using other libraries please explain briefly why you chose them. Your
code can be on github (preferred), or emailed back as a zip file containing all the
assets needed (html, css, js). If you use a zip zip file please email it to:
talgiat@gmail.com.
The following pages contain screenshots of the widget in different states.



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
