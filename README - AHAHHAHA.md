
import viewObserver from 'view-observer';



(new viewObserver(options))
  .observe('#node1')
  // .observe(['#node1', '#node2'])
  .subscribe(() => {
    blah blah
  })
  .subscribe(['#node1', '#node2'], () => {
    blah blah
  })
  .subscribe('#node1', () => {
    blah blah
  })
  .subscribe('#node2', () => {
    blah blah
  })

UMD - Universal Module Definition: AMD, RequireJS, and globals;
ESM - ES Modules: For webpack/Rollup or browser supporting the spec;
