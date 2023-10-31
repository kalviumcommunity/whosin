<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Who's in?</h3>

  <p align="center">
    An open-source attendance tracking server.
    <br />
    <a href="https://github.com/kalviumcommunity/whosin"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/kalviumcommunity/whosin">View Demo</a>
    ·
    <a href="https://github.com/kalviumcommunity/whosin/issues">Report Bug</a>
    ·
    <a href="https://github.com/kalviumcommunity/whosin/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#modes">Modes</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This is an open-source attendance tracking server. It is designed to be have multiple modes which are different ways to track attendance. The different modes are explained in the [Modes](#modes) section.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![TypeScript][Typescript]][Typescript-url]
* [![Docker][Docker]][Docker-url]
* [![Redis][Redis]][Redis-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

The easiest way to get started is to use docker-compose. This will build the server and database images and start them up.

1. Install Docker. You can find instructions for your OS [here](https://docs.docker.com/get-docker/).

2. Clone the repo
   ```sh
   git clone https://github.com/kalviumcommunity/whosin.git
   ```

3. File the .env file with the required values. You can use the .env.example file as a template. You may skip the redis config, if using `docker-compose.yml`.

4. Create the docker image
   ```sh
   docker build -t whosin .
   ```

5. Start the server
   ```sh
    docker compose up
    ```

5. The server will be running on port 3443. You can access the server at http://localhost:3443/.
  
   Additionally, you can access the redis insights at http://localhost:8001/. The default password is `unsecure-password-7RElMQM3oF`. Learn more about redis insights [here](https://redislabs.com/redis-enterprise/redis-insight/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MODES -->
## Modes

Addional mode to the server can be added by extending the `BaseMode` interface. The `BaseMode` interface is defined in [src/modes/baseMode.ts](./src/modes/baseMode.ts). The `BaseMode` interface has the following methods:

```ts
interface BaseMode {
    modeName: string;

    createSession(sessionInfo: SessionCreationAttrs): Promise<Session>;
    getSessionInfo(sessionInfo: Session, data: any): Promise<Session>;
    updateSession(sessionInfo: Session, data: Session): Promise<Session>;
    deleteSession(sessionInfo: Session): Promise<Session>;
    recordEntry(sessionInfo: Session, data: any): Promise<Session>;
    getSessionReport(sessionInfo: Session): Promise<Session>;
}
```

A `Manual` mode is already implemented. You can find the implementation in [src/modes/manual.mode/manual.ts](./src/modes/manual.mode/manual.ts). Refer to the [Manual Mode](./docs/MANUAL.README.md) section for more information.


<!-- ROADMAP -->
## Roadmap

- [x] Manual Mode
- [ ] Self Check-in Mode
 

See the [open issues](https://github.com/kalviumcommunity/whosin/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feat/amazing-feature`)
3. Commit your Changes (`git commit -m 'Add some Amazing Feature'`)
4. Push to the Branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/kalviumcommunity/whosin.svg?style=for-the-badge
[contributors-url]: https://github.com/kalviumcommunity/whosin/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/kalviumcommunity/whosin.svg?style=for-the-badge
[forks-url]: https://github.com/kalviumcommunity/whosin/network/members
[stars-shield]: https://img.shields.io/github/stars/kalviumcommunity/whosin.svg?style=for-the-badge
[stars-url]: https://github.com/kalviumcommunity/whosin/stargazers
[issues-shield]: https://img.shields.io/github/issues/kalviumcommunity/whosin.svg?style=for-the-badge
[issues-url]: https://github.com/kalviumcommunity/whosin/issues
[license-shield]: https://img.shields.io/github/license/kalviumcommunity/whosin.svg?style=for-the-badge
[license-url]: https://github.com/kalviumcommunity/whosin/blob/master/LICENSE
[product-screenshot]: images/screenshot.png
[Typescript-url]: https://www.typescriptlang.org/
[Typescript]: https://img.shields.io/badge/-TypeScript-3178c6?style=flat-square&logo=typescript&logoColor=white
[Docker-url]: https://www.docker.com/
[Docker]: https://img.shields.io/badge/-Docker-2496ed?style=flat-square&logo=docker&logoColor=white
[Redis-url]: https://redis.io/
[Redis]: https://img.shields.io/badge/-Redis-dc382d?style=flat-square&logo=redis&logoColor=white
