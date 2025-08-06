FROM node:24-alpine AS client-build

WORKDIR /usr/src/app
COPY package*.json tsconfig.json webpack.config.js index.html postcss.config.js tailwind.config.js ./
COPY src ./src
RUN npm install
RUN npm run build

FROM node:24-alpine AS server-build


WORKDIR /usr/src/app
COPY package*.json tsconfig.json ./
RUN npm install
COPY src ./src

RUN npx tsc 


FROM node:24-alpine AS release

WORKDIR /usr/src/app

# Copy built client assets to some public folder, e.g. ./client/dist
COPY --from=client-build /usr/src/app/dist ./client/dist

# Copy server code and dependencies
COPY --from=server-build /usr/src/app/dist ./dist
COPY --from=server-build /usr/src/app/node_modules ./node_modules
COPY --from=server-build /usr/src/app/.env* ./


ENV NODE_ENV=PROD
EXPOSE 3000

CMD ["node", "dist/src/server/server.js"]

