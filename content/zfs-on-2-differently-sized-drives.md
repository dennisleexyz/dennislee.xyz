---
title: ZFS on 2 differently sized drives
date: 2020-07-08
aliases: 2020/zfs-on-2-differently-sized-drives
subtitle: for dummies
---
This is how I set up a mirrored [ZFS][] file system on a system with one 500
GB HDD and one 250 GB HDD.

[ZFS]: https://openzfs.github.io/openzfs-docs/Project%20and%20Community/

At this point, I have done the following:
- Install the latest stable version of [Devuan][] to half of the 500 GB
  drive.
- Create a 250 GB partition (the size of the other drive) covering the
  rest of the 500 GB drive.
- [Install ZFS][].

[Devuan]: https://devuan.org/
[Install ZFS]: https://openzfs.github.io/openzfs-docs/Getting%20Started/

```sh
lsblk -o NAME,FSTYPE,SIZE,TYPE,MOUNTPOINT
```
```
NAME   FSTYPE   SIZE MOUNTPOINT
sda           465.8G
├─sda1 vfat     512M /boot/efi
├─sda2 btrfs    229G /
├─sda3 swap     3.5G [SWAP]
└─sda4 ext4   232.9G
sdb           232.9G
└─sdb1 ext4   232.9G
```
Optional: you can *wipefs*(8) to remove the file system information (but
not data) from the 250 GB partition and disk. The setup will work
whether or not you do this.
```sh
sudo wipefs /dev/sda4
sudo wipefs -a /dev/sdb
lsblk -o NAME,FSTYPE,SIZE,TYPE,MOUNTPOINT
```
```
NAME   FSTYPE   SIZE MOUNTPOINT
sda           465.8G
├─sda1 vfat     512M /boot/efi
├─sda2 btrfs    229G /
├─sda3 swap     3.5G [SWAP]
└─sda4        232.9G
sdb           232.9G
```
Before creating the ZFS pool, find the unique IDs of the relevant
drives. Don't use those short identifiers with the letters (`/dev/sdX`)
because the system might assign them differently on a future reboot.
```sh
ls -ls /dev/disk/by-id/ | awk '{print $10,$11,$12}'
```
```
ata-HGST_HTS725050A7E630_TF755AWHHA2J9M -> ../../sda
ata-HGST_HTS725050A7E630_TF755AWHHA2J9M-part1 -> ../../sda1
ata-HGST_HTS725050A7E630_TF755AWHHA2J9M-part2 -> ../../sda2
ata-HGST_HTS725050A7E630_TF755AWHHA2J9M-part3 -> ../../sda3
ata-HGST_HTS725050A7E630_TF755AWHHA2J9M-part4 -> ../../sda4
ata-ST250DM000-1BD141_5VY93J76 -> ../../sdb
wwn-0x5000c5005ce4e07d -> ../../sdb
wwn-0x5000cca77fd2acb2 -> ../../sda
wwn-0x5000cca77fd2acb2-part1 -> ../../sda1
wwn-0x5000cca77fd2acb2-part2 -> ../../sda2
wwn-0x5000cca77fd2acb2-part3 -> ../../sda3
wwn-0x5000cca77fd2acb2-part4 -> ../../sda4
```
Apparently there are 2 sets of IDs linked to the same disks. I'll just
show the `wwn-` ones because they're shorter.

The following creates a mirrored `zpool` (software RAID, basically)
named `tank` with the 250 GB partition and disk.
```sh
sudo zpool create tank mirror wwn-0x5000cca77fd2acb2-part4 wwn-0x5000c5005ce4e07d
lsblk -bo NAME,FSTYPE,SIZE,TYPE,MOUNTPOINT
```
```
NAME   FSTYPE             SIZE TYPE MOUNTPOINT
sda               500107862016 disk
├─sda1 vfat          536870912 part /boot/efi
├─sda2 btrfs      245809283072 part /
├─sda3 swap         3700424704 part [SWAP]
└─sda4 zfs_member 250059350016 part
sdb               250059350016 disk
├─sdb1 zfs_member 250049724416 part
└─sdb9                 8388608 part
```
ZFS will automatically mount `tank` to `/tank` (persisting across
reboots), but there are options to change the mount point or handle
mounting manually with `fstab`, *mount*(8), *umount*(8) and such. When
I create the `data` file system inside `tank`, I will change its mount
point. `data` doesn't have to be mounted inside of `tank`'s mount point,
as you will see.
```sh
sudo zfs create tank/data
sudo zfs set mountpoint=/home/dennis/data tank/data
sudo zfs get mountpoint tank/data
```
```
NAME       PROPERTY    VALUE              SOURCE
tank/data  mountpoint  /home/dennis/data  local
```
At this point, `/home/dennis/data` will be owned by `root:root`, which
is probably not desired (I mounted it inside my `~` for a reason!).
Let's fix that.
```sh
cd /home/dennis
sudo chown -R dennis:dennis data
ls -l
```
```
drwxr-xr-x 2 dennis dennis 2 Jul  8 20:36 data/
```
