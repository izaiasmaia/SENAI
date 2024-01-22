# Tutorial Instalação Linux UBUNTU

## Baixar a ISO mais recente, versão LTS:
Link para download:
- [Ubuntu](https://ubuntu.com/download/desktop) - (ISO UBUNTU)

## Instalar o VirtualBox para Windows:
Link para download:
- [VirtualBox](https://www.virtualbox.org/wiki/Downloads) - (Baixar a versão para Windows Hosts)
- Instalar o VirtualBox com todas as opções padrão sugeridas: 

## Passo 1:
- Criar uma nova VM, seguir as especificações das imagens (nome, seleção da ISO):  

![image](img/CriarVM//criar-vm.png)  
![image](img/CriarVM//hardware.png)  
![image](img/CriarVM//hardware2.png)  
![image](img/CriarVM//finalizar.png)  


## Passo 2:
- Iniciar a VM e seguir o passo a passo da instalação:  

Selecionar selecionar o idioma de exibição e depois **Install Ubuntu**:

![image](img/Instalacao/install1.png)  

Selecionar o idioma do **teclado**:  

![image](img/Instalacao/install2.png)  

*Continue*:  

![image](img/Instalacao/install3.png)  

*Install Now*:  

![image](img/Instalacao/install4.png)  

*Continue*:  

![image](img/Instalacao/install5.png)  

*Continue*:  

![image](img/Instalacao/install6.png)  

Preencher os dados de usuário e senha e *Continue*:  

![image](img/Instalacao/install7.png)  

Aguardar a instalação e reiniciar:  

![image](img/Instalacao/install7.png)  

## Passo 3:
- Iniciar a VM e seguir o passo a passo da instalação:  

Em ***Software Updater*** clicar em ***Install Now***:

![image](img/Configuracao/cfg1.png)  

Abrie o menu **Dispositivos**, em sequda clicar em **Inserir imagem de CD dos adicionais para Convidados**:

![image](img/Configuracao/cfg2.png)  

Abrir o ***Terminal***:

![image](img/Configuracao/cfg3.png)  

Digitar na linha de comando ***sudo su*** para tornar-se ***root*** no terminal, sua senha deverá ser informada:

![image](img/Configuracao/cfg4.png)  

Instalar adicionais para convidado, reiniciar após a instalação:

```bash
root@izaias-VirtualBox:/home/izaias# sh /media/izaias/VBox_GAs_7.0.14//VBoxLinuxAdditions.run
```
![image](img/Configuracao/cfg5.png)  

Instalar Node.js:
- Realizar o download dos pacotes:
```bash
root@izaias-VirtualBox:/home/izaias# curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
```

Instalar Node.js:
- Instalar o pacote:
```bash
root@izaias-VirtualBox:/home/izaias# apt install nodejs
```
