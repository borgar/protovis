# Protovis

A graphical toolkit for visualization.

Protovis composes custom views of data with simple marks such as bars and dots. Unlike low-level graphics libraries that quickly become tedious for visualization, Protovis defines marks through dynamic properties that encode data, allowing inheritance, scales and layouts to simplify construction.


## Building & Installing

You can build the core library without anything other than the ability to run a [Makefile][make]. However, if you want the minified version or the docs, then you will need to install [node.js][node], [npm][npm], and a few dependencies:

To make the main Protovis library:

    make pv

To make the main Protovis library and the minified version:

    npm install -g uglifyjs
    make all

To make the documentation, you will need to install [java][java], [jsdoc-toolkit][jsdoc], and prossibly edit the makefile. This will be fixed in a future release.

To run a lint n the library:

    npm install -g jshint
    make lint



[node]: http://nodejs.org/
[npm]: http://npmjs.org/
[make]: http://www.gnu.org/software/make/manual/make.html
[jsdoc]: http://code.google.com/p/jsdoc-toolkit
[java]: http://www.java.com/
