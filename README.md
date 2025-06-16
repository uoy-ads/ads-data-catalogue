# ADS Data Catalogue

A themeable fork of the [ARIADNE-Infrastructure/portal](https://github.com/ARIADNE-Infrastructure/portal).


## Getting Started

-Create a new theme directory in the `theme` folder and add your theme files to it.

Create a `.env` file in the root directory and set the `APP_THEME` environment variable to the name of your theme.

### Server Development

#### Install dependencies
```bash
cd server
composer install
```

#### Run server
From the project root:
```bash
docker-compose up
```

---

### Client Development

The client is a Node.js application and can be developed independently of the server.

#### Install dependencies
```bash
cd client
npm install
```
#### Run client dev server
```bash
npm run dev
```
- Runs on [localhost:8080](http://localhost:8080)

---

## Theme Selection

Set the `APP_THEME` environment variable to pick a theme (e.g., `ads`). During Docker build, the theme is copied from `theme/${APP_THEME}/client` to `client/theme`.

To add a new theme:
- Add files to `theme/{themename}/client`.
- Set `APP_THEME={themename}` during build.

> **Note:** Build fails if `APP_THEME` is not set or the directory does not exist.

---

## Deploying to Staging

Staging deployments are automated via GitHub Actions:
- **Push to the `staging` branch** to trigger a deployment.
- The workflow is defined in `.github/workflows/deploy-to-staging.yml`.
- The workflow uses a central template from `uoy-ads/ads-devops` and inherits secrets.
- The staging environment uses `docker-compose.staging.yml`.

### Staging Compose Example
```bash
docker-compose -f docker-compose.staging.yml up --build
```

---

For further details, see the respective `docker-compose` files and the GitHub Actions workflow.
