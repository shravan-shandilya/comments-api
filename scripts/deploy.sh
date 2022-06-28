#!/bin/bash
cd /home/shravan/ghost-api
cp ~/.envrc.prod .envrc.prod
source .envrc.prod
git pull https://$GITHUB_TOKEN:@github.com/shravan-shandilya/ghost-api.git
npm install
npm run db:migrate:up
pm2 reload all --update-env
pm2 logs --nostream
