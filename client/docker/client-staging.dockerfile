# Build Aridne Portal VUE project for staging/production env.
#
# This docker settings are fired only when it's setup through ../docker.compose.yml
#
# IMPORTANT:
# If you build for production/staging make sure you have the correct API-URI set on webpack.config.js
#
# ariadneApiPath  = 'http://localhost:8080';
# Staging env: https://ariadne-portal-staging.d4science.org:8080
#


#
# Setup client environment.
#
FROM node:22.3-alpine AS ariadne-build
LABEL maintainer="SND <team-it@snd.gu.se>"
WORKDIR /app
COPY client/package*.json ./
#RUN npm install
# install from package-lock.json
RUN npm ci
# Copy all client files from project root context
COPY client/. .

# Copy selected theme's client files directly into src/theme
ARG APP_THEME
RUN if [ -z "$APP_THEME" ]; then echo "ERROR: APP_THEME environment variable not set."; exit 1; fi
COPY theme/${APP_THEME}/client/ src/theme/
RUN npm run build-staging

#
# Setup NGINX server
#
FROM nginx:1.19.0-alpine AS ariadne-client

# Copy app to server default web root
RUN mkdir /usr/share/nginx/html/data-catalogue
COPY --from=ariadne-build /app/dist /usr/share/nginx/html/data-catalogue

# Copy nginx configuration
COPY --from=ariadne-build /app/docker/nginx-staging.conf /etc/nginx/nginx.conf

# Restart and reload new configuration
# RUN nginx -s reload

CMD ["nginx","-g","daemon off;"]

EXPOSE 80

