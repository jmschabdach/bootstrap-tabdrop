bootstrap-tabdrop
=================

A dropdown tab tool for @twitter bootstrap forked from Stefan Petre's (of eyecon.ro), improvements by @jschab

The dropdown tab appears when your tabs do not all fit in the same row.

Original site and examples: http://www.eyecon.ro/bootstrap-tabdrop/ 

Added functionality: Displays the text of an active tab selected from the dropdown list instead of the text option on the dropdown tab.

## Requirements

* [Bootstrap](http://twitter.github.com/bootstrap/) 2.0.4+
* [jQuery](http://jquery.com/) 1.7.1+

## Example

No additional HTML needed - the script adds it when the dropdown tab is needed.

Direct javascript:
```javascript
this.$('.nav-tabs').tabdrop().on("click", function(){
    $('.nav-tabs').tabdrop('layout');
});
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

### Methods

#### layout 

Checks to see if the tabs all fit in one row and displays the text of an active tab in the list:
```javascript
.tabdrop('layout');
```
