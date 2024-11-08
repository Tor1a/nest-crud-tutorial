import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {

  constructor(private readonly configService: ConfigService) {
  }
  onModuleInit(){
    console.log(this.configService.get("POSTGRES_PORT"));
  }
  getHello(): string {
    return 'Hello World!';
  }
}
