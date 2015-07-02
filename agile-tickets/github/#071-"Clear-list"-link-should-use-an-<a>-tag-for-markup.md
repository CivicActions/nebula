# #71: &quot;Clear list&quot; link should use an &lt;a&gt; tag for markup

* Source: https://github.com/CivicActions/nebula/issues/71
* Created by: grugnog
* Created at: 2015-06-29T18:10:29Z
* Updated at: 2015-06-30T15:12:29Z
* Closed at: 2015-06-30T15:12:29Z


## Comment

* Source: https://github.com/CivicActions/nebula/issues/71
* Commented by: grugnog
* Created at: 2015-06-29T18:10:29Z
* Updated at: 2015-06-30T15:12:29Z

This is currently a clickable div, which is hard for many assistive technology tools to detect/present as something that is &quot;clickable&quot;. I recommend making this an <a> tag instead.

If this is hard to style or connect to the JS functionality, the alternative would be to make sure the div is focusable, provide the necessary ARIA role and ensure it has a keystroke handler (not just click).
http://www.456bereastreet.com/archive/201302/making_elements_keyboard_focusable_and_clickable/
https://www.marcozehe.de/2013/04/24/easy-aria-tip-6-making-clickables-accessible/


</a>