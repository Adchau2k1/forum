# Sử dụng một hình ảnh chứa Node.js
FROM node:18

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép các tệp package.json và yarn.lock
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN yarn install

# Sao chép mã nguồn frontend
COPY . .

# Chạy ứng dụng frontend
CMD [ "yarn", "dev" ]
