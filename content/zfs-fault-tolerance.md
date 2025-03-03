---
title: ZFS fault tolerance
date: 2020-07-10T20:34:13-07:00
aliases:
  - 2020/basic-fault-tolerance-in-zfs
  - basic-fault-tolerance-in-zfs
---
## Snapshots
The root directory of a ZFS filesystem contains an invisible folder
`.zfs/`. This differs from a regular "hidden" folder in that it doesn't
show up with `ls -A` and other such operations.[^1]

[^1]: https://unix.stackexchange.com/q/332192

Inside `.zfs/snapshot/`, every available snapshot is represented in a
directory. A snapshot is just a complete representation of the entire
file system as it existed at a particular point in time. So you can
recover an earlier version of something just by pulling it from one of
these snapshots.

I won't go into the details here, but snapshots are very computationally
cheap, unlike if you tried to recreate something like this with *cp*(1)
and *rsync*(1) or whatever. So it's advised to create many of them and
create them often to maximize their usefulness.

Debian has a couple scripts in its official repositories that completely
automate periodically creating new snapshots and removing older ones:
*zfs-auto-snapshot*(8) in `contrib` and `zfsnap` in `main`. Personally,
I use the former.

The *zfs-auto-snapshot*(8) package installs its default cron jobs
automatically, so it's not necessary to configure anything. It does
`frequent` snapshots every 15 minutes (keeping the 4 most recent ones)
and also `hourly`, `daily`, `weekly`, and `monthly` ones. It seems like
`zfsnap` does not come with cron jobs.

## Degraded arrays
In a mirrored layout, ZFS will carry on if a disk fails. Here's what I
did in my testing of this:
```sh
cd data
echo 'This is a file.' > file.txt
cat file.txt
```
```
This is a file.
```
```sh
shutdown -h now
# Unplug one of the hard drives
# Power on
cd data
cat file.txt
```
```
This is a file.
```
```sh
echo 'This is a change I made.' >> file.txt
cat file.txt
```
```
This is a file.
This is a change I made.
```
```sh
shutdown -h now
# Reattach the unplugged hard drive
# Power on
cd data
cat file.txt
```
```
This is a file.
This is a change I made.
```
