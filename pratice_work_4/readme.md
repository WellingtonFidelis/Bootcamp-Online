para fazer o deploy direto pelo heroku
heroku login
git init, se o o file .git não existir
heroku git:remote -a stormy-wave-33151
git add .
git commit -am "message"
git push heroku master

caso tenha alguma mudança na api, rodar
heroku restart
