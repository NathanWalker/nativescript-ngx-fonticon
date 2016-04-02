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

1. Place font icon `.ttf` file in `app/fonts`, for example:
  
```
app/fonts/fontawesome-webfont.ttf
```

2. Create base class in `app.css` global file, for example:

```
.fa {
  font-family: FontAwesome;
}
```

3. Copy custom font `.css` to `app` somewhere, for example:

```
app/font-awesome.css
```

4. Configure the service with the location to the `.css` file:

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

5. Use the Pipe, for example:

```
<Label class="fa" [text]="'fa-bluetooth' | fonticon:'fa'"></Label> 
``` 

## Why the TNS prefixed name?

`TNS` stands for **T**elerik **N**ative**S**cript

iOS uses classes prefixed with `NS` (stemming from the [NeXTSTEP](https://en.wikipedia.org/wiki/NeXTSTEP) days of old):
https://developer.apple.com/library/mac/documentation/Cocoa/Reference/Foundation/Classes/NSString_Class/

To avoid confusion with iOS native classes, `TNS` is used instead.

# License

[MIT](/LICENSE)
