'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;
const modifyPackages = blueprintHelpers.modifyPackages;

const chai = require('ember-cli-blueprint-test-helpers/chai');
const expect = chai.expect;

const generateFakePackageManifest = require('../helpers/generate-fake-package-manifest');
const fixture = require('../helpers/fixture');

describe('Blueprint: controller-test', function () {
  setupTestHooks(this);

  describe('in app', function () {
    beforeEach(function () {
      return emberNew();
    });

    describe('with ember-cli-qunit@4.1.0', function () {
      beforeEach(function () {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-qunit', '4.1.0');
      });

      it('controller-test foo', function () {
        return emberGenerateDestroy(['controller-test', 'foo'], (_file) => {
          expect(_file('tests/unit/controllers/foo-test.js')).to.equal(
            fixture('controller-test/default.js')
          );
        });
      });

      it('controller-test foo/bar', function () {
        return emberGenerateDestroy(['controller-test', 'foo/bar'], (_file) => {
          expect(_file('tests/unit/controllers/foo/bar-test.js')).to.equal(
            fixture('controller-test/default-nested.js')
          );
        });
      });
    });

    describe('with ember-cli-qunit@4.2.0', function () {
      beforeEach(function () {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-qunit', '4.2.0');
      });

      it('controller-test foo', function () {
        return emberGenerateDestroy(['controller-test', 'foo'], (_file) => {
          expect(_file('tests/unit/controllers/foo-test.js')).to.equal(
            fixture('controller-test/rfc232.js')
          );
        });
      });

      it('controller-test foo/bar', function () {
        return emberGenerateDestroy(['controller-test', 'foo/bar'], (_file) => {
          expect(_file('tests/unit/controllers/foo/bar-test.js')).to.equal(
            fixture('controller-test/rfc232-nested.js')
          );
        });
      });
    });
  });

  describe('in addon', function () {
    beforeEach(function () {
      return emberNew({ target: 'addon' });
    });

    describe('with ember-cli-qunit@4.1.0', function () {
      beforeEach(function () {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-qunit', '4.1.0');
      });

      it('controller-test foo', function () {
        return emberGenerateDestroy(['controller-test', 'foo'], (_file) => {
          expect(_file('tests/unit/controllers/foo-test.js')).to.equal(
            fixture('controller-test/default.js')
          );
        });
      });

      it('controller-test foo/bar', function () {
        return emberGenerateDestroy(['controller-test', 'foo/bar'], (_file) => {
          expect(_file('tests/unit/controllers/foo/bar-test.js')).to.equal(
            fixture('controller-test/default-nested.js')
          );
        });
      });
    });

    describe('with ember-qunit (default)', function () {
      it('controller-test foo', function () {
        return emberGenerateDestroy(['controller-test', 'foo'], (_file) => {
          expect(_file('tests/unit/controllers/foo-test.js')).to.equal(
            fixture('controller-test/rfc232-addon.js')
          );
        });
      });
    });
  });
});
