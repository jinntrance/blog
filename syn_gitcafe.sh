#!/bin/bash
git checkout gh-pages
git pull
git push
git checkout coding-pages
export GIT_MERGE_AUTOEDIT=no
git merge -X theirs gh-pages
#git remote add  coding git@e.coding.net:jinntrance/blog.git
#git fetch coding
#git branch coding-pages coding/coding-pages
git push coding coding-pages
git checkout gh-pages
