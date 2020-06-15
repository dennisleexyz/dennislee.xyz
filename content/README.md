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
- A URL should never be broken across multiple lines. This rule takes
  precedence over the previous one, if the two conflict.
- Footnotes are another exception to the line break rule, at least for
  now. Netlify's version of Hugo seems to cause problems with this.

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

[links]: https://daringfireball.net/projects/markdown/syntax#link
