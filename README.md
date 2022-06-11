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

Send a <img src="https://img.shields.io/badge/-GET-blue" style="height:16px;"/> or <img src="https://img.shields.io/badge/-POST-red" style="height:16px;"/> request to `http://localhost:8087/render` endpoint with the following parameters:

| Query Parameter | Available in                                                                                   | Default | Allowed values      | Description                                                                     |
|-----------------|------------------------------------------------------------------------------------------------|---------|---------------------|---------------------------------------------------------------------------------|
| text            | ![GET](https://img.shields.io/badge/-GET-blue)                                                 |         |                     | Chart text (⚠️ it must be an url encoded text)                                  |
| background      | ![GET](https://img.shields.io/badge/-GET-blue) ![POST](https://img.shields.io/badge/-POST-red) | `true`  | `true`, `false`     | Optional. Enable/disable the white background (not available when `format=jpg`) |
| format          | ![GET](https://img.shields.io/badge/-GET-blue) ![POST](https://img.shields.io/badge/-POST-red) | `svg`   | `svg`, `png`, `jpg` | Optional. Change the output image format                                        |

⚠️ When using the <img src="https://img.shields.io/badge/-POST-red" style="height:16px;"/> method, you need to send the **chart text** as plain body. 

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