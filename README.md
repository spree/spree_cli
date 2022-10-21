# Spree CLI

Spree CLI is a tool that makes it easy to bootstrap a new Spree project.
It provides an interactive process for configuring Spree backend (running in Dockerized, Hybrid or Native mode) and a selection of available frontends.

## Usage

To get started, simply run the following command in your terminal:

```bash
npx @spree/cli generate new
```

This will launch the interactive process that will guide you through the process of setting up a new Spree-based application. Happy hacking!

Note: Node 14+ is required to run the CLI. Depending on your configuration, the CLI will also prompt you to install additional dependencies required by your desired setup.


## Troubleshooting

### 1. NextJS storefront doesn't start properly
If the Storefront doesn't start you need to relaunch server manually.
To do so you should navigate to `/integration` folder inside created project and type `yarn dev` into console.

### 2. NextJS storefront stops during launch

In case if the server is randomly stopping during launch it is advised to stop it (for example with `ctrl + c`) and repeat steps mentioned above.


If you have encountered any other problem with NextJS you can also refer to NextJs docs: https://github.com/vercel/commerce


## Overview

This repository contains CLI to integrate Spree and storefront of your choice

This repository is being developed and maintained by [Upside](https://upsidelab.io)

<a href="https://upsidelab.io"><img src="https://user-images.githubusercontent.com/6420475/141106487-333774a5-04b2-46a4-8367-7cb11e46906e.png" height="100px" /></a>
