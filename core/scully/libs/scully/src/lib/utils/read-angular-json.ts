import { readFileSync, existsSync } from 'fs-extra';
import { jsonc } from 'jsonc';
import { join } from 'path';
import { findAngularJsonPath } from './findAngularJsonPath';
import { logError } from './log';

const configFiles = ['angular.json', 'workspace.json', 'project.json'];

export function readAngularJson(projectPath?: string) {
  let angularConfig;
  if (angularConfig) {
    return angularConfig;
  }
  try {
    let basePath = findAngularJsonPath(projectPath);
    if (projectPath) {
      basePath = join(basePath, projectPath);
    }
    let fileName = configFiles.find((f) => existsSync(join(basePath, f)));
    const path = join(basePath, fileName);
    angularConfig = jsonc.parse(readFileSync(path).toString());
  } catch (e) {
    angularConfig = {
      path: '',
      defaultProject: 'default',
      defaultProjectName: 'default',
    };
    // logError(`Angular config file could not be parsed!`, e);
    // process.exit(15);
  }
  return angularConfig;
}
