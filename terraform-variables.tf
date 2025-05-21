variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "jenkins_ami" {
  description = "AMI ID for Jenkins server"
  type        = string
  default     = "ami-0c55b159cbfafe1f0" # Amazon Linux 2 AMI (adjust as needed)
}

variable "key_name" {
  description = "SSH key pair name"
  type        = string
  default     = "portfolio-key"
}

variable "domain_name" {
  description = "Domain name for the portfolio website"
  type        = string
  default     = "example.com" # Replace with your domain
}