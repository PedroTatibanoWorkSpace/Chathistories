import { DateTime } from 'luxon';
import { Logger } from '@nestjs/common';
import { CatalogHistoryStats } from '../../domain/ports/inbounds/catalog-history.port';

export class HelpersService {
  private readonly logger = new Logger(HelpersService.name);

  parseDate(dateString: string | null | undefined): Date {
    if (!dateString) {
      throw new Error('Data inválida ou ausente.');
    }

    const fixedDateString = dateString.replace(
      /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3})\d{3}/,
      '$1',
    );

    const parsedDate = DateTime.fromFormat(
      fixedDateString,
      'yyyy-MM-dd HH:mm:ss.SSS',
    );
    if (!parsedDate.isValid) {
      this.logger.warn(`⚠️ Erro ao converter data: ${dateString}.`);
      throw new Error(`Data inválida: ${dateString}`);
    }
    return parsedDate.toJSDate();
  }

  async withRetry<T>(
    operation: () => Promise<T>,
    maxAttempts: number,
  ): Promise<T> {
    let lastError: Error = new Error(
      'Operação falhou após todas as tentativas',
    );

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        if (attempt < maxAttempts) {
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
          await this.delay(delay);
          this.logger.warn(
            `🔄 Tentativa ${attempt}/${maxAttempts} falhou, tentando novamente em ${delay}ms...`,
          );
        }
      }
    }

    throw lastError;
  }

  async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  logFinalStats(stats: CatalogHistoryStats): void {
    const durationMinutes = (stats.durationMs / 60000).toFixed(2);
    const chatsPerMinute = (
      stats.totalChatsProcessed /
      (stats.durationMs / 60000)
    ).toFixed(2);
    const messagesPerMinute = (
      stats.totalMessagesProcessed /
      (stats.durationMs / 60000)
    ).toFixed(2);

    this.logger.log('\n📊 ===== ESTATÍSTICAS FINAIS =====');
    this.logger.log(`⏱️  Duração total: ${durationMinutes} minutos`);
    this.logger.log(`💬 Chats processados: ${stats.totalChatsProcessed}`);
    this.logger.log(
      `📨 Mensagens processadas: ${stats.totalMessagesProcessed}`,
    );
    this.logger.log(
      `⚡ Performance: ${chatsPerMinute} chats/min, ${messagesPerMinute} msgs/min`,
    );
    this.logger.log(`❌ Erros: ${stats.errors.length}`);

    if (stats.errors.length > 0) {
      this.logger.log('\n🔍 Primeiros 5 erros:');
      stats.errors.slice(0, 5).forEach((error, index) => {
        this.logger.log(`  ${index + 1}. ${error.error}`);
      });
    }

    this.logger.log('================================\n');
  }

  createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    return batches;
  }
}
