# DevOps Portfolio Website

This repository contains a personal DevOps portfolio website with full infrastructure automation using various DevOps tools.

## Project Structure

- `website/` - Website source code (HTML, CSS, JavaScript)
- `infrastructure/` - Infrastructure automation code
  - `docker/` - Dockerfile and docker-compose.yml
  - `terraform/` - AWS infrastructure as code
  - `kubernetes/` - Kubernetes manifests
  - `ansible/` - Configuration management
  - `monitoring/` - Prometheus and Grafana configuration

## Components

### Website
A responsive portfolio website showcasing DevOps skills with sections for About Me, Skills, Projects, Certifications, and Contact.

### DevOps Infrastructure
- **Docker**: Containerization of the website
- **Jenkins**: CI/CD pipeline automation
- **Terraform**: AWS infrastructure provisioning
- **Kubernetes**: Container orchestration
- **Ansible**: Configuration management
- **Prometheus & Grafana**: Monitoring and visualization

## Getting Started

1. Clone this repository
2. Run the website locally using Docker: `docker-compose up`
3. Deploy to AWS using the provided Terraform and Kubernetes configurations

## CI/CD Pipeline

The Jenkins pipeline automates the following steps:
1. Build the Docker image
2. Run tests
3. Push to container registry
4. Deploy to Kubernetes cluster
5. Configure with Ansible
6. Set up monitoring