# Issues

## Toast-PhoneGap-Plugin

Github: [Toast-PhoneGap-Plugin](https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin)

### [Feature iOS] Voiceover don't read the popup

On iOS when you use Voiceover and a native Toast, the screen reader don't read the message.
On Android every native Toast is read by talback.
iOs shoud do the same behaviour to improve accessibility.

## Ionic

Github: https://github.com/driftyco/ionic

Already open:
* [bug: Three-finger scroll is not working with VoiceOver in IOS](https://github.com/driftyco/ionic/issues/4100)
* [bug: Sidemenu is inaccessible with VoiceOver in IOS](https://github.com/driftyco/ionic/issues/4099)
* [bug: ion-checkbox doesn't read correctly with iOS voiceover](https://github.com/driftyco/ionic/issues/3153)

### docs: Inline Labels & Stacked Labels

On Android > 5, talkback don't read label's input when it's implicit wrapped.
Is it possible to add attribut id and for on the documentation?

```html
<div class="list">
	<label id="username" class="item item-input">
		<span class="input-label">Username</span>
		<input for="username" type="text">
	</label>
	<label id="password" class="item item-input">
		<span class="input-label">Password</span>
		<input for="password" type="password">
	</label>
</div>
```

### bug: ion-checkbox and ion-toggle is not focusable

With a screen reader the input is not focusable due to `diplay:none` property.

```css
.checkbox.checkbox-input-hidden input {
    display: none !important;
}

.toggle input {
    display: none;
}
```

It's better to only display content to screen readers.


```css
/*
Only display content to screen readers
See: http://a11yproject.com/posts/how-to-hide-content/
*/

.toggle input,
.checkbox.checkbox-input-hidden input {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0,0,0,0);
	border: 0;
}
```

### bug: ion-toggle's label is empty

ion-toggle's label is empty so screen reader doesn't give any information when state change.
A better solution is to wrap the whole directive with a label.


New template:
```html
<label class="item item-toggle">
	<div ng-transclude></div>
	<div class="toggle">
		<input type="checkbox">
		<div class="track">
			<div class="handle"></div>
		</div>
	</div>
</label>
```

### bug: ion-toggle's state can't change on Android 5.0 with talkback

when ion-toggle is focusable, property `pointer-events: none` block event, so the user is not able to change checkbox's state with talkback on android > 5.

Current CSS:
```css
.toggle input {
	display: none;
}
.toggle .track{
	pointer-events: none;
}
```

Quick fix CSS:
```css
.toggle input {
	display: block;
}
.toggle input{
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0,0,0,0);
	border: 0;
}
.toggle .track{
	pointer-events: auto;
}
```

### bug: ion-radio is not focusable on Android > 5

With talkback on Android 5 the input is not focusable due to `left:-9999px` property.
It's a very strange bug in Android...

Current CSS:
```css
.item-radio input {
    position: absolute;
    left: -9999px;
}
```

Quick fix CSS:
```css
.item-radio input {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0,0,0,0);
	border: 0;
}
```

### bug: [ion-radio] radio-icon should not be focusable on Android > 5

With talkback on Android 5 `radio-icon` should not be focusable within ion-radio.
Add aria-hidden="true" to ion-radio's template fix this.

New template:
```html
<label class="item item-radio">
	<input type="radio" name="radio-group">
	<div class="item-content disable-pointer-events" ng-transclude></div>
	<i aria-hidden="true" class="radio-icon disable-pointer-events icon ion-checkmark"></i>
</label>
```

### bug: Android talkback is incompatible with tap & click

With Android Talback all click and tap are catch by ionic to [reduce 300ms delay](http://blog.ionic.io/hybrid-apps-and-the-curse-of-the-300ms-delay/).
So talkback's user can't tap on button, checkbox, radio...

I found a workaround by adding `data-tap-disabled="true"` on body for talkback's user.
I use [phonegap-mobile-accessibility](https://github.com/phonegap/phonegap-mobile-accessibility)'s plugin to change `data-tap-disabled` with the screen-reader status.
And if screen-reader is running, I add `.sr-on` on body.
But using `data-tap-disabled='true'` on the body tag breaks scrolling for the entire app.

To fix scroll, I have made a modification on my CSS:
see: https://github.com/driftyco/ionic/issues/4100#issuecomment-133357036

```css
.sr-on .pane,
.sr-on .scroll-content{
    position: static;
}

.sr-on .scroll-content.has-header > .scroll {
    margin-top: 80px;
}
```

What is the best way to fix this accessibility bug?

Also on ionic's forum: http://forum.ionicframework.com/t/android-talkback-incompatible-with-tap-click/14487


## OnsenUI


### feature: Add an attribute to disable the fastclick library

The use of the FastClick library causes some issues when using screen readers (lke TalkBack on Android) because the click events are not populated to the screen reader.
A solution would be to add an attribute ("disable-fastclick") to allow a developper to disable the library. (The developper will use a Cordova module to detect wheter a a screen reader is running or not, and will thus be able to adjust the "disable-fastclick" attribute value.)


### bug: Text areas, checkboxes, radio buttons not properly rendered by screen readers

The content of text areas, chexkboxes and radio buttons is not properly rendred by screen readers (labels are not spoken).

A solution would be to use a code structure as below, to create a relation between the label and the input element:
```html
  <div class="checkbox">
    <label for="cb2" class="checkbox">Option</label>
    <input id="cb1" type="checkbox" checked="checked"/>
    <div class="checkbox__checkmark"></div>
  </div>
```

### bug: Modals not properly rendered by screen readers

The modals created with "ons-modal" are not properly rendere by screen readers (the content is not spoken).
A solution would be to make the compotonent copliant with the ARIA design pattern:
* Adding a role="dialog" attribute
* Managing the focus whe the dialog opens and closes
* Adding a label
(See the complete requirements: http://www.w3.org/WAI/PF/aria-practices/#modal_dialog ) 
