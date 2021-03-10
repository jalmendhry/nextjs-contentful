const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const accessTokenPreview = process.env.CONTENTFUL_ACCESS_TOKEN_PREVIEW;

const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken,
});

const previewClient = require('contentful').createClient({
  space,
  accessToken: accessTokenPreview,
  host: 'preview.contentful.com',
});

const getClient = (preview = false) => (preview ? previewClient : client);

export async function getEntries(contentType) {
  const entries = await getClient().getEntries({ content_type: contentType });
  if (entries.items) return entries.items;
}

export async function getPageEntryBySlug(slug, preview) {
  const entries = await getClient(preview).getEntries({
    content_type: 'page',
    'fields.slug[in]': slug,
  });
  if (entries.items) return entries.items;
}

export default { getEntries, getPageEntryBySlug };
