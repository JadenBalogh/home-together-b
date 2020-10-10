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
* Expensive, you are paying for the elasticity.
* Due to the amount of vendor specifity it would be a technical challenge to migrate to another platform.

### Cloud based website hosting service such as [Amazon Lightsail](https://aws.amazon.com/lightsail/) 
#### Pros:
* Lower engineering costs, Amazon provideds a per-configured enviroment. 
* Extremely simple management, you don't even need to know how to SSH.

#### Cons:
* Low flexability, a pre-configured locked down EC2 instance. 
* Poor scaling, not as flexable as EC2 or other services.

#### Cons:
## Website Front End
Frameworks should be popular and widespread to better allow future developers to pick up where we left; The use of a common framework was requested by the client.

### React.js front-end
[React.js Website](https://reactjs.org/) <br />
React is a library that is mainly used for creating user interfaces. Would be the better choice in determining how the user will see the site. Smaller size, so loads faster. Fully backwards compatible, making it easier to pick up in the future. Highly popular with developers, so more likely to find someone to pick the project up in the future.

### Angular.js front-end
[Angular.js Website](https://angularjs.org/) <br />
Angluar is a library for developing and testing single page applications. Simpler to work with due to both one and two-way data binding. Each update to Angular requires updates between versions, so less backwards compatible.

### Vue.js front-end
[Vue.js Website](https://vuejs.org/) <br />
Vue is a library for building user interfaces and single page applications, made to be a lightweight version of Angular.js. Better for rapid prototyping and simple applications. 

## Website Back-End

### Express.js back-end 
[Express.js Website](https://expressjs.com/) <br />
A backend framework that is highly used, used by companies such as PayPal, Uber, and IBM. Flexible, as features come in as plugins.

## Database
### MySQL
#### Pros:
* MySQL is one of the most well know relational databases. 
* It's the database taught in the Introduction to Databases course at UBCO so most students will be familiar with it. 
* MySQL is easy to learn and the code is relatively user-readable. 
* Due to its ubiquity it is supported on most cloud platforms.

#### Cons:
* MySQL is also quite old; it was originally realeased in 1995 and has accumulated a lot of cruft and non-standard behaviour compared to newer database engines. 
* The client is not entriely open source, there is an enterprise edition which has a [cost](https://shop.oracle.com/pls/ostore/product?p1=MySQL).
* MySQL has limited verticle scalability and often has to rely on horizontal scaling to imporve performance. Which has increased engineering and complexity costs




## Map API
The client has requested that we use [Google Maps](https://cloud.google.com/maps-platform/maps).

## Payment API
The client has requested that we use [PayPal](https://www.paypal.com/ca/home).

