# impulse
Impulse is an instantaneous web application starter kit. It is NOT a framework--
there are no new programming or markup languages to learn. To create a new web
application, simply copy and paste the project contents into a new folder.

There are three ways to run an Impulse instance out-of-the-box.

## Local File
The easiest way to launch an Impulse application is to simply open the main.html
file directly within your browser as a local file. Specific support varies
between browsers:
* Firefox will work with Impulse applications out-of-the-box
* Chrome will work once you have told it to allow local pages access to local
  files; otherwise, you will receive a cross-domain scriping error. The most
  effective way to do this is by appending the "--allow-file-access-from-files"
  flag when the Chrome executable is launched.
* Neither Internet Explorer or Edge support Impulse apps. Blame Microsoft.

## Hosted by Node.js
The server.js file in the top level of an Impulse application defines a Node.js
server that hosts web application content. If you have Node.js installed, simply
invoke the interpreter on the server.js file:
> node server.js

You can then browse to the specified IP address and port to view hosted content.
The IP address and port used can be changed by modifying the values of the
"hostIp" and "portNumber" variables defined in server.js.

## Hosted by CherryPy
The server.py file in the top level of an Impulse application defines a CherryPy
server that hosts web application content. If you have Python and CherryPy
installed, simply invoke Python on the server.py file:
> python server.py

You can then browse to the specified IP address and port to view hosted content.
The IP address and port used can be changed by modifying the values of the
"hostIp" and "portNumber" variables defined in server.py.

# Web Application
Impulse-based web applications focus on client-side development, but files are
organized the same way from the server and client perspective. The main.html
file defines the main browser entry point, whereas application execution begins
in the main.js file. With the exception of the server.js, server.py, and
main.html files, an application is divided into a classic MVC layout.

## Controls
The 'controls' folder contains JavaScript code defining the application logic
and any package dependencies. Within this folder, 'main.js' defines the primary
entry point for application logic, executed once the basic window has been
loaded. The 'require.js' file defines a basic Node.js-like "require()" function
used to load dependency packages from this folder, as well.

Dependency packages are defined as NPM-compatible folders (npm can be used to
retrieve and install new packages within this folder to add desired behaviors to
the application that can then be utilized within the client-side application).
By default, the basic Impulse application includes the following packages:
* Handlebars, to provide basic templating capabilities
* elsel, which provides a lightweight replacement for jQuery- and Prototype.js-like
  like $() behavior for selecting and manipulating DOM elements.
* fetch, which provides a lightweight AJAX behavior for loading arbitrary
  content from the server to the client.

## Models
Application data can be provided to the client by any arbitrary REST-ful data
server, but data loaded from the server itself can be organized under the
'models' folder. This commonly includes .JSON files, but could also be extended
on the server-side to provide a REST-ful interface to other data storage
mechanisms like SQLite.

## Visuals
A typical web application requires a number of different resources to define
the ways in which content is presented. This can include HTML templates (for
usage with Handlebars, for example), CSS stylesheets, and images.

Enjoy!
