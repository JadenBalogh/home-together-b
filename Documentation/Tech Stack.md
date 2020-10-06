# Tech Stack
- The following frameworks are popular and widespread, so future developers will be able to pick up where we left off as requested by the client.

- Website needs to be usable on desktop and mobile, many users may only have one or the other. 

--- **Website Hosting** ---
Client has requested that the server is located in Canada
 Options:
    - Self-Hosted via a rented Canadian VPS such as [ovh](https://www.ovhcloud.com/en-ca/vps/)
    - Cloud based dynamic hosting services such as [Amazon EC2](https://aws.amazon.com/ec2/)
    - Cloud Based Website Hosting service such as [Amazon Lightsail](https://aws.amazon.com/lightsail/)


--- **SSL** ---
    Site should support HTTPS.
        Basic (free) option would be getting a certificate via [LetsEncrypt](https://letsencrypt.org/).
            - [Lets Encrypt: The good and the bad](https://www.datamation.com/security/lets-encrypt-the-good-and-the-bad.html)

        If we use AWS for hosting we could also use Amazon's [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/). 
     
        We could also purchase a SSL certificate via a service such as [DigiCert](https://www.digicert.com/)

--- **Website Tech Stack** ---
Potential Front/Back Ends:
1. Express.js backend 
A backend framework that is highly used, used by companies such as PayPal, Uber, and IBM. Flexible, as features come in as plugins.

2. React.js front end
React is a library that is mainly used for creating user interfaces.

3. Angular.js front end
Angluar is a library for developing and testing single page applications. 

4. Vue.js front end
Vue is a library for building user interfaces and single page applications, made to be a lightweight version of Angular.js.

--- **Map API** ---
Potential MAP APIs:
1. https://developer.apple.com/maps/web/ (Apple MapKit JS aka Apple Maps)
2. https://wiki.openstreetmap.org/wiki/Frameworks#Displaying_interactive_maps (OpenStreeMaps Dynamic Maps "Slippy Maps")
3. https://cloud.google.com/maps-platform/maps (Google Cloud Maps Program aka Google Maps)

We rejected OpenStreetMaps due to the more complicated tech integration and the less popularity if/when the tech stack is passed on. 
Google Maps and Apple Maps have similar developer interest and documentation however the client would prefer Google Maps so that's the API we are planning to use.

_Design Considerations:_
- Map needs to support displaying a broad area for things like service area of a service, or showing the user where there search is on a map 
    eg: User enters 50km radius around Nelson BC, is shown a map with a 50km radius circle on the map.

- Location Fuzzing e.g: User is given an area of the house and not always an exact address. Does our site need to support this for listings?

- Cost, how much does our API charge? Are we going to require users to explicitly active the map to reduce cost or should we automatically display a map on certain pages?

- Does our API implementation need to support user geo-location input?
    eg: Show me services within 50km of my current location

--- **2-Factor Authentication** ---
_FEATURE STILL UNDER DISCUSSION_

Since admins will have access to multiple users personal data and users will be entering personal information into the site we should support the option to use two factor authentication. 

One Time Password (OTP) and/or Time-Based One-Time Password (TOTP)?

Discussion on TOTP vs SMS: https://www.allthingsauth.com/2018/04/05/totp-way-more-secure-than-sms-but-more-annoying-than-push/

_Common APIs:_
Authy - https://www.twilio.com/docs/authy/api/one-time-passwords
Google Authenticator - https://www.google.com/landing/2step/#tab=how-it-works

_Design Considerations:_
- Adds complexity, requires support for handing lost/compromised TOTP devices. Requires additional 3rd party APIs.
- Improves security, helps peevent credential stuffing attacks.
- Should certain user-groups require 2-factor authentication (Admins/Support)?


