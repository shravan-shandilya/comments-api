dev:
	nodemon ./index.js

prod:
	pm2 start ./index.js

deploy:
	# overwrite the server side .envrc.prod and deploy.sh
	scp .envrc.prod shravan@api.thoughtscoop.com:/home/shravan/.envrc.prod
	scp ./scripts/deploy.sh shravan@api.thoughtscoop.com:/home/shravan/deploy.sh

	# login to the server and run deployment script
	ssh shravan@api.thoughtscoop.com "cd ~;source .envrc.prod;chmod +x ./deploy.sh;source ./deploy.sh"