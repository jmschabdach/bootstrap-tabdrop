bootstrap-tabdrop
=================

A dropdown tab tool for @twitter bootstrap forked from Stefan Petre's (of eyecon.ro), improvements by @jschab and @josephdburdick

The dropdown tab appears when your tabs do not all fit in the same row.

Original site and examples: http://www.eyecon.ro/bootstrap-tabdrop/ 

Added functionality: Displays the text of an active tab selected from the dropdown list instead of the text option on the dropdown tab (improved).

Added functionality: Allows customizable offset to determine whether tab is overflown or not.

## Requirements

* [Bootstrap](http://twitter.github.com/bootstrap/) 2.0.4+
* [jQuery](http://jquery.com/) 1.7.1+

## Example

No additional HTML needed - the script adds it when the dropdown tab is needed. It also supports tabs that have `display: flex`.

Direct javascript:
```javascript
this.$('.nav-tabs').tabdrop();
```

## Use

Call the tabdrop:
```javascript
.tabdrop();
```

Call the tabdrop with options:
```javascript
.tabdrop(options);
```

### Options

#### text 
Type: string

Default: icon 
```html
<i class="icon-align-justify"></i>
```
To change the default value, call
```javascript
.tabdrop({text: "your text here"});
```
when initalizing the tabdrop. The displayed value will change when a tab is selected from the dropdown list.

#### align 
Type: string

Default: right 
```js
$('.nav-tabs').tabdrop({align: 'left'});
```
when initalizing the tabdrop. The tab will align on the left or right. This addresses issues with tabs that have `display: flex`.

#### offsetTop 
Type: integer

Default: 0 

To change the default value, call
```javascript
.tabdrop({offsetTop: N});
```
when initalizing the tabdrop. This determines when tab has to be included in the dropdown.

### Methods

#### layout 

Checks to see if the tabs all fit in one row and displays the text of an active tab in the list:
```javascript
.tabdrop('layout');
```
