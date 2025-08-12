
FROM node:18-slim AS frontend-build
WORKDIR /app/frontend
COPY Frontend/package*.json ./
RUN npm ci
COPY Frontend/ ./
RUN npm run build

FROM node:18-slim AS backend-build
WORKDIR /app/backend
COPY Backend/package*.json ./
RUN npm ci --only=production
COPY Backend/ ./
COPY --from=frontend-build /app/frontend/dist ./public

FROM node:18-slim
WORKDIR /app
COPY --from=backend-build /app/backend ./
ENV NODE_ENV=production
ENV PORT=80
EXPOSE 80
CMD ["node", "server.js"]
