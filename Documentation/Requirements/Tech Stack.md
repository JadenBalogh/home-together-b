# Tech Stack

## Website Hosting
Client has requested that the server is located in Canada.

### Self-Hosted via a rented Canadian VPS such as [ovh](https://www.ovhcloud.com/en-ca/vps/)
#### Pros:
* Inexpensive. 
* Full control over the system, given root access. 
* Easy to migrate to another provider. 

#### Cons:
* Inelastic, cannot handle sudden spikes in traffic.
* Difficult to scale. Adding additional performance requires an increase in network complexity.

### Cloud based dynamic hosting service such as [Amazon EC2 + Amazon RDS + Amazon S3 + Elastic Load Balancer (ELB)](https://aws.amazon.com/ec2/) 
#### Pros:
* High availability.
* High scalability, can accomodate any number of users by spinning up more EC2 instances and balancing load.

#### Cons:
* Expensive, you are paying for the elasticity/resource availability.
* Due to the amount of vendor specifity it would be a technical challenge to migrate to another platform.
* Extreme network complexity unless the site is expecting a very large amount of traffic. 

### Cloud based website hosting service such as [Amazon Lightsail](https://aws.amazon.com/lightsail/) 
#### Pros:
* Lower engineering costs, Amazon provideds a per-configured enviroment. 
* Extremely simple management, the admin doesn't even need to know how to use SSH.

#### Cons:
* Low flexability, Lightsail is basically a pre-configured and locked down EC2 instance. 
* Poor scaling, not as flexable as EC2 or other services.
* Expensive. 

## Front-end Language
Languages should be popular and widespread to better allow future developers to pick up where we left; The use of common languages was requested by the client.

### [HTML](https://html.spec.whatwg.org)

HTML 5 is the standard modern web markup language. It is understood by all modern web browsers by design and is a defacto web standard.

#### Pros:
* Easy to use and understand, human readable by design.
* All browers support basic HTML.
* Most develpment tools support HTML.
* HTML is a markup language easily modified and analyised by other programs.
* Search engine friendly, having accessable and proper HTML is important for SEO.
* Simple to edit, does not require any sort of compilation or virtual machine to run. Changes can be viewed in near real-time. 

#### Cons:
* Takes time to learn the syntax. 

### [CSS]https://www.w3.org/Style/CSS/Overview.en.html
CSS aka cascading Style Sheets is used to transform the raw markup in HTML into a dynamic stylization adjusted based on the users device and the designers intentions. It is a defacto web standard. 

#### Pros:
* Reusable, the same CSS can be applied to multiple HTML files to ensure design consistency.
* Easy maintenance, an external CSS file can be referenced by multiple HTML files allowing consistent changes throughout a design
* Search engine friendly.
* Fast webpage loading.
* Printer Friendly.

#### Cons:
* Need to test across multiple browsers for compatibility
* Need to pay attention to different level of CSS （i.e. CSS2，CSS3， etc.）
 
 
### [JavaScript](https://www.javascript.com)
 JavaScript is a scripting language.
 
#### Pros:
* Comparatively fast for the end user
* Platform independent
* Easy to debug and test
* Extended functionality to web pages
* Rich interfaces

#### Cons:
* Single Inheritance


## Front-end Framework
Frameworks should be popular and widespread to better allow future developers to pick up where we left; The use of common frameworks was requested by the client.

### [jQuery](https://jquery.com)
jQuery is a JavaScript Library.

#### Pros:
* Pages load faster
* Search engine friendly
* Large library
* Ajax support
* Strong opensource community
* JavaScript enhancement, no need to learn new syntax

#### Cons:
* A huge library to import


### [React](https://reactjs.org/)
React is a library that is mainly used for creating user interfaces.

#### Pros:
* Good choice in determining how the user will see the site
* Smaller size, loads faster 
* Fully backwards compatible, making it easier to pick up in the future
* Highly popular with developers, so more likely to find someone to pick the project up in the future

### [Angular](https://angularjs.org/)
Angluar is a library for developing and testing single page applications. 
#### Pros:
* Simpler to work with due to both one and two-way data binding. 
* Each update to Angular requires updates between versions, so less backwards compatible

### [Vue](https://vuejs.org/)
Vue is a library for building user interfaces and single page applications, made to be a lightweight version of Angular.js. 

#### Pros:
* Better for rapid prototyping and simple applications


## Back-End Language

### PHP
PHP is a general-purpose server scripting language.

#### Pros:
* Easily connected with the database
* Easy maintenance
* easier to protect the web applications
* more stable

## Back-end Framework

### [Express](https://expressjs.com/)

A backend framework that is highly used, used by companies such as PayPal, Uber, and IBM. Flexible, as features come in as plugins.


## Database
### MySQL
MySQL is a RDBMS based Database. 
#### Pros:
* MySQL is one of the most well know relational databases. 
* It's the database taught in the Introduction to Databases course at UBCO so most students will be familiar with it. 
* MySQL is easy to learn and the code is relatively user-readable. 
* Due to its ubiquity it is supported on most cloud platforms.
* Commercial support will be available for the forseeable future, no worry about the project dying. 

#### Cons:
* MySQL is quite old; it was originally realeased in 1995 and has accumulated a lot of cruft and non-standard behaviour compared to newer database engines. 
* The client is not entriely open source, there is an enterprise edition which has an additional [cost](https://shop.oracle.com/pls/ostore/product?p1=MySQL).
* MySQL has limited verticle scalability and often has to rely on horizontal scaling to imporve performance. Which has increased engineering and complexity costs.


### MariaDB
MariaDB is an open source fork of MySQL and is touted as a "Drop In" replacement for MySQL. 
#### Pros:
* Offers most/all the features of Enterprise MySQL for free. 
* Open Source.
* High performance vs MySQL. 
* Quicker security patches vs MySQL. 

#### Cons:
* Limited commercial support.
* Less popular than MySQL.
* Difficuly to scale like MySQL. 



### DATABASE 3
#### Pros:

#### Cons:




## Map API
The client has requested that we use [Google Maps](https://cloud.google.com/maps-platform/maps).

## Payment API
The client has requested that we use [PayPal](https://www.paypal.com/ca/home).

