# 20210409

Started with empty script and empty src delivered using jsdelivr.com to a bookmarklet.

It will only work with certain sites e.g google.com.

When sites explicitly set content security policy like github using the headers, the scripts and styles will not be loaded.

```text
Refused to load the stylesheet 'https://cdn.jsdelivr.net/gh/mmhan/minima/css/main.css' because it violates the following Content Security Policy directive: "style-src 'unsafe-inline' github.githubassets.com". Note that 'style-src-elem' was not explicitly set, so 'style-src' is used as a fallback.

Refused to load the script 'https://cdn.jsdelivr.net/gh/mmhan/minima/script.js' because it violates the following Content Security Policy directive: "script-src github.githubassets.com". Note that 'script-src-elem' was not explicitly set, so 'script-src' is used as a fallback.
```

# 20210416

Migrated code from new repository to a fork of old repository and cleaned up code to submit pull request for
simple implementation of bookmarklet.

Included webpack into the build pipeline and refactored code so that minima will work with plugin based approach.
