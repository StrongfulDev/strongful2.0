# Strongful 2.0

This is a shopify theme 2.0 repository based on the *Dawn* theme.

It contains the sections from the previous theme
*[Copy of Trending](https://strongfulclothing.myshopify.com/admin/themes/130172616844)*.

## Requirements

- [Shopify CLI](https://github.com/Shopify/cli)

## Getting started

clone the repository from GitHub

```bash
git clone https://github.com/StrongfulDev/strongful2.0
```

## How to develop

Run local shopify development server

```bash
shopify theme dev
```

when you finish a single feature / change - commit with a message

```bash
git add .
git commit -m "your message"
```

when you want to backup push changes to the repository

```bash
git push
```

when working with the customizer you need to pull the changes to the local files, and then commit
the changes

```bash
shopify theme pull -d
git add .
git commit -m "customizer changes"
```

### Branching

First create a new branch from the `development` branch

```bash
git checkout -b your-branch-name
```

When you finish your work, push the changes to the repository

```bash
git push
```

Then merge your branch to the `development` branch.

```bash
git checkout development
git merge your-branch-name
```

### How to deploy

When you want to deploy the theme to the live store, you need to push the changes to the `master`
branch by pull request.

Then go to the repository on GitHub and create a pull request from the `development` branch to the `master` branch.

After the pull request is approved, the changes were merged to the `master` branch.
