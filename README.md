# Perfect Score Exam

This is a project about the [Perfect Score Exam](https://docs.google.com/document/d/1OfUtksOOGix-W81D6URAAtPOhabH_mcLEHEq5qZGMlg/edit).
The project is hoisting at [Here](https://perfect-score-fr-exam.web.app).

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run deploy`

Deploy the app to firebase.

## Firebase CLI

Setup the firebase and initial the setting with the project by the [document](https://firebase.google.com/docs/cli).

## Todo about the project

- The prop `scrollContainer` of the package `react-lazyload` is not work. So I have to add `forceCheck` function when scrolling list. If we can make `scrollContainer` work by myself, then it will be excellent.

- If we want to add multiple skeletons in a block component, we have to add the corresponding `<LazyLoad>`. Because there are many listeners in `<LazyLoad>`, it will be saved resoureces if we design it as

```
<LazyLoad>
    {({isVisible}) => (
        isVisible ? <Component /> : <Skeleton />
    )}
</LazyLoad>
```

In the single block component, we can merge multiple `<LazyLoad>`.
