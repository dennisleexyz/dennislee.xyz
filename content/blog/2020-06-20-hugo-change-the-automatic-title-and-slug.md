---
title: "Hugo: change the automatic title and slug!"
subtitle: "Archetypes in Hugo"
date: 2020-06-20T18:09:55-07:00
slug: "hugo-change-the-automatic-title-and-slug"
---
In [a previous post] I complained about the format to automatically
generated titles and slugs in Hugo.

[a previous post]:
/2020/friendship-ended-with-jekyll-now-hugo-is-my-best-friend/

> Hugo makes me specify title and date manually, even when using the
aforementioned format. And if I want punctuation in my title (like
in this post), I even have to specify the *slug* manually, because
otherwise it auto-generates the slug *with the punctuation intact*!

But what I didn't know was that you can actually customize this! There
is this optional folder in either your theme's or your site's root
folder called `/archetypes/` (the latter takes precedence over the
former) where the default [front matter][] is stored. Here's what my
`/archetypes/default.md` looks like now:

[front matter]: https://gohugo.io/content-management/front-matter/

```
---
title: "{{ replaceRE "[[:^alpha:]]" " " .Name | humanize }}"
date: {{ .Date }}
slug: "{{ replaceRE "[[:^alpha:]]" "-" .Name | replaceRE "-{2,}" "-" | replaceRE "^-" "" | lower }}"
---

```

The `title: `[template][] (using [regexp][]) replaces any non-alphabetic
character in the filename with a space, then [pipes][] the result into
the [humanize][] function to use sentence case. Hugo seems to trim
extra leading whitespace automatically, so that is not accounted for
here.

[template]: https://gohugo.io/templates/introduction/
[regexp]: https://github.com/google/re2/wiki/Syntax
[pipes]: https://en.wikipedia.org/wiki/Vertical_bar#Pipe
[humanize]: https://gohugo.io/functions/humanize/

For the slug, every non-alphabetic character is replaced with `-`. Then,
sequences of 2 or more `-` are replaced with a single `-`. Then, a
leading `-` is replaced with nothing. Finally, all letters are converted
to lowercase.

That's all for now. Don't worry, the next post will actually be about
something other than Hugo!
