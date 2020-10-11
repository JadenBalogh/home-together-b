# Testing Strategy
React.js is a highly component-based framework, and as such, our testing approach will be focused strongly around testing the functionality of these individual frameworks. We will accomplish this through the use of thorough integration testing accompanied by unit testing where needed.

## Frameworks
We will use the Jest and Enzyme frameworks for testing our React code. Jest provides bountiful options for both unit and integration testing through functions such as `it()`, `test()` and `expect()`. Enzyme is designed specifically for component testing in React, and complements Jest beautifully in this regard. The functions `mount()` and `shallow()` will be used to interface directly with the HTML of the webpage in our tests, allowing us to closely mimic and test user behaviours.

## Continuous Integration
We will make heavy use of GitHub Actions in our repo, and one of these core uses is for automically running the tests mentioned above. This can be done easily by creating a workflow file in our repository and enforcing a status check on every pull request into the `dev` or `master` branches. This status check would then run both our unit and integration tests on every update, in addition to other checks such as JavaScript linting.

## References
We've compiled some useful references that were used to research the above options as well as provide direct implementation examples and details:

[[1](https://medium.com/coletiv-stories/how-to-setup-continuous-integration-and-deployment-workflows-for-reactjs-using-github-actions-4e2535c28057)] *GitHub Continuous Integration with ReactJS*

[[2](https://blog.bitsrc.io/how-to-test-react-components-using-jest-and-enzyme-fab851a43875)] *Jest and Enzyme for testing React components*

[[3](https://www.smashingmagazine.com/2020/06/practical-guide-testing-react-applications-jest/)] *Implementing Jest and Enzyme in React*

[[4](https://css-tricks.com/react-integration-testing-greater-coverage-fewer-tests/)] *Integration testing in React*