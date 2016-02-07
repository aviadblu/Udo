#!/bin/bash

export http_proxy=
export https_proxy=
export HTTP_PROXY=
export HTTPS_PROXY=

git config --global http.proxy ""
git config --global https.proxy ""

git config --global --get http.proxy
git config --global --get https.proxy

