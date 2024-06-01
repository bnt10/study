### 스크립트에서 `--config` 옵션을 구현하고 사용하는 방법

이 가이드는 명령줄에서 설정 파일 경로를 지정하기 위해 `--config` 옵션을 받아들이는 Node.js 스크립트를 설정하는 방법을 설명합니다.

#### 1. 프로젝트 초기화

먼저, 새 디렉토리를 만들고 그 안으로 이동한 다음, 새 Node.js 프로젝트를 초기화합니다.

```sh
mkdir my-project
cd my-project
npm init -y
```

#### 2. 필요한 패키지 설치

명령줄 인자를 처리하기 위해 `yargs` 패키지가 필요합니다. npm을 사용하여 설치합니다.

```sh
npm install yargs
```

#### 3. 스크립트 작성

새 JavaScript 파일(예: `updateReadme.ts`)을 만들고, 아래와 같이 스크립트를 작성합니다.

```typescript
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// ES 모듈에서 __dirname 및 __filename 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CLI 옵션 설정
const argv = yargs(hideBin(process.argv))
  .option('config', {
    alias: 'c',
    type: 'string',
    description: 'Path to the config file',
  })
  .help()
  .argv as { config?: string };

// 설정 파일 경로 결정
const configPath = argv.config || path.resolve('./readmeConfig.json');

async function loadConfig(configPath: string) {
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

export async function updateReadme(configPath: string) {
  const config = await loadConfig(configPath);
  const { baseUrl, exclude, order, readmePath: configReadmePath, templatePath: configTemplatePath } = config;

  const rootDir = path.resolve(); // 현재 작업 디렉토리
  const srcDir = path.join(rootDir, baseUrl);

  const readmePath = configReadmePath ? path.resolve(rootDir, configReadmePath) : path.join(rootDir, 'README.md');
  const templatePath = configTemplatePath ? path.resolve(rootDir, configTemplatePath) : path.join(rootDir, 'templateReadme.md');

  const markdownContent = await generateMarkdownEntry(
    srcDir,
    '',
    baseUrl,
    1,
    exclude,
    order,
  );

  const templateContent = await fs.readFile(templatePath, 'utf-8');

  const readmeContent = templateContent.replace(
    '{updateReadme}',
    markdownContent,
  );

  await fs.writeFile(readmePath, readmeContent);
}

// 설정 파일 경로를 인자로 전달하여 updateReadme 호출
updateReadme(configPath).catch(console.error);
```

#### 4. 설정 파일 및 템플릿 파일 생성

프로젝트 루트 디렉토리에 `readmeConfig.json` 파일을 생성합니다.

```json
{
  "baseUrl": "./src",
  "exclude": ["scripts"],
  "order": ["troubleshooting", "dev_notes"],
  "readmePath": "./README.md",
  "templatePath": "./templateReadme.md"
}
```

프로젝트 루트 디렉토리에 `templateReadme.md` 파일을 생성합니다.

```markdown
# Project Title

Some initial project information.

# Table of Contents
{updateReadme}

## Footer

Some footer information.
```

#### 5. 샘플 디렉토리 구조 생성

테스트를 위해 `src` 디렉토리를 생성하고 몇 개의 마크다운 파일과 폴더를 만듭니다.

```sh
mkdir -p src/dev_notes src/troubleshooting
echo "# Dev Notes" > src/dev_notes/notes.md
echo "# Troubleshooting" > src/troubleshooting/troubleshooting.md
```

#### 6. 스크립트 실행

이제 명령줄에서 스크립트를 실행할 수 있습니다.

1. **`--config` 옵션을 사용하는 경우**:
   ```sh
   node updateReadme.ts --config /path/to/your/readmeConfig.json
   ```

2. **`--config` 옵션 없이 실행하는 경우** (프로젝트 루트에서 `readmeConfig.json` 파일을 찾음):
   ```sh
   node updateReadme.ts
   ```

이 가이드는 프로젝트 초기화부터 `--config` 옵션을 사용하는 스크립트 실행까지의 전체 설정을 제공합니다. 스크립트는 설정 파일 경로를 동적으로 처리하여 다양한 사용 사례에 맞게 유연하게 동작합니다.

#### 7. 테스트 코드 작성

변경된 스크립트와 설정을 반영하여 테스트 코드를 작성합니다.

```typescript
import mock from 'mock-fs';
import { promises as fs } from 'fs';
import path from 'path';
import { generateMarkdownEntry, updateReadme } from './updateReadme';

const mockConfig = {
  baseUrl: './src',
  exclude: ['scripts'],
  order: ['troubleshooting', 'dev_notes'],
  readmePath: './README.md',
  templatePath: './templateReadme.md'
};

const mockTemplate = `
# Project Title

Some initial project information.

# Table of Contents
{updateReadme}

## Footer

Some footer information.
`;

describe('updateReadme functions', () => {
  const configFilePath = 'readmeConfig.json';

  beforeEach(() => {
    mock({
      'src/troubleshooting': {
        'example1.md': 'Content of example1',
      },
      'src/dev_notes': {
        'example2.md': 'Content of example2',
      },
      'readmeConfig.json': JSON.stringify(mockConfig),
      'templateReadme.md': mockTemplate,
      'README.md': '',
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it('should generate markdown entries correctly', async () => {
    const markdown = await generateMarkdownEntry(
      'src',
      '',
      './src',
      1,
      mockConfig.exclude,
      mockConfig.order,
    );
    expect(markdown).toContain('## troubleshooting');
    expect(markdown).toContain('## dev_notes');
    expect(markdown).toContain('- [example1](./src/troubleshooting/example1.md)');
    expect(markdown).toContain('- [example2](./src/dev_notes/example2.md)');
  });

  it('should update README.md correctly', async () => {
    await updateReadme(configFilePath);
    const readmeContent = await fs.readFile(mockConfig.readmePath, 'utf-8');
    expect(readmeContent).toContain('# Project Title');
    expect(readmeContent).toContain('## troubleshooting');
    expect(readmeContent).toContain('- [example1](./src/troubleshooting/example1.md)');
    expect(readmeContent).toContain('## dev_notes');
    expect(readmeContent).toContain('- [example2](./src/dev_notes/example2.md)');
    expect(readmeContent).toContain('## Footer');
  });
});
```

이 가이드는 프로젝트 초기화부터 `--config` 옵션을 사용하는 스크립트 실행, 설정 파일 및 템플릿 파일 생성, 샘플 디렉토리 구조 생성, 스크립트 실행 및 테스트 코드 작성까지의 전체 설정을 제공합니다. 스크립트는 설정 파일 경로를 동적으로 처리하여 다양한 사용 사례에 맞게 유연하게 동작합니다.