// Data loader for stats.yaml
import fs from 'fs'
import path from 'path'
import { parse } from 'yaml'

export default {
  watch: ['../data/stats.yaml'],
  load() {
    const statsPath = path.resolve(__dirname, '../data/stats.yaml')
    const content = fs.readFileSync(statsPath, 'utf-8')
    return parse(content)
  }
}
