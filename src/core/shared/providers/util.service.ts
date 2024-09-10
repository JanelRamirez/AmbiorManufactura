import { Injectable, Logger } from '@nestjs/common';
import { minify } from 'html-minifier-terser';
import * as sanitizeHtml from 'sanitize-html';
import { SANITIZE_HTML_OPTIONS } from '../constants';

@Injectable()
export class UtilService {
  private readonly logger = new Logger(UtilService.name);
  private readonly sanitizeHtmlOptions = SANITIZE_HTML_OPTIONS;

  constructor() {}

  sanitizeHtml(html: string): string {
    return sanitizeHtml(html, this.sanitizeHtmlOptions);
  }

  async minifyHtml(html: string): Promise<string> {
    return await minify(html, {
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
    });
  }

  async sanitizeAndMinifyHtml(html: string): Promise<string> {
    return await this.minifyHtml(this.sanitizeHtml(html));
  }
}
