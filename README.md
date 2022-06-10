# Mermaid as a Service

[![Docker Pulls](https://img.shields.io/docker/pulls/lukasss93/saas-mermaid)](https://hub.docker.com/repository/docker/lukasss93/saas-mermaid)
![Docker Image Version (latest semver)](https://img.shields.io/docker/v/lukasss93/saas-mermaid)

![img.png](img.png)

### Optional parameters
- `/generate?background=false` to remove background
- `/generate?format=svg` to change format (supported: svg, png, jpg)

### Usage
https://mermaid-js.github.io/mermaid/

### Docker
```bash
docker run -p 8087:8087 lukasss93/saas-mermaid
```