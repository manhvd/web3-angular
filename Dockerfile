FROM node:12.16.1 AS compile-image
WORKDIR /opt/ng
ENV NODE_OPTIONS=--max_old_space_size=4096
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run publish


FROM nginx
COPY stag-nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /opt/ng/dist /usr/share/nginx/html
