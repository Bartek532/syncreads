export interface GeneratorStrategy {
  prepare(url: string): Promise<{
    title: string;
    generate: () => Promise<{
      file: Buffer;
    }>;
  }>;
}
