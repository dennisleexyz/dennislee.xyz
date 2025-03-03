---
title: Suckless software howto
date: 2020-06-27T22:27:32-07:00
aliases:
  - 2020/guide-to-suckless-software
  - guide-to-suckless-software
subtitle: What's the deal with all these config files?
---
How do you download, patch, configure, and install suckless software?

## Downloading
Released versions are listed for download under the homepage for each
program. These download links are also provided on the suckless homepage
and news (RSS/Atom) feed when they announce the release of a new
version.

Programs can also be downloaded via `git clone`, for the latest
development versions and for version control history. See
https://git.suckless.org/.

## Patching
Find and download patches on the suckless website listed under each
program. The commands and strategies below are discussed in order of
preference.

### *git*(1) commands
This section assumes that you downloaded the program's source code as a
*git*(1) repository (which is recommended), using `git clone` or
similar. If not, skip to the next section.

First, try using
```sh
git am <patch>.diff
```
to apply a patch and commit it automatically. This only works with
patches that were formatted for/with *git*(1), though. Unfortunately,
that's not the case for all of the patches, so if `git am` fails, try
```sh
git apply <patch>.diff
```
which will apply the patch and stage the changes.

To reverse a patch, use
```sh
git reset --hard HEAD^
```
if the patch was commited. (This is the case if you ran `git am` or
commited manually.) If the patch was not commited (you used
`git apply` and did not commit manually), use the following.
```sh
git revert .
```

### *patch*(1) commands
This is only recommended if you cannot use the *git*(1) commands (as
mentioned above).

Use the following. The `--merge` flag on *patch*(1) is to handle
conflicts more easily (in the same way as *git*(1) handles conflicts).
```sh
patch -i --merge <patch>.diff
```

## Configuration
There are 3 files named `config`. What are the differences?

### `config.mk`
Configuration for the Makefile. The `.mk` extension/suffix denotes
Makefile syntax, for a file meant to be `include`d in a Makefile.

### `config.def.h`
Stores ***def***ault values for all of the configuration options; a
template. Often modified by patches; they add the default values for
their own custom config options to this file. Used to generate `config.h`.

### `config.h`
Intended to be edited by the end user: they provide their own values for
each of the configuration options. If it does not exist, it is copied
from `config.def.h` when running `make`/`make all`.

However, if it does exist, it is not modified. This can cause problems
when applying patches after `config.h` is already generated. The program
is built from `config.h`, not `config.def.h`, so after applying the
patch you may not have the config options required by the patch. In that
case, compilation will fail with errors!

## Installing
Programs are installed by running *make*(1) targets, which are defined
in the `Makefile`.

To compile, run `make` or `make all`. This will
output the compiled program to the current working folder, where it can
be run; if I compiled *st*(1), I could run it with `./st`.

Installing a program makes it available from anywhere, not just a single
directory, and makes it available to all users. Run `sudo make install`
to install.

If you do not have administrative privileges, you may want to (instead
of installing) place the compiled executable somewhere in your `$PATH`
so that the program can be started easily from any location.
