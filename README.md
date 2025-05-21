# DevOps Portfolio Website Project

This project contains a personal DevOps portfolio website with full infrastructure automation using various DevOps tools.

## Project Overview

The project demonstrates a complete DevOps workflow for deploying and managing a portfolio website:

- **Website**: Responsive portfolio website built with HTML, CSS, and JavaScript
- **Containerization**: Docker for packaging the application
- **CI/CD**: Jenkins pipeline for automated build, test, and deployment
- **Infrastructure as Code**: Terraform for AWS resource provisioning
- **Container Orchestration**: Kubernetes for deployment and scaling
- **Configuration Management**: Ansible for post-deployment configuration
- **Monitoring**: Prometheus and Grafana for metrics collection and visualization

## Project Structure

- `website-index.html`, `website-styles.css`, `website-main.js`: Website source code
- `Dockerfile`: Container image definition
- `docker-compose.yml`: Local development environment
- `Jenkinsfile`: CI/CD pipeline definition
- `terraform-*.tf`: AWS infrastructure as code
- `kubernetes-*.yaml`: Kubernetes manifests
- `ansible-*.yml`: Configuration management playbooks
- `prometheus-config.yaml`, `grafana-config.yaml`: Monitoring setup

## Getting Started

### Local Development

1. Clone this repository
2. Run the website locally using Docker:

```bash
docker-compose up
```

3. Access the website at http://localhost:80

### Deployment to AWS

1. Initialize Terraform:

```bash
terraform init
terraform plan
terraform apply
```

2. Configure kubectl to connect to the EKS cluster:

```bash
aws eks update-kubeconfig --region us-east-1 --name portfolio-eks
```

3. Deploy the application to Kubernetes:

```bash
kubectl apply -f kubernetes-namespace.yaml
kubectl apply -f kubernetes-deployment.yaml
kubectl apply -f kubernetes-service.yaml
kubectl apply -f kubernetes-ingress.yaml
```

4. Set up monitoring:

```bash
kubectl create namespace monitoring
kubectl apply -f prometheus-config.yaml
kubectl apply -f grafana-config.yaml
```

## CI/CD Pipeline

The Jenkins pipeline automates the following steps:

1. Build the Docker image
2. Run tests
3. Push to container registry
4. Deploy to Kubernetes cluster
5. Configure with Ansible
6. Set up monitoring

## Monitoring

- Prometheus: http://prometheus.example.com
- Grafana: http://grafana.example.com (default credentials: admin/admin)

## Security Considerations

- SSL/TLS encryption for all traffic
- Secure container configuration
- Network security with proper security groups
- Kubernetes RBAC for access control
- Secrets management

## Future Improvements

- Add automated testing for the website
- Implement blue-green deployment strategy
- Set up disaster recovery procedures
- Add cost optimization measures
- Implement infrastructure drift detection