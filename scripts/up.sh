npm run build
rm -rf ../theweatherapp.github.io/*
cp -r ./dist/* ../theweatherapp.github.io
cd ../theweatherapp.github.io/
git add .
git commit -m $1
git push --force
