// this kind of export in ts is not quite right but storybook `main` has some issues with export keyword
module.exports = class IgnoreNotFoundExportPlugin {
  apply(compiler) {
    const messageRegExp =
      /export '.*'( \(reexported as '.*'\))? was not found in/;
    const doneHook = (stats) =>
      (stats.compilation.warnings = stats.compilation.warnings.filter(
        (warn) =>
          // Unfortunately webpack is not exporting ModuleDependencyWarning type, so I'm using constructor.name instead
          warn.constructor.name === 'ModuleDependencyWarning' &&
          !messageRegExp.test(warn.message),
      ));

    compiler.hooks.done.tap('IgnoreNotFoundExportPlugin', doneHook);
  }
};
