import { promises as fs } from 'fs';
import { generateMarkdownEntry, updateReadme } from './updateReadme';

// Mock fs module
jest.mock('fs', () => ({
  promises: {
    readdir: jest.fn(),
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

const mockConfig = {
  baseUrl: './src',
  exclude: ['scripts'],
  order: ['troubleshooting', 'dev_notes'],
};

const mockTemplate = `
# Project Title

Some initial project information.

# Table of Contents
{updateReadme}

## Footer

Some footer information.
`;

describe('generateMarkdownEntry', () => {
  beforeAll(() => {
    (fs.readFile as jest.Mock).mockImplementation((filePath) => {
      if (filePath.endsWith('readmeConfig.json')) {
        return Promise.resolve(JSON.stringify(mockConfig));
      }
      if (filePath.endsWith('templateReadme.md')) {
        return Promise.resolve(mockTemplate);
      }
      return Promise.resolve('');
    });

    (fs.readdir as jest.Mock).mockImplementation((dirPath) => {
      if (dirPath === 'src') {
        return Promise.resolve([
          {
            name: 'troubleshooting',
            isDirectory: () => true,
            isFile: () => false,
          },
          { name: 'dev_notes', isDirectory: () => true, isFile: () => false },
          { name: 'scripts', isDirectory: () => true, isFile: () => false },
        ]);
      }
      if (dirPath === 'src/troubleshooting') {
        return Promise.resolve([
          { name: 'example1.md', isDirectory: () => false, isFile: () => true },
        ]);
      }
      if (dirPath === 'src/dev_notes') {
        return Promise.resolve([
          { name: 'example2.md', isDirectory: () => false, isFile: () => true },
        ]);
      }
      return Promise.resolve([]);
    });

    (fs.writeFile as jest.Mock).mockImplementation(() => Promise.resolve());
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should generate markdown entries correctly', async () => {
    const markdown = await generateMarkdownEntry(
      'src',
      '',
      1,
      mockConfig.exclude,
      mockConfig.order,
    );
    expect(markdown).toContain('## troubleshooting');
    expect(markdown).toContain('## dev_notes');
    expect(markdown).toContain('- [example1](./troubleshooting/example1.md)');
    expect(markdown).toContain('- [example2](./dev_notes/example2.md)');
  });

  it('should update README.md correctly', async () => {
    await updateReadme();
    expect(fs.writeFile).toHaveBeenCalledWith(
      'README.md',
      expect.stringContaining(
        '# Project Title\n\nSome initial project information.\n\n# Table of Contents\n## troubleshooting\n  - [example1](./src/troubleshooting/example1.md)\n## dev_notes\n  - [example2](./src/dev_notes/example2.md)\n\n## Footer\n\nSome footer information.\n',
      ),
    );
  });
});
