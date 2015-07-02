# #70: Drug entry text field missing label

* Source: https://github.com/CivicActions/nebula/issues/70
* Created by: grugnog
* Created at: 2015-06-29T18:01:26Z
* Updated at: 2015-06-30T14:59:05Z
* Closed at: 2015-06-30T14:59:05Z


## Comment

* Source: https://github.com/CivicActions/nebula/issues/70
* Commented by: grugnog
* Created at: 2015-06-29T18:01:26Z
* Updated at: 2015-06-30T14:59:05Z

This has placeholder text, but not all assistive technology will make that text accessible to users. We should add a label associated with the field that indicates what should be entered (e.g. http://webaim.org/techniques/forms/controls#input).

We have a couple of options:
* We could visually hide the label - this will not affect the design, but will still provide the text for screen readers. For working style see .visually-hidden class on http://cgit.drupalcode.org/drupal/tree/core/modules/system/css/system.module.css#n321 (note that  display:none won&apos;t work for this).
* We could add a visible label to the left of the field, and make the placeholder more of an &quot;example&quot; drug name, which I think is a more typical usage.

I think the latter is slightly preferable from an accessibility perspective (since there is less cognitive demand due to the placeholder label disappearing once you click on the text box), however given that it is a very simple single field form I don&apos;t think there is a major difference.


## Comment

* Source: https://github.com/CivicActions/nebula/issues/70#issuecomment-116784389
* Commented by: rakanowicz
* Created at: 2015-06-29T18:24:08Z
* Updated at: 2015-06-29T18:24:08Z

I like the hidden label and adding an &quot;example&quot; drug. 


