import prerenderRequests from '../../layer0/prerenderRequests'

export default async function prerender(req, res) {
  const requests = await prerenderRequests()
  res.json(requests)
}
