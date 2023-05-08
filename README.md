This is now simply `nativescript-fonticon`. Same API, just removed `TNS` prefix naming, see here: https://github.com/nstudio/nativescript-ui-kit/blob/main/packages/nativescript-fonticon/README.md
<hr/>
## A simpler way to use font icons with NativeScript + Angular.

[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Build Status](https://martinreinhardt-online.de/jenkins/buildStatus/icon?job=NPM/nativescript-ngx-fonticon/master)](https://martinreinhardt-online.de/jenkins/blue/organizations/jenkins/NPM%2Fnativescript-ngx-fonticon/activity)

### The Problem

You can use icon fonts with NativeScript by combining a class with a unicode reference in the view:

- css

```css
.fa {
  font-family: FontAwesome;
}
```

- view

```xml
<Label class="fa" text="\uf293"></Label>
```

This works but keeping up with unicodes is not fun.

### The Solution

With this plugin, you can instead reference the `fonticon` by the specific classname:

```xml
<Label class="fa" [text]="'fa-bluetooth' | fonticon"></Label>
```

## Install

```bash
npm install nativescript-ngx-fonticon --save
```

### Usage

[FontAwesome](https://fortawesome.github.io/Font-Awesome/) will be used in the following examples but you can use any custom font icon collection.

- Place font icon `.ttf` file in `app/fonts`, for example:

```
app/fonts/fontawesome-webfont.ttf
```

- Create base class in `app.css` global file, for example:

```css
.fa {
  font-family: FontAwesome, fontawesome-webfont;
}
```

**NOTE**: Android uses the name of the file for the font-family (In this case, `fontawesome-webfont`.ttf. iOS uses the actual name of the font; for example, as found [here](https://github.com/FortAwesome/Font-Awesome/blob/master/css/font-awesome.css#L8). You could rename the font filename to `FontAwesome.ttf` to use just: `font-family: FontAwesome`. You can [learn more here](http://fluentreports.com/blog/?p=176).

- Copy css to `app` somewhere, for example:

```
app/assets/font-awesome.css
```

Then modify the css file to isolate just the icon fonts needed. [Watch this video to better understand](https://www.youtube.com/watch?v=qb2sk0XXQDw).

- Import the `TNSFontIconModule` passing a configuration with the location to the `.css` file to `forRoot`:

Use the classname prefix as the `key` and the css filename as the value relative to directory where your `app.module.ts` is, then `require` the css file.

### Example configurations:

```typescript
/* NS out of the box webpack configuration or NS6+  */
// Assuming you placed your css file in `src/app/assets/css/fa-5.css`:
TNSFontIconModule.forRoot({ fa: require("~/app/assets/css/fa-5.css") });

/* Non-webpack */
// Note that the location of the file relative to your app.module
// is what determines the path that require takes.
// This assumes that assets is a sibling folder of `app.module.ts`.
TNSFontIconModule.forRoot({ fa: require("./assets/css/fa-5.css") });
```

```typescript
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

@NgModule({
	declarations: [
		DemoComponent,
	],
	bootstrap: [
		DemoComponent,
	],
	imports: [
		NativeScriptModule,
		TNSFontIconModule.forRoot({
			'fa': require('~/app/assets/css/fa-5.css'),
			'ion': require('~/app/assets/css/ionicons.css')
			/*
			For non webpack, assuming the assets folder is a sibling of app.module.ts:
			'fa': require('./assets/css/fa-5.css')
			*/
		})
	]
})
```

- _Optional_ Configure the service with DEBUGGING on

When working with a new font collection, you may need to see the mapping the service provides. Passing `true` as seen below will cause the mapping to be output in the console to determine if your font collection is being setup correctly.

```typescript
import { TNSFontIconModule, TNSFontIconService } from 'nativescript-ngx-fonticon';
// turn debug on
TNSFontIconService.debug = true;

@NgModule({
	declarations: [
		DemoComponent,
	],
	bootstrap: [
		DemoComponent,
	],
	imports: [
		NativeScriptModule,
		TNSFontIconModule.forRoot({
			'fa': require('~/app/assets/css/fa-5.css')
			/*
			For non webpack, assuming the assets folder is a sibling of app.module.ts:
			'fa': require('./assets/css/fa-5.css')
			*/
		})
	]
})
```

- Setup your component

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'demo',
  template: '<Label class="fa" [text]="'fa-bluetooth' | fonticon"></Label> '
})
export class DemoComponent {

}
```

| Demo FontAwesome (iOS)                                                | Demo Ionicons (iOS)                                                   |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| ![Sample1](https://cdn.filestackcontent.com/m6JyRO1fTsCHPohoZi5I?v=0) | ![Sample2](https://cdn.filestackcontent.com/jje2pehCRCeLDC8QHBmp?v=0) |

| Demo FontAwesome (Android)                                            | Demo Ionicons (Android)                                               |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| ![Sample3](https://cdn.filestackcontent.com/lNCptx2aQisOa6p27iqb?v=0) | ![Sample4](https://cdn.filestackcontent.com/2ajSF92uQDusI37fEvQA?v=0) |

## How about just NativeScript without Angular?

The standard NativeScript converter is here:

- [nativescript-fonticon](https://github.com/NathanWalker/nativescript-fonticon)

## Why the TNS prefixed name?

`TNS` stands for **T**elerik **N**ative**S**cript

iOS uses classes prefixed with `NS` (stemming from the [NeXTSTEP](https://en.wikipedia.org/wiki/NeXTSTEP) days of old):
https://developer.apple.com/library/mac/documentation/Cocoa/Reference/Foundation/Classes/NSString_Class/

To avoid confusion with iOS native classes, `TNS` is used instead.

## Credits

Idea came from [Bradley Gore](https://github.com/bradleygore)'s [post here](http://www.blog.bradleygore.com/2016/03/28/font-icons-in-nativescript/).

## Contributors

- [NathanaelA](https://github.com/NathanaelA)

# License

[MIT](/LICENSE)
