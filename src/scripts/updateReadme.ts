import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';

// ES 모듈에서 __dirname 및 __filename 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadConfig() {
  const configPath = path.join(__dirname, '../../readmeConfig.json');
  const configContent = await fs.readFile(configPath, 'utf-8');
  return JSON.parse(configContent);
}

export async function generateMarkdownEntry(
  dirPath: string,
  basePath: string = '',
  srcBasePath: string = '',
  level: number = 1,
  exclude: string[] = [],
  order: string[] = [],
): Promise<string> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  const folders = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => entry.name);

  const sortedFolders = [...folders].sort((a, b) => {
    const orderA = order.indexOf(a);
    const orderB = order.indexOf(b);
    if (orderA === -1 && orderB === -1) return a.localeCompare(b);
    if (orderA === -1) return 1;
    if (orderB === -1) return -1;
    return orderA - orderB;
  });

  let markdown = '';

  for (const folder of sortedFolders) {
    if (exclude.includes(folder)) {
      continue;
    }
    const filePath = path.join(dirPath, folder);
    const nestedMarkdown = await generateMarkdownEntry(
      filePath,
      path.join(basePath, folder),
      srcBasePath,
      level + 1,
      exclude,
      order,
    );
    if (nestedMarkdown) {
      if (level === 1) {
        markdown += `## ${folder}\n${nestedMarkdown}`;
      } else if (level === 2) {
        markdown += `### ${folder}\n${nestedMarkdown}`;
      } else {
        markdown += `\n#### ${folder}\n${nestedMarkdown}`;
      }
    }
  }

  for (const file of files) {
    const relativePath = path
      .join(srcBasePath, basePath, file)
      .replace(/\\/g, '/')
      .replace(/ /g, '%20');
    const markdownLink = `[${file.replace('.md', '')}](./${relativePath})`;
    markdown += `  - ${markdownLink}\n`;
  }

  return markdown;
}

export async function updateReadme() {
  const config = await loadConfig();
  const { baseUrl, exclude, order } = config;
  const rootDir = path.join(__dirname, '../../');
  const srcDir = path.join(rootDir, baseUrl);
  const readmePath = path.join(rootDir, 'README.md');
  const markdownContent = await generateMarkdownEntry(
    srcDir,
    '',
    baseUrl,
    1,
    exclude,
    order,
  );

  const templatePath = path.join(rootDir, 'templateReadme.md');
  const templateContent = await fs.readFile(templatePath, 'utf-8');

  const readmeContent = templateContent.replace(
    '{updateReadme}',
    markdownContent,
  );

  await fs.writeFile(readmePath, readmeContent);
}

updateReadme().catch(console.error);
