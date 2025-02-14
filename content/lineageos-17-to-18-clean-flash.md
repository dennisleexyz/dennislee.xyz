---
title: "LineageOS 17 to 18 clean flash"
date: 2021-08-05T19:31:39-07:00
aliases: 2021/lineageos-17-to-18-clean-flash
---
I recently updated my OnePlus One from LineageOS with microG version 17
(Android 10) to version 18 (Android 11). Dirty flashing the new system on top
of my existing data resulted in a bootloop, so I had to wipe everything and
clean flash it.

Also, apparently Magisk's install process has changed since I last installed
it. Now instead of just flashing the zip on top right after installing the ROM
in recovery, you have to extract the boot.img from the ROM zip, patch it from
the Magisk app in userspace, then flash the patched boot image in recovery.

Data Transfer
-------------
First I updated my system to the latest LineageOS 17.1 released in March before
the first 18.1 builds started coming. I hadn't been keeping up with these
updates because the automatic install wasn't working and it was annoying to do
it manually (especially since the updater downloads the ROM zips to /data, not
sdcard), but it worked this time. I had just installed the latest TWRP 3.5 and
maybe that had something to do with it (I don't use Lineage Recovery due to a
lack of functionality).

I installed a newer 17.1 before going to 18.1 in order to use the new SeedVault
backup and restore system. SeedVault was made by CalyxOS which is more hardened
than LineageOS. Unfortunately my device doesn't support Calyx but I want to get
one that does (or a PinePhone) when my current one finally becomes unusable.
SeedVault uses the exact same API as Google's proprietary system that backs up
to Google Drive, but it stores backups to either local storage (internal or
external) or Nextcloud.

After I restored the SeedVault backup onto the new install I also had to
restore manual backups from Contacts and Signal using their respective built-in
backup and restore functionality at the app level. It seems like the contacts
storage implementation changed between these particular system versions, so
maybe I won't have to do that part next time.

I also made and will continue using oandbackups (only user apps, and only data,
to save space), because some apps like to exclude themselves from being backed
up using Google's APIs which is inconvenient. However these don't necessarily
always work either, for example with Fennec (Firefox) and some things with
cryptographic security like the aforementioned Signal. In the past I also had
issues with andOTP's secure 2-factor authentication storage, but with pass-otp
these are handled just like my regular password manager storage. For Fennec
just sign in to sync, for other apps use their export/import functions if they
exist. Also make a full Nandroid backup any time you're about to wipe your data
just in case you need to go back for something. (And delete any downloaded
updates from the LineageOS updater before this, or they will waste space in
your Nandroid!)

I used to use Slight backup from F-Droid for call logs and SMS/MMS messages,
but SeedVault did the trick there no problem.
