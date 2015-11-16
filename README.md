# Modernizr.on() prollyfill

> Prollyfill: a polyfill for a not yet standardized API.

*- Alex Sexton, 2012*

**A polyfill for the (potentially) forthcoming `Modernizr.on()` method, for Modernizr 2.x.**

_Update: `Modernizr.on()` did indeed make it into Modernizr 3.0 so now it’s best to just use [the new builder](https://modernizr.com/download) for new projects. This is still useful if you’re rocking a 2.x build like some kind of retro superstar and don’t want to deal with 3.x API changes._

## Background

Handling asynchronous detects in [Modernizr](http://modernizr.com) is currently a pain. These are ones which require some deferred action, so won't have finished by the time the rest of Modernizr finishes running:

```html
<script src="modernizr.custom.js"></script>
<script>
  console.log(Modernizr.datauri); // undefined
</script>
```

At time of writing, there are 8 detects which suffer this plight: `todataurl`, `webplossless`, `webp`, `scriptasync`, `svgasimg`, `datauri`, `blobworkers` and `dataworkers`.

Modernizr v3.0 (currently in development) is expected to include a new method to make these easier to work with, which at present goes by the name of `Modernizr.on()`.

I should make it clear that **the details aren't final yet...** but it's prolly gonna look like this:

```javascript
Modernizr.on(property, callback)
```

where:

* `property` is the name of a feature in your Modernizr build (e.g. `'datauri'`)
* `callback` is a function to be called when that test has completed, which takes a single argument: the result of the test (usually a Boolean)

If the test has already completed (including if you attach a callback to a *synchronous* test), the callback will be called almost immediately (it'll actually be on the next tick).

## The polyfill

So, in case you want to start playing with this functionality *now* (i.e. on 2.x), here's a **very crude, fairly inefficient** polyfill.

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

***Please don't*** call `Modernizr.on()` with a property name which doesn't exist in your Modernizr build, because it'll keep looking for it forever and waste CPU cycles. Like I said, it's pretty crude.

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

## Feedback

If you've got any thoughts about the `Modernizr.on()` API, please tell us over at the [Modernizr issues board](https://github.com/Modernizr/Modernizr/issues), or tweet [@Modernizr](https://twitter.com/Modernizr) or [@StuCoxMedia](https://twitter.com/StuCoxMedia).
