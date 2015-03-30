#!/bin/bash 
git pull 
git push
git checkout gitcafe-pages
export GIT_MERGE_AUTOEDIT=no
git merge gh-pages
#git remote add  gc git@gitcafe.com:jinntrance/blog.git 
git push gc gitcafe-pages
git checkout gh-pages

