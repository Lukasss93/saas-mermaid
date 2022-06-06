FROM node:alpine

RUN apk add --no-cache chromium

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# initialize app
RUN mkdir /app
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci --only=production && npm cache clean --force
COPY . /app

# configure environment variables
ENV NODE_ENV production
ENV PORT 8087
ENV REDIS_URL localhost

# run app
CMD npm run start

# expose port
EXPOSE 8087