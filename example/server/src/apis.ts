export const apis = {
  hello: async ({ name }: { name: string }) => {
    return { code: 200, data: { name } };
  },
  world: async ({ age }: { age: number }) => {
    return { code: 200, data: { age } };
  },
};
