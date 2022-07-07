# Spree CLI

Spree's CLI that allows for setting up the store with selected backend template and front-end integration.

## Getting started
To use the CLI you need:
* Node 14+
* Requirements listed below, based on selected template

## Local Installation

### Using Docker (Recommended)
#### 1. Install required tools and dependencies:

Backend:
* [Docker](https://www.docker.com/community-edition#/download)

Frontend:
   
1. VueStorefront:
   * Node 14.15+

2. NextJs Storefront:
   * Node
   * Npm
3. Legacy:
#### 2. Before running script
Build your CLI using:
```bash
yarn build
```

#### 3. Run setup script

```bash
.bin/run generate store
```

This will automatically launch the application at `http://localhost:4000/admin`

Selected storefront integration will be accessible under `http://localhost:3000`

### Without Docker (not recommended for beginners)

#### 1. Install required tools and dependencies
Backend:
* HomeBrew - https://brew.sh/
* Install required packages

      ```bash
      brew install gpg postgresql redis imagemagick
      createuser -P -d postgres
      ```

* RVM - https://rvm.io/
* NVM - https://github.com/nvm-sh/nvm
* Ruby - `rvm install 3.0.2`
* Node - `nvm install`
* Yarn - `npm -g install yarn`

Frontend:

1. VueStorefront:
   * Node 14.15+

2. NextJs Storefront:
   * Node
   * Npm
3. Legacy:
#### 2. Before running script
Build your CLI using:

```bash
yarn build
```

#### 3. Run setup script

```bash
.bin/run generate store
```

This will automatically launch the application at `http://localhost:4000/admin`

Selected storefront integration will be accessible under `http://localhost:3000`

## Overview

This repository contains CLI to integrate spree and storefront of your choice

This repository is being developed and maintained by [Upside](https://upsidelab.io)

<a href="https://upsidelab.io"><img src="https://user-images.githubusercontent.com/6420475/141106487-333774a5-04b2-46a4-8367-7cb11e46906e.png" height="100px" /></a>
