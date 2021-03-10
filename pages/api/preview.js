import { getPageEntryBySlug } from '../../components/client';

export default async function preview(req, res) {
  const { secret, slug, type } = req.query;

  if (secret !== 'test_secret' || !slug) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const post = await getPageEntryBySlug(slug, true);
  console.log(post);
  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Set the URL to redirect to
  let url;
  switch (type) {
    case 'page':
      url = `/${slug}`;
      break;
    default:
      url = `/`;
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  // res.writeHead(307, { Location: `/posts/${post.slug}` })
  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
  <script>window.location.href = '${url}'</script>
  </head>`,
  );
  res.end();
}
