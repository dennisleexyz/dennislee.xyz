---
title: Hugo date/slug from filename à la Jekyll
date: 2020-06-24T17:31:49-07:00
aliases:
  - 2020/hugo-jekyll-style-date-and-slug-from-filename
  - hugo-jekyll-style-date-and-slug-from-filename
  - hugo-date-and-slug-from-filename-a-la-jekyll
subtitle: BTFOing all of my problems with Hugo!
---
OK, so this is now the 3rd post in this saga about automatic Hugo front
matter from filenames. This supersedes my [[jekyll-vs-hugo|1st]] and [[change-hugo-automatic-title-and-slug|2nd]] posts on
the subject.

I now have exactly the behavior of Jekyll, where you name files in the
format `YYYY-MM-DD-title-slug.md` and the post date is automatically
detected as `YYYY-MM-DD` and the slug as `title-slug`. *Without*
explicitly specifying any extra front matter in each individual post!
Here's how:
```toml
# config.toml
[frontmatter]
	date = [":filename", ":default", ":fileModTime"]
```
The important piece is the initial `":filename"`. This is what enables
the behavior described above. If it doesn't work, it falls back on the
subsequent options. `":default"` is a shortcut for the default detection
behavior.

I've also added `":fileModTime"` as the last option which
is exactly what it sounds like. I have it last because in my experience,
while it's better than nothing, the file system is not quite trustworthy
for determining when you actually last modified a file. Sometimes just
moving between file systems and storage formats, or having some program
open it in write mode without actually making any changes can trigger
it.

***Source:** [Configure Hugo | Hugo]*

[Configure Hugo | Hugo]:
https://gohugo.io/getting-started/configuration/#configure-front-matter
