#!/usr/bin/env bash

set -e

# Release the package. Make sure the CHANGELOG is up-to-date before running.
main() (
  newVersion="${1?Missing new version parameter}"
  newTag="v${newVersion}"

  [[ "${newVersion}" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] || {
    printf 'The version must comply with semver\n'
    return 1
  }

  cd "$(git rev-parse --show-toplevel)"
  rm -rf ./dist || true

  yarn version "${newVersion}"
  yarn run package
  vsixFile="markdown-spec-formatter-${newVersion}.vsix"
  code --install-extension "${vsixFile}"

  printf 'Try the extension (temporarily installed in VSCode) then type Y if it works or N to abort\n'
  read -r answer

  if [[ "${answer^^}" == 'Y' ]]; then
    code --uninstall-extension "${vsixFile}"

    uploadLocation='https://marketplace.visualstudio.com/manage/publishers/quilicicf'
    printf 'You are ready to go, now upload %s here: %s\n' "${vsixFile}" "${uploadLocation}"
    printf 'When you are done, type ENTER\n'

    read -r

    git push origin 'master'
    git push --tags

    rm "${vsixFile}"
    printf 'You are all good!\n'
  else
    git tag --delete "${newTag}"
    git reset HEAD~1 --hard
  fi
)

main "$@"
