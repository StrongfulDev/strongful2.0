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

when working with the customizer you need to pull the changes to the local files, and then commit the changes

```bash
shopify theme pull -d
git add .
git commit -m "customizer changes"
```