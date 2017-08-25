---
title: "Writing Validation Tests with Scripts"
layout: page
cat: "ug-0-8"
id: "writing-validation-tests-with-scripts"
menus: [ "users", "user-guide", "0.8" ]
---

For those who do want to write validation tests with Java, it is possible to
use scripts instead. The idea is to launch the DM from your scripts, and then
use the REST API to perform operations.

Assertions will be managed in the scripts too.  
Such a script may look like...

```bash
# Launch the DM in background
./karaf &
echo $! > pid

# Perform REST requests
curl ...

# Check assertions...

# Kill the DM in a clean way
./client -u karaf "logout"
rm -f pid
```

Roboconf's REST API is documented in the [developer guide](../developer-guide/developer-guide.html).  
Notice than there are alternatives to this solution.  
They are listed on the [tooling](all-the-tools.html) page.
