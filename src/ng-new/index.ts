import {
  Rule,
  SchematicContext,
  Tree,
  externalSchematic,
  chain
} from '@angular-devkit/schematics';
import {
  Schema as AngularNgNewSchema,
  PackageManager,
  Style
} from '@schematics/angular/ng-new/schema';

export function ngNew(options: AngularNgNewSchema): Rule {
  return async (_tree: Tree, _context: SchematicContext) => {

    const ngNewOptions: AngularNgNewSchema = {
      version: '12.0.4',
      name: options.name,
      routing: true,
      strict: true,
      legacyBrowsers: true,
      style: Style.Scss,
      packageManager: PackageManager.Yarn
    }

    return chain([
      externalSchematic('@schematics/angular', 'ng-new', ngNewOptions),
      externalSchematic('@angular-eslint/schematics', 'ng-add', ngNewOptions)
    ]);
  };
}

