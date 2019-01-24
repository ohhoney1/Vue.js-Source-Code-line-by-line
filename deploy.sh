#!/usr/bin/env sh

set -e

mv dist dist_bak

yarn docs:build

cd dist

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:ohhoney1/Vue.js-Source-Code-line-by-line.git master:gh-pages

cd -

rm -rf dist
mv dist_bak dist
