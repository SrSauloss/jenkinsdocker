pipeline {
    agent any

    /*
    Comando comentado para agendar a execução do pipeline a cada 2 minutos.
    Descomente para ativar o agendamento.
    triggers {
        cron('H/2 * * * *') // Roda a cada 2 minutos
    }
    */

    stages {
        stage('Build in Docker') {
            steps {
                script {
                    catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                        try {
                            docker.build('app-build', '--no-cache -f Dockerfile.build .').inside {
                                sh 'npm run build'
                            }
                            writeFile file: 'build_status.txt', text: 'SUCCESS'
                        } catch (e) {
                            writeFile file: 'build_status.txt', text: 'FAILURE'
                            throw e
                        }
                    }
                }
            }
        }
        stage('Test in Docker') {
            steps {
                script {
                    catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                        try {
                            docker.build('app-test', '--no-cache -f Dockerfile.test .').inside {
                                sh 'npm test'
                            }
                            writeFile file: 'test_status.txt', text: 'SUCCESS'
                        } catch (e) {
                            writeFile file: 'test_status.txt', text: 'FAILURE'
                            throw e
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            script {
                def buildStatus = fileExists('build_status.txt') ? readFile('build_status.txt').trim() : 'NOT RUN'
                def testStatus = fileExists('test_status.txt') ? readFile('test_status.txt').trim() : 'NOT RUN'
                echo "Status do stage de Build: ${buildStatus}"
                echo "Status do stage de Test: ${testStatus}"
                if (buildStatus == 'FAILURE') {
                    echo 'Erro: O stage de Build falhou.'
                }
                if (testStatus == 'FAILURE') {
                    echo 'Erro: O stage de Test falhou.'
                }
                if (buildStatus == 'SUCCESS' && testStatus == 'SUCCESS') {
                    echo 'Pipeline finalizado com sucesso: todos os stages passaram.'
                } else {
                    error("Pipeline com falhas em uma ou mais etapas.")
                }
            }
        }
    }
}