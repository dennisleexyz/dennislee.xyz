---
title: Shell prompt with exit code color
date: 2025-03-02T05:01:26.710Z
---
I believe this is what they call "prompt engineering".

<code style="display:grid">
	<span>
		<b><font color="green">username@hostname</font></b><font color="gray">:</font><b><font color="blue">~/pwd</font></b>
		rm /
	</span>
	<span>
		rm: cannot remove '/': Is a directory
	</span>
	<span>
		<b><font color="green">username@hostname</font></b><font color="red">:</font><b><font color="blue">~/pwd</font></b>
		^C
	</span>
	<span>
		<b><font color="green">username@hostname</font></b><font color="#af5f00">:</font><b><font color="blue">~/pwd</font></b>
	</span>
</code>

I set the color of the colon `:` to the [8-bit color](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit) corresponding to the [Exit status](https://en.wikipedia.org/wiki/Exit_status) of the last executed command (`$?`). `0` is success, which maps to black, which is usually the background color, which makes it invisible until copied and pasted somewhere else. Any other value (`1-255`) makes it visible.

Everything else is pretty basic.

## bash

<code>
PS1='<b><font color="green">\[\e[1;32m\]\u@\h</font></b><font color="gray">\[\e[38;5;$?m\]:</font><b><font color="blue">\[\e[34m\]\w\[\e[0m\]</font></b> '
</code>

You might see `\033` for octal character `33` instead of `\e` for escape. Hexadecimal `\x1b` and decimal `\27` didn't work.

The outer enclosing square brackets `\[\]` around each escape sequence may appear to be optional at first, but after testing, I found that omitting them causes weird behavior.

## zsh

<code>
PS1='<b>%B<font color="green">%F{green}%n@%m</font></b>%b<font color="gray">%F{%?}:</font><b>%B<font color="blue">%F{blue}%~%f</font></b>%b '
</code>

---

|                                                   | bash[^1]      | zsh[^2]     |            |
| ------------------------------------------------- | ------------- | ----------- | ---------- |
| Start boldface mode<br>Set foreground color green | `\e[1;32m`    |             |            |
| Start boldface mode                               |               | `%B`        |            |
| Set foreground color green                        |               | `%F{green}` |            |
| username of the current user                      | `\u`          | `%n`        | `username` |
| literal `@` character                             | `@`           | `@`         | `@`        |
| hostname up to the first '.'.                     | `\h`          | `%m`        | `hostname` |
| stop boldface mode                                |               | `%b`        |            |
| Set foreground color `$?`                         | `\e[38;5;$?m` | `%F{%?}`    |            |
| literal `:` character                             | `:`           | `:`         | `:`        |
| Set foreground color blue                         | `\e[34m`      | `%F{blue}`  |            |
| `$PWD` with `$HOME` replaced by a '~'.            | `\w`          | `%~`        | `~/pwd`    |
| All attributes become turned off                  | `\e[0m`       |             |            |
| stop using a different foreground color           |               | `%f`        |            |
| stop boldface mode                                |               | `%b`        |            |
| literal space character                           | ` `           | ` `         | ` `        |

[^1]: https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#Controlling-the-Prompt
[^2]: [`man zshmisc`](https://linux.die.net/man/1/zshmisc)