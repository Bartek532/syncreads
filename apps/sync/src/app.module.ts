import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DeviceRemarkableModule } from "./remarkable/remarkable.module";
import { SupabaseModule } from "./supabase/supabase.module";
import { SyncModule } from "./sync/sync.module";
import { ConfigurationSchema } from "./types/configuration.schema";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: [".env"],
      isGlobal: true,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      validate: (config) => {
        const validatedConfig = ConfigurationSchema.safeParse(config);

        if (validatedConfig.success) {
          return validatedConfig.data;
        }

        Logger.error(validatedConfig.error.formErrors);
        throw Error();
      },
    }),
    SupabaseModule,
    DeviceRemarkableModule,
    SyncModule,
  ],
})
export class AppModule {}
