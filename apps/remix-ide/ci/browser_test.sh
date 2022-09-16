#!/usr/bin/env bash

set -e

BUILD_ID=${CIRCLE_BUILD_NUM:-${TRAVIS_JOB_NUMBER}}
echo "$BUILD_ID"
TEST_EXITCODE=0

npm run ganache-cli &
npm run serve:production &
echo 'sharing folder: ' $PWD '/apps/remix-ide/contracts' &
npm run remixd &

sleep 5

npm run build:e2e

TESTFILES=$(grep -IRiL "disabled" "dist/apps/remix-ide-e2e/src/tests" | grep "\.spec\|\.test" | sort | circleci tests split )
for TESTFILE in $TESTFILES; do
    npx nightwatch --config dist/apps/remix-ide-e2e/nightwatch.js $TESTFILE --env=$1  || TEST_EXITCODE=1
done

echo "$TEST_EXITCODE"
if [ "$TEST_EXITCODE" -eq 1 ]
then
  exit 1
fi
