#!/bin/bash 
git checkout gh-pages
git pull 
git push
git checkout coding-pages
export GIT_MERGE_AUTOEDIT=no
git merge -X theirs gh-pages
#git remote add  coding git@git.coding.net:jinntrance/blog.git 
git push coding coding-pages
git checkout gh-pages

