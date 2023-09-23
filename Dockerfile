# 143.42.122.244
apt-get update
apt-get install zip \
 unzip

# Caddy server
# https://caddyserver.com/docs/install#debian-ubuntu-raspbian
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
sudo setcap cap_net_bind_service=+ep $(which caddy)

# :80 {
#     reverse_proxy localhost:3000
# }

# :3031 {
#   reverse_proxy localhost:3031
# }

# :4000 {
#   reverse_proxy localhost:3032
# }


# Install npm
sudo apt install nodejs npm

# npm global
npm install pm2 -g

# Working dir
/var/www/