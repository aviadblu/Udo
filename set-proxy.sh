#!/bin/bash

export http_proxy=http://web-proxy.il.hpecorp.net:8080
export https_proxy=http://web-proxy.il.hpecorp.net:8080
export HTTP_PROXY=http://web-proxy.il.hpecorp.net:8080
export HTTPS_PROXY=http://web-proxy.il.hpecorp.net:8080

npm config set proxy "http.proxy http://web-proxy.il.hpecorp.net:8080"
npm config set https-proxy "https.proxy http://web-proxy.il.hpecorp.net:8080"

git config --global http.proxy http://web-proxy.il.hpecorp.net:8080
git config --global https.proxy http://web-proxy.il.hpecorp.net:8080
