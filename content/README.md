---
draft: true
---
Style Guide
===========

Line Breaks
-----
- Lines should not exceed 72 characters in width.
- A URL should never be broken across multiple lines. This rule takes
  precedence over the previous one, if the two conflict.

Headers
-------
- [Headers][] are preceded by a blank line, except at the beginning of a
	file or immediately after [front matter][].
- Use setext-style headers when possible (for the first two levels of
  headers).
- H1 should only be used for the title of a page, unless the page has
  no title. Hugo provides the title automatically via front matter.
- "close" atx-style headers with matching hashes.

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
