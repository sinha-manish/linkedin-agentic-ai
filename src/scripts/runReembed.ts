import { reembedAllPosts } from "./reembedPosts";

(async () => {
  await reembedAllPosts();
  process.exit(0);
})();
