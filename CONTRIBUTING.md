# Contributing to whosin

Hey there! We're glad you're here. We're excited to have you help us build this project. We're happy to help you get started, even if you're new to open source.


## The Project Layout

The layout of the project is as follows:

```
.
├── src
|   ...
│   ├── helpers
│   │   ├── cleanupWorker.ts
│   │   ├── modeRegistry.ts
│   │   ├── redisClient.ts
│   |-- modes
│   │   ├── baseMode.ts
│   │   ├── manual.mode
│   │   |   ├── manual.ts
│   ...
```

### `src/helpers`

This folder contains helper functions that are used throughout the project.

#### `src/helpers/cleanupWorker.ts`

This file contains the cleanup worker that is responsible for cleaning up the sessions when they expire. It calls the `callback` url provided and dumps the data to the `callback` url as per the mode's requirements. 

#### `src/helpers/modeRegistry.ts`

This file contains the `ModeRegistry` which is reponsible to maintain all the available modes present in the `modes` directory.

#### `src/helpers/redisClient`

This file is an interface to connect with the redis instance. It exposes various functions to interact with the redis instance. 

```ts
getSessions(): Promise<string[]>;
getSession(sessionId: string): Promise<string>;
setSession(session: Session): Promise<void>;
clearSession(session: Session): Promise<void>;
log(session:Session, data: object): Promise<void>;
getLogs(session: Session): Promise<string[]>;
```

### `src/modes`

This folder contains the different modes that are available to use. Each mode is extended from the `baseMode.ts` file.

In order to add a new mode, you need to create a new file in this folder. The file should be named as `modeName.mode.ts`. For example, if you want to create a new mode called `demo`, you need to create a file called `demo.mode.ts`.

## Filing an Issue

Before filing an issue, please make sure that the issue is not already present. If the issue is already present, please add a comment to the issue stating that you are facing the same issue.

If the issue is not present, please create a new issue by clicking on the `Issues` tab on the repository page and then clicking on the `New Issue` button.

File an issue for any of the following reasons:

- You want to suggest a new feature.
- You want to report a bug.
- You want to request a change in the existing codebase/documentation.
- You found a typo in the documentation.
- You need help with the project.


## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/) (>= 16.0.0)
- [Redis](https://redis.io/) (>= 7.2.0)

### Installation

#### 1. Clone the repository

  ```bash
  git clone https://github.com/kalviumcommunity/whosin.git
  ```

#### 2. Install the dependencies

  ```bash
  npm install 
  ```

#### 3. Setup a redis server.

  The project requires you to have a redis server with authentication. You can setup a redis server locally or use a cloud provider like [Upstash](https://upstash.com/).
  It is recommended to use a local redis server for development purposes.

  Alternatively, you can use the following command to start a redis server using docker.

  ```bash
  docker compose -f docker-compose.dev.yml up redis-stack
  ```

This will create a local redis server with the following credentials using the env in the `.env.docker` file. Refer `.env.docker.example` for more details, [here](./.env.docker.example).


#### 4. Create a `.env` file in the root of the project and add the following environment variables. 
  
  Refer `.env.example` for more details, [here](./.env.example).

  The server requires a `TOKEN` to be present in the `.env` file. This token is used to authenticate the requests to the server. You can generate a token using the following command:

  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
  ```
  
  ```bash
  # .env
  REDIS_HOST=
  REDIS_PORT=
  REDIS_PASSWORD=

  TOKEN=
  ```

#### 5. Start the server

  ```bash
  npm run dev
  ```


## Creating a PR

### 1. Fork the repository

  Fork the repository by clicking on the fork button on the top right corner of the repository page.

### 2. Clone the forked repository

  Clone the forked repository to your local machine.

  ```bash
  git clone
  ```

### 3. Create a new branch

  ```bash
  git checkout -b <branch-name>
  ```

### 4. Make the changes
  
    Make the changes to the codebase.

### 5. Commit the changes
  
    ```bash
    git add .
    git commit -m "commit message"
    ```

### 6. Push the changes to the forked repository

  ```bash
  git push origin <branch-name>
  ```
  
### 7. Create a Draft Pull Request

  Create a draft pull request by clicking on the `Pull Request` button on the forked repository page.

  Read more about creating a draft PR [here](https://github.blog/2019-02-14-introducing-draft-pull-requests/).

### 8. Submit the PR

  Submit the PR by clicking on the `Ready for review` button on the draft PR page.


## Code Review

Once you are confident that you have put significant work and want the mainteners to review your code (even if the work is not yet fully-complete), mark the PR as 'Ready For Review' and request a review from the maintainers.

### Maintainers

Current list of mainteners:

- [@th3c0d3br34ker](https://github.com/th3c0d3br34ker)

## Merge

Once the PR is reviewed and approved by the maintainers, it will be merged into the `main` branch. Once merged the PR (and the issues linked if any) will be closed automatically.
