#!/usr/bin/env sh

set -e

yarn docs:build

cd dist

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:ohhoney1/Vue.js-Source-Code-line-by-line.git master:gh-pages

cd -
