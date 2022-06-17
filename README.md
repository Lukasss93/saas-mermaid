# Mermaid as a Service

[![Docker Pulls](https://img.shields.io/docker/pulls/lukasss93/saas-mermaid)](https://hub.docker.com/repository/docker/lukasss93/saas-mermaid)
![Docker Image Version (latest semver)](https://img.shields.io/docker/v/lukasss93/saas-mermaid)

![img.png](img.png)

## 🚀 Installation

### 🔧 Manual
1. Clone this repository: `git clone lukasss93/saas-mermaid`
2. Install dependencies: `npm install`
3. Run the server: `npm start`

### 📦 Docker
```bash
docker run -p 8087:8087 lukasss93/saas-mermaid
```

## 👓 Usage

Send a <img src="https://img.shields.io/badge/-GET-blue" style="height:16px;"/> or <img src="https://img.shields.io/badge/-POST-red" style="height:16px;"/> request to `http://localhost:8087/render` endpoint.

#### Input
To send your chart **text** use:
- `text` query string parameter when using <img src="https://img.shields.io/badge/-GET-blue" style="height:16px;"/> method 
- plain text body when using <img src="https://img.shields.io/badge/-POST-red" style="height:16px;"/> method

To remove the **background** use:
- `background=false` query string parameter. Optional. Default is `true`

To change the **format** append `.<format>` to the end of the url where `<format>` is one of the following:
- `svg`
- `png`
- `jpg`

Optional. Default is `svg`

#### Output
The response will be a **png**, **jpg**, **svg** image.
You can use the **X-Hash** header to:
- check if the image is up to date
- get the image from the cache with <img src="https://img.shields.io/badge/-GET-blue" style="height:16px;"/> route: `http://localhost:8087/cached/<X-Hash>`


### ⚡ Examples
- `http://localhost:8087/render?text=graph%20TD;A-->B;B-->C;C-->A`
- `http://localhost:8087/render?text=graph%20TD;A-->B;B-->C;C-->A&background=false`
- `http://localhost:8087/render.svg?text=graph%20TD;A-->B;B-->C;C-->A`
- `http://localhost:8087/render.svg?text=graph%20TD;A-->B;B-->C;C-->A&background=false`
- `http://localhost:8087/render.png?text=graph%20TD;A-->B;B-->C;C-->A`
- `http://localhost:8087/render.png?text=graph%20TD;A-->B;B-->C;C-->A&background=false`
- `http://localhost:8087/render.jpg?text=graph%20TD;A-->B;B-->C;C-->A`

### 📊 Diagram Syntax
The chart text must be a valid Mermaid diagram.<br/>
More info here: https://mermaid-js.github.io/mermaid/

## 📃 Changelog

Please see the [CHANGELOG.md](CHANGELOG.md) for more information
on what has changed recently.

## 🏅 Credits

- [Luca Patera](https://github.com/Lukasss93)
- [All Contributors](https://github.com/Lukasss93/laravel-larex/contributors)

## 📖 License

Please see the [LICENSE.md](LICENSE.md) file for more
information.