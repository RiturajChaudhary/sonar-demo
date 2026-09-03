# SonarQube and OWASP Dependency-Check Node.js Demo

This is a deliberately small Express API that can be used to verify JavaScript analysis in SonarQube and dependency vulnerability scanning with OWASP Dependency-Check.

## Run the app

```powershell
npm install
npm test
npm start
```

Then open `http://localhost:3000/health`.

## SonarQube

Install the SonarScanner CLI and start a local SonarQube instance:

```powershell
docker compose up -d
npm run test:coverage
sonar-scanner -Dsonar.host.url=http://localhost:9000 -Dsonar.token=YOUR_TOKEN
```

Create a project token in SonarQube and replace `YOUR_TOKEN`. The default local SonarQube login is `admin` / `admin` on first start.

## OWASP Dependency-Check

Install the Dependency-Check CLI, then run:

```powershell
npm run dependency-check
```

The HTML report is written to `reports/dependency-check/dependency-check-report.html`. The first run downloads the vulnerability database and can take several minutes.

## CI

The GitHub Actions workflow runs tests, npm audit, SonarQube analysis when `SONAR_TOKEN` and `SONAR_HOST_URL` are configured, and Dependency-Check when its CLI is installed on the runner.