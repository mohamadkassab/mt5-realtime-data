eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa_mkassab
git pull origin main 
npm install
npm run build