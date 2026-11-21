export default {
  async fetch(request, env) {
    const incoming = new URL(request.url);
    if (incoming.pathname !== "/upload" && !incoming.pathname.startsWith("/upload/")) {
      return fetch(request);
    }
    const backend = new URL(env.STUDIO_ORIGIN);
    backend.pathname = incoming.pathname;
    backend.search = incoming.search;
    return fetch(new Request(backend, request), {redirect: "manual"});
  },
};
