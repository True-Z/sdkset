cd .\docs\.vitepress\dist\

@REM for the first time
@REM git init
@REM git add .
@REM git commit -m 'deploy'
@REM git remote add origin git@github.com:True-Z/sdkset-utils-doc.git
@REM git push -u origin

@REM delete after
git add .
git commit -m 'deploy'
git push -f git@github.com:True-Z/sdkset-utils-doc.git master:main


