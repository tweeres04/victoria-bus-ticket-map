yarn build && \
ssh root@tweeres.ca 'rm -r /var/www/victoriabusticketmap'
scp -r dist root@tweeres.ca:/var/www/victoriabusticketmap &&
scp -r static root@tweeres.ca:/var/www/victoriabusticketmap &&
scp etc/victoriabusticketmap root@tweeres.ca:/etc/nginx/sites-available && 
ssh root@tweeres.ca 'nginx -s reload'