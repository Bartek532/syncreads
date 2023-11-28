import { Injectable } from "@nestjs/common";

@Injectable()
export class SyncService {
  getHello(): string {
    return "Hello World!";
  }
}
