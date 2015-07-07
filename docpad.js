/*
Copyright 2014 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

var URI = require("URIjs");
var path = require("path");
var fs = require("fs-extra");

var docsVersion = "development";

// The documentation root on GitHub:
// Used to build URLs for "Edit on GitHub" links
// var githubDocRoot = "https://github.com/fluid-project/doc-base/blob/master/src/documents/"
var githubDocRoot = "";

// Helper function to rewrite *.md links to *.html:
// With this helper, we can write links to *.md files in our source files but
// generate links to *.html in the DocPad output. This arrangement gives us
// links that work both on the GitHub website and in the generated HTML.
var rewriteMdLinks = function (content) {
    return content.replace(/(<a\s[^>]*href="[\w-/\.]+)\.md(["#])/gm, "$1.html$2");
};

// Helper function to build a URL for "Edit on GitHub" for the current document
var githubLocation = function () {
    // in case we're on Windows, replace "\" in the path with "/"
    var relativePath = this.document.relativePath.replace(/\\/g, "/");
    return githubDocRoot + relativePath;
};

// Helper function to build relative URLs:
// Used for links to static resources such as CSS files. So that the generated
// DocPad output is independent of the URL that it is hosted at.
var relativeUrl = function (forUrl, relativeToUrl) {
    return URI(forUrl).relativeTo(relativeToUrl);
};

// Helper function to determine if two values are equal
// Used to determine which table of contents category to display on a particular
// page.
var ifEqual = function (a, b, options) {
    if (a == b) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
};

var siteStructure = JSON.parse(fs.readFileSync("site-structure.json"));

// We locate the images within the src/documents directory so that images can
// be viewed on GitHub, as well as in the DocPad output. We need to
// instruct DocPad to treat the images specially so that they are not
// processed. We tell DocPad to ignore the images using "ignorePaths" and we
// then copy them ourselves with a "writeAfter" event handler.
var rootPath = process.cwd();
var imagesSrcDir = path.join(rootPath, "src", "documents", "images");
var imagesDestDir = "out/images";

module.exports = {
    rootPath: rootPath,
    ignorePaths: [ imagesSrcDir ],
    renderSingleExtensions: true,
    templateData: {
        siteStructure: siteStructure
    },
    plugins: {
        handlebars: {
            helpers: {
                rewriteMdLinks: rewriteMdLinks,
                githubLocation: githubLocation,
                relativeUrl: relativeUrl,
                ifEqual: ifEqual
            }
        },
        highlightjs: {
            aliases: {
                stylus: "css"
            }
        },
        stylus: {
            stylusLibraries: {
                nib: true
            },
            stylusOptions: {
                compress: true,
                'include css': true
            }
        },
        uglify: {
            //  Disable UglifyJS on the development environment.
            environments: {
                development: {
                    enabled: false
                }
            },

            //  Pass false to skip compressing entirely. Pass an object to specify custom
            //  compressor options: http://lisperator.net/uglifyjs/compress .
            compress: {},

            //  Pass false to skip mangling names.
            mangle: {}
        }
    },

    environments: {
        development: {
            stylusOptions: {
                // Disable compression on the development environment
                compress: false
            }
        }
    }
};
