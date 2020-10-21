# Tech Stack
MongoDB + Express.js + React.js + Node.js (MERN Stack)
 
## General Requirements:
The client has requested that we make an effort to choose popular languages and frameworks to allow them to have an easier time finding developers in the future. 
 
## Server / Hosting
* Client has requested that the server is located in Canada. 
* As of the October 20th, 2020 client meeting it has been determined that hosting is out of scope for this project.
 
## Front-end Languages
### [HTML - Hyper Text Markup Language](https://html.spec.whatwg.org)
HTML 5 is the standard modern web markup language. It is a defacto web standard. There are no alternatives. 
 
#### Pros:
* Easy to use and understand, human readable by design.
* All browsers support HTML.
* Most development tools support HTML.
* HTML is a markup language easily modified and analyzed by other programs.
* Search engine friendly, having accessible and proper HTML is important for Search Engine Optimization (SEO). 
* Simple to edit, does not require any sort of compilation or virtual machine to run. Changes can be viewed in near real-time. 
 
#### Cons:
* Takes time to learn the syntax.
* HTML is very fault tolerant and so writing "proper" HTML can be tricky for people unfamiliar with it as it will work even if improper.
 
### [CSS - Cascading Style Sheets](https://www.w3.org/Style/CSS/Overview.en.html)
CSS is used to transform the raw markup in HTML into a dynamic stylization adjusted based on the user's device and the designer's intentions. It is a defacto web standard. There are no alternatives. 
 
#### Pros:
* Reusable, the same CSS can be applied to multiple HTML files to ensure design consistency.
* Easy maintenance, an external CSS file can be referenced by multiple HTML documents allowing consistent styling throughout a design
* Search engine friendly.
* Fast webpage loading.
* Printer Friendly.
 
#### Cons:
* CSS can behave differently across multiple implementations and so multiple browsers and clients need to be tested for compatibility.
* Need to pay attention to different level of CSS （e.g CSS2，CSS3， etc.）
 
### [JavaScript](https://www.javascript.com)
JavaScript is a scripting language. We briefly considered alternatives like Typescript & Dart however the ubiquity of JS and the consistency throughout our tech-stack makes it our choice. 
 
#### Pros:
* Comparatively fast for the end user.
* Platform independent.
* Easy to debug and test.
* Extended functionality to web pages.
* Rich interfaces.
 
#### Cons:
* Single Inheritance.
 
## Front-end Framework
### [React.js](https://reactjs.org/)
React is a library that is mainly used for creating user interfaces.
 
#### Pros:
* Good choice in determining how the user will see the site.
* Smaller size, loads faster .
* Fully backwards compatible, making it easier to pick up in the future
* Highly popular with developers, so more likely to find someone to pick the project up in the future.
 
#### Cons:
* A huge library to import
 
## Back-end Framework
### [Express.js](https://expressjs.com/)
Express is a backend framework that is highly used, used by companies such as PayPal, Uber, and IBM. We also considered ThinkPHP but given its lower popularity and that most of the documentation is in Chinese we went with Express.js. 
 
#### Pros:
* Flexible and highly extensible, as features can easily be imported via plugins.
* The Virtual Domain Object Model (Virtual DOM) allows for selective DOM updates, greatly improving performance as changes don't require reloading the entire DOM. 
* React has a large community which is important to our client.
 
## Runtime Library 
### [Node.js](https://nodejs.org/en/)
Node.js is a runtime environment that's based on the V8 Javascript engine.
 
#### Pros:
* Uses JavaScript like the rest of our tech-stack, allows us to work in one language.
* Supports Asynchronous processing and event handling.
* Development is directly supported by IBM, Microsoft, PayPal, and more. 
* Excellent JSON Support which allows it to communicate easily with our MongoDB Database.
 
#### Cons:
* Node can performance bottleneck on CPU heavy tasks as it's primarily single threaded.
* Code can rapidly become messy with Callbacks, requiring solid documentation to keep code maintainable.
 
## Database
### [MongoDB](https://www.mongodb.com/)
MongoDB is a Document-Oriented NoSQL database program. We also considered MySQL and MariaDB but decided to choose MongoDB for its flexibility, scalability, and for the ease of integration with Node.js. 
 
#### Pros:
* Uses user-readable rich JSON documents. 
* Highly scalable, supports seamless horizontal scalability. 
* Provides high level APIs to work with data. 
* Does not require as much up-front design work, database can be adjusted more "on the fly" than a traditional RDBMS database.
 
#### Cons:
* Less "reliability" than an Atomic RDBMS implementation. 
* Less performant for complex queries. 
* Less popular than MySQL databases. 
 
## Map API
The client has requested that we use [Google Maps](https://cloud.google.com/maps-platform/maps).
 
## Payment API
The client has requested that we use [PayPal](https://www.paypal.com/ca/home).
 
 
 
