import { InstitucionalHomePage } from "./HomeClient";
import { getAllPosts } from "../../../services/blogService";

export default async function Page() {
  const posts = await getAllPosts();
  return <InstitucionalHomePage initialBlogs={posts} />;
}
