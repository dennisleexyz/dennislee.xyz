serve:
	npx quartz build --serve
build:
	npx quartz build
pull:
	git pull upstream v4
merge:
	git merge v4 --Xours
diff:
	git diff v4 :^.github/FUNDING.yml :^content :^netlify.toml :^quartz/static/icon.png
