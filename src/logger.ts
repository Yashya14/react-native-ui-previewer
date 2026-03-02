import * as vscode from "vscode";

/**
 * Centralized logger that writes to a dedicated VS Code Output Channel.
 * Singleton pattern ensures a single channel across the extension lifecycle.
 */
export class Logger {
  private static instance: Logger;
  private readonly channel: vscode.OutputChannel;

  private constructor() {
    this.channel = vscode.window.createOutputChannel("RN Preview");
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  info(message: string): void {
    this.write("INFO", message);
  }

  warn(message: string): void {
    this.write("WARN", message);
  }

  error(message: string, error?: unknown): void {
    const errorMsg =
      error instanceof Error ? `${error.message}\n${error.stack}` : String(error ?? "");
    this.write("ERROR", `${message}${errorMsg ? ` | ${errorMsg}` : ""}`);
  }

  show(): void {
    this.channel.show(true);
  }

  dispose(): void {
    this.channel.dispose();
  }

  private write(level: string, message: string): void {
    const timestamp = new Date().toISOString();
    this.channel.appendLine(`[${timestamp}] [${level}] ${message}`);
  }
}