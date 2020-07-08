---
title: "One weird trick to debloat apt-based distros"
subtitle: "recommended dependencies bad"
---
In *apt*(1), the package manager for Debian and its derivatives,
packages may have "optional" and "recommended" dependencies. By default,
the recommended dependencies are installed automatically, as if they are
required.

This led to an absurd situation on my minimal server installation of
Devuan. When I went to install `openssh-server`, it wanted to pull in
almost 200MB of other random packages, including a bunch of graphical
desktop packages for X11!

If you don't want these recommended packages, here's how to stop them
from being installed. Create the following file:
```
/etc/apt/apt.conf.d/99_norecommends
```
and add these contents to it.
```
APT::Install-Recommends "false";
APT::AutoRemove::RecommendsImportant "false";
APT::AutoRemove::SuggestsImportant "false";
```
Then do `apt autoremove` to remove already installed recommends.

Just for fun, here's what my `autoremove` prompt looks like after
installing just `openssh-server`, *mosh*(1), and `man-db`:
```
The following packages will be REMOVED:
  adwaita-icon-theme apparmor at-spi2-core bzip2 dbus dbus-x11
  dconf-gsettings-backend dconf-service dictionaries-common efibootmgr
  elogind emacsen-common file fontconfig fontconfig-config
  fonts-dejavu-core glib-networking glib-networking-common
  glib-networking-services grub-efi-amd64-signed
  gsettings-desktop-schemas gtk-update-icon-cache hicolor-icon-theme
  iamerican ibritish ienglish-common ispell krb5-locales libapparmor1
  libatk-bridge2.0-0 libatk1.0-0 libatk1.0-data libatspi2.0-0
  libavahi-client3 libavahi-common-data libavahi-common3
  libcairo-gobject2 libcairo2 libcolord2 libcroco3 libcups2 libdatrie1
  libdbus-1-3 libdconf1 libepoxy0 libfontconfig1 libfribidi0
  libgdk-pixbuf2.0-0 libgdk-pixbuf2.0-bin libgdk-pixbuf2.0-common
  libglib2.0-0 libglib2.0-data libgraphite2-3 libgtk-3-0 libgtk-3-bin
  libgtk-3-common libharfbuzz0b libicu63 libjbig0 libjpeg62-turbo
  libjson-glib-1.0-0 libjson-glib-1.0-common liblcms2-2 libmagic-mgc
  libmagic1 libmpdec2 libpam-elogind libpango-1.0-0 libpangocairo-1.0-0
  libpangoft2-1.0-0 libpixman-1-0 libpolkit-agent-1-0
  libpolkit-backend-1-0 libpolkit-backend-elogind-1-0
  libpolkit-gobject-1-0 libpolkit-gobject-elogind-1-0 libproxy1v5
  libpsl5 libpython3-stdlib libpython3.7-minimal libpython3.7-stdlib
  libreadline7 librest-0.7-0 librsvg2-2 librsvg2-common
  libsoup-gnome2.4-1 libsoup2.4-1 libsqlite3-0 libthai-data libthai0
  libtiff5 libwayland-client0 libwayland-cursor0 libwayland-egl1
  libwebp6 libx11-6 libx11-data libxau6 libxcb-render0 libxcb-shm0
  libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxdmcp6 libxext6
  libxfixes3 libxi6 libxinerama1 libxkbcommon0 libxml2 libxmuu1
  libxrandr2 libxrender1 libxtst6 mime-support os-prober policykit-1
  policykit-1-gnome publicsuffix python3 python3-minimal python3.7
  python3.7-minimal shared-mime-info util-linux-locales wamerican
  x11-common xauth xdg-user-dirs xz-utils
0 upgraded, 0 newly installed, 131 to remove and 0 not upgraded.
After this operation, 211 MB disk space will be freed.
```

https://askubuntu.com/a/399078
