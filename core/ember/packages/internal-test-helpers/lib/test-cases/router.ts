import ApplicationTestCase from './application';

export default abstract class RouterTestCase extends ApplicationTestCase {
  constructor(assert: QUnit['assert']) {
    super(assert);

    this.router.map(function () {
      this.route('parent', { path: '/' }, function () {
        this.route('child');
        this.route('sister');
        this.route('brother');
      });
      this.route('dynamic', { path: '/dynamic/:dynamic_id' });
      this.route('dynamicWithChild', { path: '/dynamic-with-child/:dynamic_id' }, function () {
        this.route('child', { path: '/:child_id' });
      });
    });
  }

  get routerService() {
    return this.applicationInstance!.lookup('service:router');
  }

  buildQueryParams(queryParams: object) {
    return {
      queryParams,
    };
  }
}
