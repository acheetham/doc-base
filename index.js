/*
Copyright 2015 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

var URI = require("URIjs");
var path = require("path");

module.exports.getStaticFilesDir = function () {
    return path.resolve(path.join(__dirname, "src", "static"));
};

module.exports.helpers = {};

// Helper function to rewrite *.md links to *.html:
// With this helper, we can write links to *.md files in our source files but
// generate links to *.html in the DocPad output. This arrangement gives us
// links that work both on the GitHub website and in the generated HTML.
module.exports.helpers.rewriteMdLinks = function (content) {
    return content.replace(/(<a\s[^>]*href="[\w-/\.]+)\.md(["#])/gm, "$1.html$2");
};

// Helper function to build a URL for "Edit on GitHub" for the current document
module.exports.helpers.makeGithubLocationHelper = function (githubDocRoot) {
    return function () {
        // in case we're on Windows, replace "\" in the path with "/"
        var relativePath = this.document.relativePath.replace(/\\/g, "/");
        return githubDocRoot + relativePath;
    };
};

// Helper function to build relative URLs:
// Used for links to static resources such as CSS files. So that the generated
// DocPad output is independent of the URL that it is hosted at.
module.exports.helpers.getRelativeUrl = function (forUrl, relativeToUrl) {
    return URI(forUrl).relativeTo(relativeToUrl);
};

// Helper function to determine if two values are equal
// Used to determine which table of contents category to display on a particular
// page.
module.exports.helpers.ifEqual = function (a, b, options) {
    if (a == b) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
};
