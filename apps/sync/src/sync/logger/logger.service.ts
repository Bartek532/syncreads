import { HttpException, Inject, Logger } from "@nestjs/common";

import { SUPABASE_CLIENT_FACTORY_TOKEN } from "../../supabase/supabase.constants";
import { SupabaseProviderFactory } from "../../supabase/supabase.provider";

import type { LogMessage } from "./types/logger.types";

export class LoggerService {
  constructor(
    @Inject(SUPABASE_CLIENT_FACTORY_TOKEN)
    private readonly supabaseProvider: SupabaseProviderFactory,
  ) {}

  async createLog(syncId: string, json: LogMessage[]) {
    const { data, error, status } = await this.supabaseProvider()
      .from("Log")
      .insert({ syncId, json: JSON.stringify(json) })
      .select()
      .single();

    if (error) {
      throw new HttpException(error.details, status);
    }

    return data;
  }

  async updateLog(syncId: string, json: LogMessage) {
    const log = await this.getLogById(syncId);

    const previousLogJson = JSON.parse(log.json as string) as LogMessage[];

    const { data, error, status } = await this.supabaseProvider()
      .from("Log")
      .update({ json: JSON.stringify([...previousLogJson, json]) })
      .match({ syncId })
      .select()
      .single();

    if (error) {
      throw new HttpException(error.details, status);
    }

    Logger[json.level](`[${log.syncId}] ${json.message}`);

    return data;
  }

  async getLogById(syncId: string) {
    const { data, error, status } = await this.supabaseProvider()
      .from("Log")
      .select()
      .match({ syncId })
      .single();

    if (error) {
      throw new HttpException(error.details, status);
    }

    return data;
  }
}
