# Tech Stack

## Website Hosting
Client has requested that the server is located in Canada.

### Self-Hosted via a rented Canadian VPS such as [ovh](https://www.ovhcloud.com/en-ca/vps/)
#### Pros:
* Inexpensive. 
* Full control over the system. The admin is given root access to the server. 
* Easy to migrate to another provider. 

#### Cons:
* Inelastic; cannot handle sudden spikes in traffic.
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
* CSS can behave differently across multiple implimentations and so multiple browsers and clients need to be tested for compatibility.
* Need to pay attention to different level of CSS （e.g CSS2，CSS3， etc.）
 
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

### [Layui](https://www.layui.com)
Layui is a front-end UI framework.
#### Pros:
* Light weight
* Esay to learn

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

Express is a backend framework that is highly used, used by companies such as PayPal, Uber, and IBM. Flexible, as features come in as plugins.

### [thinkphp](https://whatcms.org/c/ThinkPHP)
Thinkphp PHP is an open source framework of PHP.

#### Pros:
* Advanced model: it can support serialization field, text field, read-only field, delay write, optimistic lock, data sub table and other advanced features easily.
* View model: easily and dynamically create database view, multi table query is relatively simple.
* Association model: it allows you to complete the association operation of multiple tables in unexpected simple and flexible way.
* Template engine: an excellent XML based compiler template engine is built in the system, which supports two types of template tags, integrates Smarty and JSP tag library ideas, and supports tag library expansion. The driver can also support the third-party template engines such as Smarty, easetemplate, templatelite and smart.
* Cache mechanism: the system supports a variety of dynamic data cache types, including file mode, APC, DB, Memcache, shmop, eaccelerator and Xcache, as well as customizable static cache rules, and provides shortcut methods for access operation.
* Class library import: ThinkPHP first uses the method based on class library package and namespace to import class library, which makes the class library import more simple and clear, and also supports conflict detection and alias import. In order to facilitate the cross platform migration of the project, the system can also strictly check the case of the loaded file.
* Extension mechanism: the system supports powerful and flexible extension mechanisms, including class library extension, driver extension, application extension, model extension, controller extension, tag library extension, template engine extension, widget extension, behavior extension and pattern extension, so that you are no longer limited by the lack of core and at a loss, and you can do your own DIY framework and extended application.
* URL mode: the system supports the URL mode of common mode, pathinfo mode, rewrite mode and compatibility mode, supports the deployment of different servers and operation modes, and cooperates with the URL routing function, so that you can build the required URL address and optimize SEO at will.
* Compilation mechanism: the original core compilation and project dynamic compilation mechanism can effectively reduce the performance cost of file loading in OOP development. 
* ORM: simple and lightweight ORM implementation, combined with simple curd and AR mode, makes development efficiency everywhere.
* Query language: built in rich query mechanisms, including composite query, composite query, interval query, statistical query, positioning query, dynamic query and native query, make your data query concise and efficient.
* Dynamic model: without creating any corresponding model class, curd operation can be easily completed, dynamic switching between multiple models can be supported, and you can enjoy the incomparable pleasure and best experience of data operation.
* Group module: don't worry about the division of labor, coordination and deployment of large projects. Group modules help you solve cross project problems.
* Ajax support: built in ajax data return method, support JSON, XML and eval format return to the client, and the system does not bind any Ajax class library, you can use your own familiar Ajax class library for operation.
* Multi language support: the system supports the function of language pack. Projects and modules can have separate language packs, and can automatically detect the browser language and automatically load the corresponding language pack.
* Multi language support: the system supports the function of language pack. Projects and modules can have separate language packs, and can automatically detect the browser language and automatically load the corresponding language pack.
* Mode extension: in addition to the standard mode, the system has built-in Lite, thin and cli patterns, providing the best core framework for different levels of application development, and can also customize the mode extension.
* Automatic verification and completion: automatically complete the verification and filtering of form data, and generate safe data objects.
* Multi language support: the system supports the function of language pack. Projects and modules can have separate language packs, and can automatically detect the browser language and automatically load the corresponding language pack.
* Field type detection: field type cast to ensure more secure data writing and query.
* Database features: the system supports multi database connection and dynamic switch mechanism, and supports distributed database. 
* Multi language support: the system supports the function of language pack. Projects and modules can have separate language packs, and can automatically detect the browser language and automatically load the corresponding language pack.


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


### MongoDB
MongoDB is a Document-Oriented NoSQL database program. 

#### Pros:
* Uses user-readable rich JSON documents. 
* Uses JSON Querys giving more user-readable queries.
* Highly scalable, supports seamless horizontal scalability. 
* Provides high level APIs to work with data. 
* Does not require as much up-front design work, database can be adjust more on the fly than a traditional RDBMS database.
#### Cons:
* Less relaibality than an Atomic RDBMS implimentation. 
* Less performant for complex queries. 
* Less popular than MySQL databases. 
* MongoDB queries are less structured than tradtional SQL queries.

## Map API
The client has requested that we use [Google Maps](https://cloud.google.com/maps-platform/maps).

## Payment API
The client has requested that we use [PayPal](https://www.paypal.com/ca/home).

