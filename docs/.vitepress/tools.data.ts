// Data loader for tools - reads front matter from all tool markdown files
import fs from 'fs';
import path from 'path';
import { parse as parseYaml } from 'yaml';
import { validateToolWithCache } from './toolValidation';

export interface Tool {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  status: string;
  license?: string;
  liveDemo?: string;
  sourceCode?: string;
  developer?: string;
  maintainedBy?: string;
  mainContributor?: string;
  technology?: string;
  standards?: string[];
  tags?: string[];
  firstRelease?: string;
  lastUpdated?: string;
}

// Simple front matter parser
function parseFrontMatter(content: string): { data: Partial<Tool>; content: string } {
  const frontMatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return { data: {}, content };
  }

  const yamlContent = match[1];
  const markdownContent = match[2];

  try {
    const data = parseYaml(yamlContent);
    return { data, content: markdownContent };
  } catch (e) {
    console.error('Error parsing YAML front matter:', e);
    return { data: {}, content: markdownContent };
  }
}

export default {
  watch: ['../tools/*.md'],
  load() {
    const toolsDir = path.resolve(__dirname, '../tools');
    const tools: Tool[] = [];

    // Read all markdown files in tools directory
    const files = fs.readdirSync(toolsDir).filter((file) => file.endsWith('.md') && file !== 'index.md');

    for (const file of files) {
      const filePath = path.join(toolsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = parseFrontMatter(content);

      // Validate tool front matter (with mtime-based caching to prevent duplicate messages)
      // This now includes standards validation
      const validationResult = validateToolWithCache(data, file, filePath);

      // Only include files with valid front matter (title and categories required)
      if (validationResult.valid && data.title && data.categories) {
        const slug = file.replace('.md', '');
        tools.push({
          slug,
          title: data.title,
          description: data.description || '',
          categories: Array.isArray(data.categories) ? data.categories : [data.categories],
          status: data.status || 'unknown',
          license: data.license,
          liveDemo: data.liveDemo,
          sourceCode: data.sourceCode,
          developer: data.developer,
          maintainedBy: data.maintainedBy,
          mainContributor: data.mainContributor,
          technology: data.technology,
          standards: data.standards || [],
          tags: data.tags || [],
          firstRelease: data.firstRelease,
          lastUpdated: data.lastUpdated,
        });
      } else if (!validationResult.valid) {
        // Tool failed validation - skip it (error already logged)
        console.error(`   → Skipping tool "${file}" due to validation errors`);
      }
    }

    return tools;
  },
};
