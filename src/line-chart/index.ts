import { chain, Rule, Tree, SchematicContext, noop } from '@angular-devkit/schematics';
import {
  addModuleImportToModule,
  buildComponent,
  findModuleFromOptions,
} from '@angular/cdk/schematics';
import { Schema } from './schema';
import { addPackageToPackageJson } from 'schematics-utilities';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

/**
 * Scaffolds a new highchart component.
 * Internally it bootstraps the base component schematic
 */
export default function(options: Schema): Rule {
  return chain([
    buildComponent({ ...options }),
    addToPackageJson(options),
    addComponentModulesToModule(options),
    addSelector(options)
  ]);
}

/**
 * Adds the required modules to the relative module.
 */
function addComponentModulesToModule(options: Schema) {
  return (host: Tree) => {
    const modulePath = findModuleFromOptions(host, options) || null;
    if (modulePath) {
      addModuleImportToModule(host, modulePath, 'ChartModule', 'angular-highcharts');
    }
    return host;
  };
}

function addToPackageJson(options: Schema) {
  return (host:any, context:SchematicContext) => {
      addPackageToPackageJson(host, 'dependencies', 'angular-highcharts', '^7.2.0');
      addPackageToPackageJson(host, 'dependencies', 'highcharts', '^7.1.1');
      options && options.NpmInstallTask ? noop() : context.addTask(new NodePackageInstallTask());
      return host;
  };
}

function addSelector(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const content: Buffer | null = tree.read("./src/app/app.component.html");
    let strContent: string = '';
    if(content) strContent = content.toString();

    const content2Append = '<app-'+options.name+'></app-'+options.name+'> \n';
    
    const updatedContent = strContent + content2Append;

    tree.overwrite("./src/app/app.component.html", updatedContent);
    return tree;
  };
}
