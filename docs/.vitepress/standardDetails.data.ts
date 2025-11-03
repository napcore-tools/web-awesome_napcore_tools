// Data loader for standard details from YAML
import fs from 'fs'
import path from 'path'
import { parse as parseYaml } from 'yaml'

export interface StandardDetails {
  title: string
  domain: string
  purpose: string
  format_technology: string
  maintainer_origin: string
  related_standards?: string[]
  status: string
}

export default {
  watch: ['../data/standards.yaml'],
  load(): Record<string, StandardDetails> {
    const yamlPath = path.resolve(__dirname, '../data/standards.yaml')
    const content = fs.readFileSync(yamlPath, 'utf-8')

    try {
      const data = parseYaml(content) as Record<string, StandardDetails>
      return data
    } catch (e) {
      console.error('Error parsing standards.yaml:', e)
      return {}
    }
  }
}
