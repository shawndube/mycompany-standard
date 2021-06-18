import { normalize } from '@angular-devkit/core';
import {
  Rule,
  SchematicContext,
  Tree,
  externalSchematic,
  chain,
  noop,
  apply,
  empty,
  mergeWith,
  applyToSubtree
} from '@angular-devkit/schematics';
import {
  Schema as AngularNgNewSchema,
  PackageManager,
  Style
} from '@schematics/angular/ng-new/schema';

export function ngNew(options: any): Rule {
  return async (_tree: Tree, _context: SchematicContext) => {

    const ngNewOptions: AngularNgNewSchema = {
      version: '12.0.4',
      name: options.name,
      directory: options.name,
      routing: true,
      strict: true,
      style: Style.Scss,
      packageManager: PackageManager.Yarn
    }

    return chain([
      mergeWith(
        apply(empty(), [
          externalSchematic('@schematics/angular', 'ng-new', ngNewOptions),
          //undocumented but public api for passing down a subtree
          applyToSubtree(ngNewOptions.directory || ngNewOptions.name, [
            listTree(),
            externalSchematic('@angular-eslint/schematics', 'ng-add', {})
          ]),
        ]),

      )
    ]);
  };
}

function listTree(): Rule {
  return async (_tree: Tree, _context: SchematicContext) => {
    _tree.visit((p) => {
      _context.logger.warn(`${p.toString()} `)
    });

    return noop();
  };
}


