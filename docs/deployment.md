# Развёртывание ICGroup Admin на VDS

Данное руководство описывает полный процесс развёртывания проекта **ICGroup Admin** на VDS с чистой (свежепереустановленной) операционной системой.

## Требования

- VDS с ОС Ubuntu 22.04 LTS (или аналогичный дистрибутив Debian-based)
- Доступ по SSH с правами `sudo`

---

## 1. Обновление системы

После переустановки ОС первым делом обновите пакеты:

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Установка Node.js и npm

Рекомендуется устанавливать Node.js через **nvm** (Node Version Manager), чтобы иметь возможность управлять версиями:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
node -v
npm -v
```

---

## 3. Установка Git

```bash
sudo apt install -y git
git --version
```

---

## 4. Клонирование репозитория

```bash
git clone https://github.com/KiraProsto/ICGroup-admin.git
cd ICGroup-admin
```

---

## 5. Установка зависимостей

```bash
npm install
```

---

## 6. Сборка проекта

```bash
npm run build
```

После успешной сборки появится директория `dist/` с готовыми статическими файлами.

---

## 7. Установка и настройка Nginx

### 7.1 Установка

```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 7.2 Настройка виртуального хоста

Создайте конфигурационный файл для сайта:

```bash
sudo nano /etc/nginx/sites-available/icgroup-admin
```

Вставьте следующую конфигурацию (замените `your_domain_or_ip` на ваш домен или IP-адрес):

```nginx
server {
    listen 80;
    server_name your_domain_or_ip;

    root /var/www/icgroup-admin;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 7.3 Копирование собранных файлов

```bash
sudo mkdir -p /var/www/icgroup-admin
sudo cp -r dist/* /var/www/icgroup-admin/
sudo chown -R www-data:www-data /var/www/icgroup-admin
```

### 7.4 Активация конфигурации

```bash
sudo ln -s /etc/nginx/sites-available/icgroup-admin /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 8. (Опционально) Настройка HTTPS через Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain
sudo systemctl reload nginx
```

---

## 9. Обновление приложения

При необходимости обновить развёрнутое приложение:

```bash
cd ICGroup-admin
git pull origin main
npm install
npm run build
sudo cp -r dist/* /var/www/icgroup-admin/
sudo chown -R www-data:www-data /var/www/icgroup-admin
sudo systemctl reload nginx
```

---

## Проверка работоспособности

Откройте в браузере `http://your_domain_or_ip` — должна отобразиться страница ICGroup Admin.

Проверить статус Nginx:

```bash
sudo systemctl status nginx
```
