import { moduleForComponent, test } from 'ember-qunit';<% if (testType === 'integration') { %>
import hbs from 'htmlbars-inline-precompile';<% } %>

moduleForComponent('<%= componentPathName %>', '<%= friendlyTestDescription %>', {
  <% if (testType === 'integration' ) { %>integration: true,<% } else if(testType === 'unit') { %>// Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true,<% } %>
});

test('it renders', function (assert) {<% if (testType === 'integration' ) { %>
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`<%= selfCloseComponent(componentName) %>`);

  assert.strictEqual(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    <%= openComponent(componentName) %>
      template block text
    <%= closeComponent(componentName) %>
  `);

  assert.strictEqual(this.$().text().trim(), 'template block text');<% } else if(testType === 'unit') { %>
  // Creates the component instance
  /*let component =*/ this.subject();
  // Renders the component to the page
  this.render();
  assert.strictEqual(this.$().text().trim(), '');<% } %>
});
