# React Pages
This is a brief description of creating new pages with React.

Our project uses `react-router` for managing pages. Most notably, see:
```js
  // from the index.js file
  <BrowserRouter>
    <App />
  </BrowserRouter>
```
as well as:
```js
  // from the Main.js file
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/members' component={Members} />
  </Switch>
```

The `<BrowserRouter>` component wraps the entire React app and ensure that page routing functions throughout. The `<Switch>` and `<Route>` components are the core of the routing system, and ALL pages must be defined here. This determines which path in the website URL maps to which component.

To add a new page, make a new component file in the `client/src/components/` folder (for example, `MyPage.js` for the Home page). Import this component into `Main.js` as such:
```js
import MyPage from './MyPage';
```
Finally, add a new `<Route>` with the exact path you want for your component:
```js
<Route exact path='/my-page' component={MyPage} />
```

## References

For a complete reference on setting up `react-router`, see:  
https://blog.pusher.com/getting-started-with-react-router-v4/