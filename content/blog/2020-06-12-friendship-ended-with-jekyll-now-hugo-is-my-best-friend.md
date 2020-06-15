---
title: "Friendship ended with Jekyll. Now Hugo is my best friend!"
date: 2020-06-12T11:59:23-07:00
slug: friendship-ended-with-jekyll-now-hugo-is-my-best-friend
---
The first version of this site used [Jekyll][] as a static site
generator, but now I'm using [Hugo][].

[Jekyll]: https://jekyllrb.com/
[Hugo]: https://gohugo.io/

### Why? ###
Here are some reasons why I switched to Hugo (and why I like it more
than Jekyll) in no particular order:

#### Build Dependencies ####
When using Jekyll, you have to pull in all of
these different packages using [RubyGems][], a package manager for
[Ruby][]. Dare I say... *bloat*? In contrast, Hugo is just a single
package, with an optional dependency for syntax
highlighting code blocks (in pure HTML[^1])!

[RubyGems]: https://rubygems.org/
[Ruby]: https://www.ruby-lang.org/

And this isn't just a speed concern either (although it is, having to
download a bunch of large packages before being able to do *literally
anything*). Having so many dependencies very often put me in
*[dependency hell][]* when working with things like templates and
plugins and themes from different sources.  Oh, and speaking of themes:

[dependency hell]: https://en.wikipedia.org/wiki/Dependency_hell

#### Themes ####
The way Hugo handles theming is far saner than the way Jekyll does. In
Jekyll, you use either the default [minima theme][] or install a
different one (via RubyGems), and then if you want to customize parts of
the theme, you place modified versions of the relevant files locally in
your site which then take precedence over the default ones. But if
you're installing the theme in packaged form, where are the files that
you're basing your edits on?

[minima theme]: https://jekyll.github.io/minima/

In contrast, Hugo themes are always just a subfolder of `/themes/`. So
just go there and make your edits with the full context around you.
Without the pointless separation between source and packaged forms, the
separation between user-specific and general data is far easier to
achieve and mantain.

#### Speed ####
The build process with Hugo is just faster. Chad compiled
language vs. virgin interpreted language.

#### Naming/Organization ####
The names of all of the important files and
folders in Jekyll all begin with a leading `_`, like `_config.yml`. I
don't know how someone ever thought this was a good idea. Maybe
they needed to make them stand out because there's too much stuff that
goes in the root folder (up to 6 or so files for the package
management alone, in some extreme cases!), plus the favicon and any page
that doesn't belong in `/_posts/`).

Anyway, Hugo has none of the above problems (all pages go
in `/content/`, favicon in `/static/`,...).

#### blogdown ####
I recently found out about this thing called [blogdown][], which
generates webpages from [R Markdown][]. It has some support for Jekyll
and [Hexo][], but mostly targets Hugo. I don't know if I'll actually use
this, but it's nice to know I have the option.

[blogdown]: https://bookdown.org/yihui/blogdown/
[R Markdown]: https://rmarkdown.rstudio.com/index.html
[Hexo]: https://hexo.io/

#### Hugo actually has more features! ####
- Hugo has internationalization (i18n) functionality built in. Jekyll
  doesn't. If you're still going to use Jekyll though, try [this][].
- Hugo actually lets you change the structure of your site beyond just
  putting posts in `/_posts/` and everything else in `/`.
- Hugo's local webserver (used when you are testing your site) has
  live-reloading built in (via injected JavaScript). So you don't have
  to keep refreshing manually.

[this]: https://www.sylvaindurand.org/making-jekyll-multilingual/

### Why not? ###
But there are, unfortunately, some things I'm missing in Hugo:

#### Structure/Organization ####
With Jekyll, you put a file named like `YYYY-MM-DD-slug` into `/_posts/`
and it sets the date and title automatically. Hugo makes me specify
title and date manually, even when using the aforementioned format.[^2]
And if I want punctuation in my title (like in this post), I even have
to specify the *slug* manually, because otherwise it auto-generates the
slug *with the punctuation intact*! At least Hugo has [some nice
automation functionality for creating new pages][], though...

[some nice automation functionality for creating new pages]:
https://gohugo.io/getting-started/quick-start/#step-4-add-some-content

### Jekyll literally actually BTFO forever with FACTS and LOGIC ###
There are a few reasons I decided to use Jekyll at first, but after
using Hugo, I no longer think any of them are good reasons:

#### Portability ####
Originally I had this website hosted on [GitLab Pages][] (which supports
literally any static site generator), but I figured I might want to
switch to [GitHub Pages][] (which only supports Jekyll) at some point. It
turns out I was right about that, but I was wrong to let it influence my
static site generator decision. You see, there's this thing called
[Netlify][], and you can just give it your website (via [GitHub][],
[GitLab][], [Bitbucket][], or direct file transfer) and it'll
automatically rebuild whenever something changes. And yes, it even
supports private repositiories, unlike GitHub Pages! I have more to say
about Netlify and about GitHub vs. GitLab, but that's better saved for
separate posts.

[GitLab Pages]: https://about.gitlab.com/stages-devops-lifecycle/pages/
[GitHub Pages]: https://pages.github.com/
[Netlify]: https://www.netlify.com/
[GitLab]: https://gitlab.com/
[GitHub]: https://github.com/
[Bitbucket]: https://bitbucket.org/

#### Extensibility (Plugins) ####
It's true: Jekyll has plugins and Hugo doesn't. But I haven't actually
thought of something Hugo can't do that Jekyll accomplishes with
plugins. As mentioned before, Hugo already has internationalization/i18n
built in. The only Jekyll plugin I ever actually used was
[jekyll-email-protect][]. But in that case, you can just generate the
obfuscated email offline and use that (which is better anyway if you
ever want to make the source repository of your website public, as I
have). [Percent encoding][] for the link, [code points][] for the text.

[Percent encoding]: https://en.wikipedia.org/wiki/Percent-encoding
[code points]:
https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Character_reference_overview
[jekyll-email-protect]: https://github.com/vwochnik/jekyll-email-protect

#### Flexibility ####
Uhh, I put this here when I was writing other parts of the page to
remind myself of something, but now I don't remember what I was supposed
to write here. Oh well.

### Conclusion ###
Well, I've already spent a lot more time writing this than I expected.
Hopefully I didn't forget anything. Later I'll post more about website
building. I'll tell you about non-garbage static site themes that are
*actually good* and don't require tons of JavaScript for basic
functionality or anything while still looking A E S T H E T I C and
stuff.

[^1]: I'll probably write more in the future about why this is important.
[^2]: I'm still going to use the format regardless because it makes organization easier in the filesystem (making my site more portable is a bonus).
