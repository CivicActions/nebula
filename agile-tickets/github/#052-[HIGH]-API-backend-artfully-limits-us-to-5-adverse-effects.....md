# #52: [HIGH] API backend artfully limits us to 5 adverse effects....

* Source: https://github.com/CivicActions/nebula/issues/52
* Created by: RobertLRead
* Created at: 2015-06-27T01:47:24Z
* Updated at: 2015-06-27T21:19:39Z
* Closed at: 2015-06-27T21:19:39Z


## Comment

* Source: https://github.com/CivicActions/nebula/issues/52
* Commented by: RobertLRead
* Created at: 2015-06-27T01:47:24Z
* Updated at: 2015-06-27T21:19:39Z

Or so I interpret this code. This is a big mistake, because I am sure doctors will want to know of unusual adverse events, and we have specifically designed the GUI to allow a long vertical scrolling successfully.

 $response = $client-&gt;get(&apos;https://api.fda.gov/drug/event.json&apos;, [
    &apos;query&apos; =&gt; [
      &apos;api_key&apos; =&gt; &apos;rv4OOon6fPJOHBbFHClUOs3BRGSbAEUdg3ACp2pu&apos;,
      &apos;search&apos; =&gt; $med,
      &apos;limit&apos; =&gt; 5,
      &apos;count&apos; =&gt; &apos;patient.reaction.reactionmeddrapt.exact&apos;]
  ]);



