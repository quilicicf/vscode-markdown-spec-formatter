#!/usr/bin/env bash

set -e

# Release the package. Make sure the package.json's version and the CHANGELOG are up-to-date before running.
main() {
  local newVersion="${1?Missing new version}"
  [[ "${newVersion}" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] || {
    printf 'The version must comply with semver\n'
    return 1
  }

  local versionInPackage
  versionInPackage="$(jq '.version' --raw-output package.json)"
  [[ "${newVersion}" == "${versionInPackage}" ]] || {
    printf 'The version in package.json is not up-to-date\n'
    return 1
  }

  cd "$(git rev-parse --show-toplevel)"
  rm -rf ./dist || true

  npm run package
  local vsixFile="markdown-spec-formatter-${newVersion}.vsix"
  code --install-extension "${vsixFile}"

  printf 'Try the extension (temporarily installed in VSCode) then type ENTER\n'
  read -r

  code --uninstall-extension "${vsixFile}"

  local uploadLocation='https://marketplace.visualstudio.com/manage/publishers/quilicicf'
  printf 'You are ready to go, now upload %s here: %s\n' "${vsixFile}" "${uploadLocation}"
  printf 'When you are done, type ENTER\n'

  read -r

  git tag "v${newVersion}"
  git push --tags

  rm "${vsixFile}"
  printf 'You are all good!\n'
}

(main "$@")
