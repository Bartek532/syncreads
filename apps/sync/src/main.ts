import { NestFactory } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";

import { AppModule } from "./app.module";
import { GlobalExceptionFilter } from "./utils/exceptions-handler";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ZodValidationPipe());
  app.setGlobalPrefix("api");

  await app.listen(3001);
}

void bootstrap();
