cd .\docs\typedoc\

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:True-Z/sdkset-utils-typedoc.git master:main
