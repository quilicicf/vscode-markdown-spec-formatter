# Packaging

* Delete `./dist` if it exists
* Bump the version in the package.json file
* Update the changelog
* Run `npm run package`
* Install the vsix and try it with `code --install-extension markdown-spec-formatter-*.vsix` 
* Uninstall the vsix and try it with `code --uninstall-extension markdown-spec-formatter-*.vsix`
* Publish the new vsix [on VSCode's website](https://marketplace.visualstudio.com/manage/publishers/quilicicf)
* Tag this repository
