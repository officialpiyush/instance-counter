echo "Installing Deps"
npm i -g typescript typescript-tslint-plugin tslint
echo "Download Complete"
echo "Linting"
yarn test
exit 0