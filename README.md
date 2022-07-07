# Spree + Frontend CLI

## Local Installation

### Using Docker (Recommended)
#### Install required tools and dependencies:

Backend:
* [Docker](https://www.docker.com/community-edition#/download)

Frontend:
   
1. VueStorefront:
   * Node 14.15+

2. NextJs Storefront:
   * Node
   * Npm
3. Legacy:
#### Run setup script

```bash
.bin/run generate store
```

This will automatically launch the application at `http://localhost:4000/admin`

Chosen storefront integration will be accessible under `http://localhost:3000`

### Without Docker (not recommended for beginners)

#### Install required tools and dependencies
Backend: 
1. HomeBrew - https://brew.sh/
2. Install required packages

      ```bash
      brew install gpg postgresql redis imagemagick
      createuser -P -d postgres
      ```

3. RVM - https://rvm.io/
4. NVM - https://github.com/nvm-sh/nvm
5. Ruby - `rvm install 3.0.2`
6. Node - `nvm install`
7. Yarn - `npm -g install yarn`

Frontend:

1. VueStorefront:
   * Node 14.15+

2. NextJs Storefront:
   * Node
   * Npm
3. Legacy:

#### Run setup script

```bash
.bin/run generate store
```
## Overview

This repository contains CLI to integrate spree and storefront of your choice

This repository is being developed and maintained by [Upside](https://upsidelab.io)
<a href="https://upsidelab.io"><img src="https://user-images.githubusercontent.com/6420475/141106487-333774a5-04b2-46a4-8367-7cb11e46906e.png" height="100px" /></a>
