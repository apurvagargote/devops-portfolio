pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'your-docker-registry'
        IMAGE_NAME = 'portfolio-website'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        KUBECONFIG = credentials('kubeconfig')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} ."
                sh "docker tag ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest"
            }
        }
        
        stage('Run Tests') {
            steps {
                sh "docker run --rm ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} curl -f http://localhost/ || exit 1"
            }
        }
        
        stage('Push to Registry') {
            steps {
                withCredentials([string(credentialsId: 'docker-registry-credentials', variable: 'DOCKER_AUTH')]) {
                    sh "echo ${DOCKER_AUTH} | docker login ${DOCKER_REGISTRY} -u username --password-stdin"
                    sh "docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest"
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                sh "sed -i 's|image: ${DOCKER_REGISTRY}/${IMAGE_NAME}:.*|image: ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}|' kubernetes/deployment.yaml"
                sh "kubectl apply -f kubernetes/namespace.yaml"
                sh "kubectl apply -f kubernetes/deployment.yaml"
                sh "kubectl apply -f kubernetes/service.yaml"
                sh "kubectl apply -f kubernetes/ingress.yaml"
            }
        }
        
        stage('Run Ansible Configuration') {
            steps {
                sh "ansible-playbook -i ansible/inventory.ini ansible/configure-nginx.yml"
            }
        }
        
        stage('Setup Monitoring') {
            steps {
                sh "kubectl apply -f monitoring/prometheus-config.yaml"
                sh "kubectl apply -f monitoring/grafana-config.yaml"
            }
        }
    }
    
    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed!'
        }
        always {
            sh "docker rmi ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
        }
    }
}