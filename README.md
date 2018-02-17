# view-observer

Wrapper around [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) with added functionality.

[![Build Status](https://img.shields.io/circleci/project/vuejs/vue/dev.svg)](https://circleci.com/gh/vuejs/vue/tree/dev)
[![Coverage Status](https://img.shields.io/codecov/c/github/vuejs/vue/dev.svg)](https://codecov.io/github/vuejs/vue?branch=dev)
[![Version](https://img.shields.io/npm/v/view-observer.svg)](https://www.npmjs.com/package/view-observer)
[![License](https://img.shields.io/npm/l/view-observer.svg)](https://oss.ninja/mit/migueljteixeira)

## Install

```
$ npm install view-observer
```

## Usage

```js
import viewObserver from 'view-observer'

var footer = document.getElementById('footer')
var images = document.getElementsByClassName('images')

viewObserver().observe([footer, images])
	.subscribeOnce(footer, () => {
		console.log('We just reached the footer! This callback is called only once')
	});
	.subscribe(images, (element) => {
		console.log(`Image ${element} just entered the viewport!`)
	}, (element) => {
		console.log(`Image ${element} just leaved the viewport!`)
	})
```

## API

### `observe(elements)`

Adds an element (or a collection of elements) to the set of target elements being watched by the IntersectionObserver.

Returns the `viewObserver` instance.

#### elements
Type: `String` `Array`

---

### `subscribe(elements, [enterCallback, leaveCallback])`

Subscribes for changes in the observed elements.
The function `enterCallback` is called when the target `element` enters the specified threshold. `leaveCallback` is called when the target `element` leaves the specified threshold.

Returns the `viewObserver` instance.

#### elements

Type: `String` `Array`

#### enterCallback

Type: `Function`

#### leaveCallback

Type: `Function`

## License

[MIT](https://oss.ninja/mit/migueljteixeira)