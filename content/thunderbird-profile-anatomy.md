---
title: Thunderbird profile anatomy
date: 2020-07-04
aliases: 2020/thunderbird-profile-anatomy
subtitle: "What do I back up when backing up my Thunderbird profile?"
---
These are the folders I save when backing up profiles for Thunderbird
and Thunderbird-based email clients.

Extensions
----------
The following 2 items are sufficient for fully restoring extensions.
```
extensions/
├── example@mozdev.org.xpi
├── {xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}.xpi
└── [[:graph:]]+\.xpi
```
This folder stores extension files for all installed extensions (except
ones which are pre-installed).
```
extensions.ini
```
List of enabled extensions. Human-readable format.

Authentication/logging in
-------------------------
The following 2 files must be combined with a proper `prefs.js` or
`user.js` to fully restore logins.
```
key4.db
```
Server authentication credentials. If you delete this, you will be
prompted to log in to your account(s) again the next time you open the
program, but everything else will remain intact.
```
logins.json
```
Stores information about which accounts are currently logged in.

Mailbox storage
---------------
```
Mail/
└── Local Folders/
```
Folder for locally-stored mail.
```
ImapMail/
├── imap.example.com/
└── mail.example.net/
```
Folder for saving offline copies of mail which is synced with an IMAP
server.

Settings storage
----------------
```
prefs.js
```
Stores all user preferences, including information about accounts. This
file is edited by changing settings from within the graphical
environment.
```
user.js
```
Can store any user preference, but values defined here will always take
precedence over those stored in `prefs.js` when the program is started.
