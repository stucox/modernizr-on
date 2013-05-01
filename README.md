# Modernizr.on() Prollyfill

> Prollyfill: a polyfill for a not yet standardized API.

*- Alex Sexton, 2012*

## Background

Handling asynchronous detects in [Modernizr](http://modernizr.com) currently a pain. These are ones which require some deferred action, so won't have finished by the time the rest of Modernizr finishes running:

```html
<script src="modernizr.custom.js"></script>
<script>
  console.log(Modernizr.datauri); // undefined
</script>
```

At time of writing, there are 8 detects which suffer this plight: `todataurl`, `webplossless`, `webp`, `scriptasync`, `svgasimg`, `datauri`, `blobworkers` and `dataworkers`.

Modernizr v3.0 (currently in development) is expected to include a new method to make these easier to work with, which at present goes by the name of `Modernizr.on()`.

I should make it clear that the details aren't final yet... but it's prolly gonna look like this:

```javascript
Modernizr.on(property, callback)
```

where:

* `property` is the name of a feature in your Modernizr build (e.g. `'datauri'`)
* `callback` is a function to be called when that test has completed, which takes a single argument: the result of the test (usually a Boolean)

If the test has already completed (including if you attach a callback to a *synchronous* test), the callback will be called almost immediately (it'll actually be on the next tick).

## The polyfill

So, in case you want to start playing with this functionality *now*, here's a very crude, fairly inefficient polyfill.

### Usage

Include the `modernizr-on.min.js` script after Modernizr, but before any calls to `Modernizr.on()`. This normally means you can put it with the rest of your scripts at the bottom of your page (if that's how you roll):

```html
<!DOCTYPE html>
<html>
<head>
    ...
    <script src="modernizr.custom.js"></script>
</head>
<body>
    ...
    <!-- HTML things -->
    ...
    <script src="modernizr-on.min.js"></script>
    <script src="your-other-scripts.js"></script>
</body>
```

Then you can use it in your scripts something like this:

```javascript
Modernizr.on('datauri', function (result) {
    if (result) {
        // Browser supports data URIs
    }
    else {
        // Browser doesn't support data URIs
    }
});
```

### Usage with [RequireJS](http://requirejs.org/)

I'm lazy so I haven't made it AMD-compatible I'm afraid (feel free to [submit a PR](https://github.com/stucox/modernizr-on/pulls)!), so you should use a [shim config](http://requirejs.org/docs/api.html#config-shim):

```javascript
requirejs.config({
    shim: {
        'modernizr-on': {
            deps: ['Modernizr'],
            exports: 'Modernizr'
        }
    }
});
```

Although as Modernizr 2.x isn't AMD-compatible either, that'll probably need a shim config too.
