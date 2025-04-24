serve:
	while true; do npx quartz build --serve; done
build:
	npx quartz build
pull:
	git pull upstream v4
merge:
	git merge v4 --Xours
diff:
	git diff v4 --diff-filter=M :^.github/FUNDING.yml :^quartz/static/icon.png
