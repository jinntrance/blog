#!/bin/bash 
git pull 
git push
git checkout gitcafe-pages
git merge gh-pages
#git remote add  gc git@gitcafe.com:jinntrance/blog.git 
git push gc gitcafe-pages
git checkout gh-pages

