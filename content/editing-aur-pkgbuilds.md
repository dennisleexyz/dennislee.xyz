---
title: Editing AUR PKGBUILDs
date: 2020-06-21T22:23:41-07:00
aliases:
  - 2020/a-real-world-example-of-editing-arch-linux-aur-pkgbuilds
  - a-real-world-example-of-editing-arch-linux-aur-pkgbuilds
subtitle: Real world example
---
I recently installed [Interlink][] from the [AUR][]. I'll be writing
about the choice of email client in a future post, but this post is
about how I dealt with the broken [AUR package for Interlink][] and how
you can deal with broken AUR packages in general.

[Interlink]: https://binaryoutcast.com/projects/interlink/
[AUR]: https://aur.archlinux.org/
[AUR package for Interlink]:
https://aur.archlinux.org/packages/interlink-bin/

### The Problem ###

First I tried just a simple `yay -S interlink-bin`, but that gave me
this:
```
curl: (22) The requested URL returned error: 404 Not Found
==> ERROR: Failure while downloading http://repository.binaryoutcast.com/projects/interlink/releases/latest/interlink-52.9.7433.linux-x86_64-gtk3.tar.xz
```
Ok, so it tried to download a file that doesn't exist. It gives us the
path to the file, so I went to [the file's parent folder][] to see if I
could figure out what the problem was. It appears that the developer has
released version *52.9.7463*, and **removed** *52.9.7433*, the one we
were looking for! I flagged the package as "Out of Date" on the AUR
page.

[the file's parent folder]:
http://repository.binaryoutcast.com/projects/interlink/releases/latest/

### The Solution ###

I use *yay* as an [AUR helper][]. It has an option called `--editmenu`,
which gives you the option to edit the [PKGBUILD][] before installing.
Let's try it:
```
yay -S interlink-bin --editmenu
```
---
```sh
pkgver=52.9.7433
source_x86_64=("http://repository.binaryoutcast.com/projects/interlink/releases/latest/interlink-$pkgver.linux-x86_64-gtk3.tar.xz")
```
OK, so we just have to fix the `pkgver` and it'll grab the right file!
```
==> Validating source_x86_64 files with sha256sums...
    interlink-52.9.7463.linux-x86_64-gtk3.tar.xz ... FAILED
==> ERROR: One or more files did not pass the validity check!
```
Oh. OK, how about we just delete the `sha256sums` and
`sha256sums_x86_64` checksums from the file. That way, it can't fail
because there's nothing to check, right?
```
==> ERROR: Integrity checks are missing for: source_x86_64 source
```
Oh. So, is there a way to tell it to skip [integrity checks][] on the
downloaded file? Turns out, there is.[^1]
```sh
sha256sums=('SKIP')
sha256sums_x86_64=('SKIP')
```

[PKGBUILD]: https://wiki.archlinux.org/index.php/PKGBUILD
[AUR helper]: https://wiki.archlinux.org/index.php/AUR_helpers
[integrity checks]:
https://wiki.archlinux.org/index.php/PKGBUILD#Integrity

And with that, the package installs!

[^1]: [Creating Packages For The Arch User Repository (AUR) - DistroTube - Invidious](https://invidio.us/watch?v=iUz28vbWgVw&t=581)
