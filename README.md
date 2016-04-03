## A simpler way to use font icons with NativeScript

[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/NathanWalker/nativescript-ng2-fonticon-pipe/status.svg)](https://david-dm.org/NathanWalker/nativescript-ng2-fonticon-pipe#info=dependencies) [![devDependency Status](https://david-dm.org/NathanWalker/nativescript-ng2-fonticon-pipe/dev-status.svg)](https://david-dm.org/NathanWalker/nativescript-ng2-fonticon-pipe#info=devDependencies)

### The Problem

You can use icon fonts with NativeScript by combining a class with a unicode reference in the view:

* css
```
.fa {
  font-family: FontAwesome;
}
```

* view
```
<Label class="fa" text="\uf293"></Label>
```

This works but keeping up with unicodes is not fun.

### The Solution

With this plugin, you can instead reference the `fonticon` by the specific classname:

```
<Label class="fa" [text]="'fa-bluetooth' | fonticon:'fa'"></Label> 
```

## Install

```
npm install nativescript-ng2-fonticon-pipe --save
```

### Usage

[FontAwesome](https://fortawesome.github.io/Font-Awesome/) will be used in the following examples but you can use any custom font icon collection.

* Place font icon `.ttf` file in `app/fonts`, for example:
  
```
app/fonts/fontawesome-webfont.ttf
```

* Create base class in `app.css` global file, for example:

```
.fa {
  font-family: FontAwesome;
}
```

* Copy custom font `.css` to `app` somewhere, for example:

```
app/font-awesome.css
```

* Configure the service with the location to the `.css` file:

```
nativeScriptBootstrap(DemoComponent, [
  provide(TNSFontIconService, {
    useFactory: () => {
      return new TNSFontIconService({
        'fa': 'font-awesome.css'
      });
    }
  })
]);
```

* *Optional* Configure the service with DEBUGGING on

When working with a new font collection, you may need to see the mapping the service provides. Passing `true` as seen below will cause the mapping to be output in the console to determine if your font collection is being setup correctly.

```
nativeScriptBootstrap(DemoComponent, [
  provide(TNSFontIconService, {
    useFactory: () => {
      return new TNSFontIconService({
        'fa': 'font-awesome.css'
      }, true);  <--- pass true to turn debug mode on
    }
  })
]);
```

5. Use the Pipe, for example:

```
<Label class="fa" [text]="'fa-bluetooth' | fonticon:'fa'"></Label> 
``` 

Demo FontAwesome (iOS) |  Demo Ionicons (iOS)
-------- | ---------
![Sample1](https://cdn.filestackcontent.com/m6JyRO1fTsCHPohoZi5I?v=0) | ![Sample2](https://cdn.filestackcontent.com/jje2pehCRCeLDC8QHBmp?v=0)

Demo FontAwesome (Android) |  Demo Ionicons (Android)
-------- | -------
![Sample3](https://cdn.filestackcontent.com/lNCptx2aQisOa6p27iqb?v=0) | ![Sample4](https://cdn.filestackcontent.com/2ajSF92uQDusI37fEvQA?v=0)

## Why the TNS prefixed name?

`TNS` stands for **T**elerik **N**ative**S**cript

iOS uses classes prefixed with `NS` (stemming from the [NeXTSTEP](https://en.wikipedia.org/wiki/NeXTSTEP) days of old):
https://developer.apple.com/library/mac/documentation/Cocoa/Reference/Foundation/Classes/NSString_Class/

To avoid confusion with iOS native classes, `TNS` is used instead.

## Contributors

- [NathanaelA](https://github.com/NathanaelA)

# License

[MIT](/LICENSE)
