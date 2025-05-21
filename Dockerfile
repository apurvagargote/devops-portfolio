FROM nginx:alpine

# Copy website files to nginx html directory
COPY website-index.html /usr/share/nginx/html/index.html
COPY website-styles.css /usr/share/nginx/html/styles.css
COPY website-main.js /usr/share/nginx/html/main.js

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost/ || exit 1