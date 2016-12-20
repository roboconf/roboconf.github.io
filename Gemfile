source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'html-proofer', '>=3.0'
gem 'github-pages', versions['github-pages']
