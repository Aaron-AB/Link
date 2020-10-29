@echo off

echo starting build...

ionic build && npx cap sync && npx cap update && npx cap open android

echo build complete