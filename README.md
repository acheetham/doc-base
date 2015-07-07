Documentation Base
==================

This project contains shared files and components used for documentation style
websites.

## Build with DocPad

Install DocPad:

```
npm install -g docpad
```

Get the node modules for this project:

```
npm install
```

To generate the HTML and run the DocPad server locally:

```
docpad run --env static
```

Point your browser to:

```
http://localhost:9778/
```

## Deploy to GitHub Pages

```
docpad deploy-ghpages --env static
```
