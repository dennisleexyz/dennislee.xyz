---
date: 2025-03-21T00:48:42.046-07:00
title: Shebangs
---
- The only FHS paths for executables that NixOS populates by default are `/bin/sh` and `/usr/bin/env`.
- `#!/usr/bin/env` is one of the shebangs [Python][] builds in support for on Windows.

[Python]: https://docs.python.org/3/using/windows.html#shebang-lines

However, multiple arguments (such as in `#!/usr/bin/env awk -f`) may be problematic due to, in this case, the entire `awk -f` being treated as a single argument. [GNU coreutils 8.30][] (2018) added the `env -S` to split multiple parameters, so `#!/usr/bin/env -S awk -f` will execute `awk -f` as intended. This had already been present in [FreeBSD][] (since 6.0; 2005) and macOS versions. But it's not [POSIX][], and not in [NetBSD][], [OpenBSD][], [BusyBox][], [Heirloom][].

[GNU coreutils 8.30]: https://lists.gnu.org/archive/html/info-gnu/2018-07/msg00001.html
[FreeBSD]: https://man.freebsd.org/cgi/man.cgi?query=env
[POSIX]: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/env.html
[NetBSD]: https://man.netbsd.org/env.1
[OpenBSD]: https://man.openbsd.org/env
[BusyBox]: https://busybox.net/downloads/BusyBox.html
[Heirloom]: https://heirloom.sourceforge.net/man/env.1.html

I've written things like `#!/bin/awk -f` in the past, but due to my use of NixOS I thought to move to `#!/usr/bin/env -S` despite its incompatibility with some other platforms. I imagine a certain hat-and-sunglasses-wearing blue whale telling me off for this, should he ever read this post. However, I did end up finding some other more portable solutions suggested. This is the one I ended up going with, e.g. in [allegro][]:

[allegro]: https://github.com/dennisleexyz/allegro/blob/master/pp/csv

```sh
#!/bin/sh  
exec awk "$(sed 1,2d "$0")" "$@"  
# ex: ft=awk
```

## Further reading

- https://stackoverflow.com/questions/1418245/invoking-a-script-which-has-an-awk-shebang-with-parameters-vars
- https://stackoverflow.com/questions/4303128/how-to-use-multiple-arguments-for-awk-with-a-shebang-i-e
- https://unix.stackexchange.com/questions/399690/multiple-arguments-in-shebang