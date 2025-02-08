---
draft: true
---
Style Guide
===========
For maximum compatibility, syntax elements should not be broken across
multiple lines.

Line Breaks
-----
- Lines should not exceed 72 characters in width.
- A URL or preformatted (code) chunk should never be broken across
  multiple lines. This rule takes precedence over the previous one, if
  the two conflict.
- Footnotes, unlike link references, must not have an empty first line.

Headers
-------
- [Headers][] are preceded by a blank line, except at the beginning of a
	file or immediately after [front matter][].
- H1 is reserved for the site-wide title, and H2 is reserved for the
  page title, when applicable. In our case, they are provided
  automatically by Hugo via front matter.
- Therefore, in practice, the first two levels of heading will rarely be
  used in actual Markdown source. But if they are, use setext-style
  headers.
- Never skip header levels.
- "Close" atx-style headers with matching hashes.

[Headers]: https://daringfireball.net/projects/markdown/syntax#header
[front matter]: https://gohugo.io/content-management/front-matter/

Lists
-----
- Use `-` for unordered [lists][], in accordance with the syntax of
  [YAML][].
- Wrap list items with hanging indents. Vim/Neovim do this
  automatically.

[lists]: https://daringfireball.net/projects/markdown/syntax#list
[YAML]: https://yaml.org/

Emphasis
--------
- [Emphasis][] is done with ***asterisks***, for portability/safety.

[Emphasis]: https://daringfireball.net/projects/markdown/syntax#em

Links
-----
- Use reference-style [links][].
- Separate links should be separated by one or more non-whitespace
  characters.
- A block of link references should be separated by a blank line on both
  sides.

[links]: https://daringfireball.net/projects/markdown/syntax#link
