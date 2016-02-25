---
title: "Configuring Probes for the Autonomic"
layout: page
cat: "ug-last"
id: "configuring-probes-for-the-autonomic"
menus: [ "users", "user-guide" ]
---

Automatic reactions designate the actions undertaken by the DM (the autonomic
engine to be precise) when events and alarms are emitted by agents. What is done
when conditions are met **must** be defined in a 
[Roboconf commands](roboconf-commands.html) file. 

These files use a sub-set of the 
[Drools](https://docs.jboss.org/drools/release/5.2.0.Final/drools-expert-docs/html/ch05.html#d0e2777)'s syntax.  
Single-line comments can start with `#` or with `//` (C-style).  
Multi-line comments are enclosed between `/*` and `*/`.

The global structure of a rule is...

<pre><code class="language-roboconf-rules">rule "name"
	attributes
	when
		event name
	then
		list of command files
end
</code></pre>

Rule files must be located under the **rules.autonomic** directory of the application (template)'s directory.
One rule, one file. The rule name **must** match the file name. the file extension is **.drl** (the same than Drools rules).

Therefore, the following rule should be defined...

<pre><code class="language-roboconf-rules">rule "scale"
	when
		cpuIsTooHigh
	then
		replicateMachine
end
</code></pre>

... in the **scale.drl** file.


## Examples

The following rule indicates that when the *cpuIsToHigh* event arises,
the *replicateMachine* command file will be executed.

<pre><code class="language-roboconf-rules">rule "basic-scale"
	when
		cpuIsTooHigh
	then
		replicateMachine
end
</code></pre>

It is possible to execute (sequentially) several command files.

<pre><code class="language-roboconf-rules">rule "stronger-scale"
	when
		cpuIsTooHigh
	then
		replicateMachine;
		replicateThis
		replicateThatToo
end
</code></pre>

Commands refer to the name of a commands file (without the extension).  
They can be separated by a colon or by a new line.


## Attribute: sleep period is

This attribute allows to define a delay between which this rule will not be fired
again. A rephrasing can go as the following scenario:

1. A combination of events results in the activation of a rule called "r".
2. This rule defines its sleep period as 120 seconds.
3. 30 seconds later, the combination of triggering events appears again.  
But since the rule was already activated and that the sleep delay is not over,
the rule will not be executed.
4. Five minutes later, the right combination is again appearing. Since the sleep
period is over, the rule can be executed again.

The sleep period can be seen as the period necessary for the rule (and the associated
commands) to produce the required effects. Such a period is defined as follows...

<pre><code class="language-roboconf-rules">rule "basic-scale"
sleep period is 50s
when
	cpuIsTooHigh
then
	replicateMachine
end
</code></pre>

> This attribute does not come from Drools's ones.  
> It may be replaced later if a better name is found.

Notice the time unit is in seconds.  
It is optional. It means you can write `sleep period is 50s` or `sleep period is 50`.

When not specified, there is no delay between execution.  
Also, notice that a given combination of events only trigger a rule one. Then, only a new
event can trigger this rule.


## Attribute: time window is

> The time window is an anticipation of a future feature upgrade.  

For the moment, a single event triggers the activation of a rule.  
Later, it will be possible to define combination of events (this one and that one,
etc). The time window is a period, measured in seconds, during which we consider the events
that can trigger a rule.

As an example...

<pre><code class="language-roboconf-rules">rule "basic-scale"
time window is 120s
when
	cpuIsTooHigh
	freeMemoryIsRunningOut
then
	replicateMachine
end
</code></pre>

... implies that the *cpuIsToHigh* and *freeMemoryIsRunningOut* events
must be both received during a period of 120 seconds. If they are separated
by a period longer than the timing window, then the rule will not be activated.

> This attribute does not come from Drools's ones.  
> It may be replaced later if a better name is found.

Notice the time unit is in seconds.  
It is optional. It means you can write `time window is 120s` or `time window is 120`.

When not specified, there is no timing window.  
Any new event that trigger the rule will be considered.
