Step 1: Create GitHub Repository

react-app
│
├── src
├── public
├── package.json
└── .github

Push code:

git init

git add .

git commit -m "Initial commit"

git remote add origin https://github.com/company/react-app.git

git push -u origin main
Step 2: Create Branch Strategy

GitHub Branches:

main
develop
feature/*
release/*
hotfix/*

Example:

main

release/v1.0

develop

feature/customer-search


Step 3: Protect Main Branch

GitHub:

Settings
  ↓
Branches
  ↓
Add Rule

Configure:

✓ Require Pull Request

✓ Require Review Approval

✓ Require Status Checks

✓ Restrict Direct Pushes

Now nobody can directly push to main.

Step 4: Create Pull Request Workflow

Developer Flow:

git checkout develop

git checkout -b feature/customer-search

Code changes:

git add .

git commit -m "Customer search feature"

git push origin feature/customer-search

GitHub:

Create Pull Request


Step 5: Create GitHub Actions Folder

Create:

.github/
   workflows/

Inside:

build.yml



Step 6: Configure Build Workflow
.github/workflows/build.yml
name: React Build

on:
  pull_request:
  push:
    branches:
      - develop

jobs:

  build:

    runs-on: ubuntu-latest

    steps:

      - name: Checkout

        uses: actions/checkout@v4

      - name: Setup Node

        uses: actions/setup-node@v4

        with:
          node-version: 20

      - name: Install

        run: npm ci

      - name: Lint

        run: npm run lint

      - name: Test

        run: npm run test -- --watchAll=false

      - name: Build

        run: npm run build



Step 7: Commit Workflow
git add .

git commit -m "Added CI pipeline"

git push

GitHub automatically executes pipeline.

Step 8: Verify Actions

Open:

GitHub
  ↓
Actions

You'll see:

Build
  ✓ Passed

or

Build
  ✗ Failed
Step 9: Configure Environment Variables

GitHub:

Settings
 ↓
Secrets and Variables
 ↓
Actions

Add:

REACT_APP_API_URL

REACT_APP_AUTH_URL

Example:

https://api.company.com



Step 10: Use Secrets in Workflow
env:

  REACT_APP_API_URL:
    ${{ secrets.REACT_APP_API_URL }}



Step 11: Create Deployment Workflow

Create:

.github/workflows/deploy-dev.yml
name: Deploy DEV

on:

  push:

    branches:
      - develop

jobs:

  deploy:

    runs-on: ubuntu-latest

    steps:

      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4

        with:
          node-version: 20

      - run: npm ci

      - run: npm run build

      - name: Deploy

        run: echo "Deploying DEV"



Step 12: Add Environment Approval

GitHub:

Settings
 ↓
Environments

Create:

DEV

QA

UAT

PROD

For PROD:

Require Approval

before deployment.



Step 13: Deploy Production

Create:

.github/workflows/deploy-prod.yml
name: Deploy PROD

on:

  push:

    branches:
      - main

jobs:

  deploy:

    runs-on: ubuntu-latest

    environment: PROD

    steps:

      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4

      - run: npm ci

      - run: npm run build

      - run: echo "Deploy Production"


Step 14: Production Flow
Feature Branch
       ↓
Pull Request
       ↓
Review
       ↓
Merge Develop
       ↓
Build Pipeline
       ↓
Deploy DEV
       ↓
QA Testing
       ↓
Release Branch
       ↓
UAT
       ↓
Merge Main
       ↓
Production Deployment


Step 15: Add Quality Gates

Before merge:

- run: npm run lint

- run: npm run test

- run: npm run build

Optional:

- run: npm run coverage

- run: sonar-scanner



Step 16: Deployment Targets

GitHub Actions can deploy to:

Amazon Web Services S3 + CloudFront
Microsoft Azure App Service
Google Cloud Storage Bucket
Kubernetes
Nginx Servers
OpenShift

Example AWS:

- name: Upload Build

  run: aws s3 sync build/ s3://my-react-app
Complete GitHub Enterprise Workflow
Developer
    ↓
Feature Branch
    ↓
Git Push
    ↓
Pull Request
    ↓
GitHub Actions
    ↓
Lint
    ↓
Unit Tests
    ↓
Build
    ↓
Review
    ↓
Merge Develop
    ↓
Deploy DEV
    ↓
QA
    ↓
Release Branch
    ↓
UAT
    ↓
Merge Main
    ↓
Production Approval
    ↓
Deploy PROD
    ↓
Smoke Test
    ↓
Monitoring


*** Azure ***
--------------

Developer
    ↓
Git Push
    ↓
GitHub
    ↓
GitHub Actions
    ↓
npm install
npm run build
    ↓
Azure App Service
    ↓
Users



Step 1: Create Azure App Service

Login to:

Azure Portal

Navigate:

App Services
 ↓
Create

Subscription: Your Subscription
Resource Group: react-rg
App Name: react-prod-app
Publish: Code
Runtime Stack: Node 20 LTS
Region: Central India


REVIEW + CREATE

Step 2: Verify App Service

After deployment:

App Service
 ↓
Overview

You'll see:

https://react-prod-app.azurewebsites.net

Currently it shows the default Azure page.


Step 3: Download Publish Profile

Inside App Service:

Overview
 ↓
Get Publish Profile

Download:

react-prod-app.PublishSettings

This file contains deployment credentials.

Step 4: Add GitHub Secret

GitHub Repository:

Settings
 ↓
Secrets and Variables
 ↓
Actions

Click:

New Repository Secret

Name:

AZURE_WEBAPP_PUBLISH_PROFILE

Open the downloaded .PublishSettings file.

Copy the entire XML content.

Paste it as the secret value.

Save.


Step 5: Create GitHub Workflow

Create:

.github/workflows/azure-deploy.yml


Step 6: Add Workflow Code

name: Deploy React To Azure

on:
  push:
    branches:
      - main

jobs:

  build-and-deploy:

    runs-on: ubuntu-latest

    steps:

      - name: Checkout Source
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Packages
        run: npm install

      - name: Build React App
        run: npm run build

      - name: Deploy To Azure
        uses: azure/webapps-deploy@v3
        *** with: ***
          app-name: react-prod-app
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
         *** package: build *** 


Step 7: Commit and Push
git add .
git commit -m "Azure deployment pipeline"
git push origin main


Step 8: Watch Deployment

GitHub:

Actions
 ↓
Deploy React To Azure

You should see:

✓ Checkout
✓ Install
✓ Build
✓ Deploy


Step 9: Verify Application

Open:

https://react-prod-app.azurewebsites.net

Your React application should be running.