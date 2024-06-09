const { default: build } = require("next/dist/build");
const { getPlaiceholder } = require("plaiceholder");

async function getBlurImageData(imageUrl) {
  const buffer = await fetch(imageUrl).then(async (res) => {
    Buffer.from(await res.arrayBuffer());
  });

  if (buffer) {
    const data = await getPlaiceholder(buffer);
  }

  return data;
}

export { getBlurImageData };
