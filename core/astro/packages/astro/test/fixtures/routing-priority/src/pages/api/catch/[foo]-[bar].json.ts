import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  return {
    body: JSON.stringify({
      foo: params.foo,
			bar: params.bar,
    }),
  };
};

export function getStaticPaths() {
  return [{ params: { foo: 'a', bar: 'b' } }];
}
