import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  // Создаем приложение NestJS на основе основного модуля
  const app = await NestFactory.create(AppModule);

  // Включаем парсер кук для обработки cookies в запросах
  app.use(cookieParser());

  // Настройка CORS для разрешения запросов с клиента
  app.enableCors({
    origin: [process.env.CLIENT_URL], // Адрес клиента, откуда разрешены запросы
    preflightContinue: false, // Не пропускаем запросы OPTIONS (стандартное поведение)
    credentials: true, // Разрешаем передачу cookies между клиентом и сервером
    exposedHeaders: 'set-cookie', // Разрешаем доступ к заголовку 'set-cookie' на клиенте
  });

  // Привязываем приложение к порту 5000 или используем порт из переменной окружения
  const port = process.env.SERVER_PORT || 5000; // Позволяет задавать порт через переменные окружения
  await app.listen(port);

  console.log(`Server is running on http://localhost:${port}`); // Уведомление о запуске сервера
}
bootstrap();
