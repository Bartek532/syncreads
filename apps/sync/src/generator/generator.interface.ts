export interface GeneratorStrategy {
  generate(url: string): Promise<Buffer>;
}
