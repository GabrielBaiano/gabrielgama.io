import { useTranslations } from "next-intl";
import { BlogPost } from "./components/BlogPost";
import { BlogSidebar } from "./components/BlogSidebar";
import { getAllPosts } from "../../../../services/blogService";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen relative w-full bg-stone-50/50 selection:bg-stone-200 pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative">

        {/* Global Feed Header */}
        <div className="mb-8 pl-2">
          <h1 className="text-3xl font-medium tracking-tight text-stone-900 font-sans">
            Blog
          </h1>
          <p className="text-stone-500 text-[15px] mt-1">Updates, thoughts, and curated content from Gabriel.</p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          
          {/* Main Feed Column */}
          <div className="flex flex-col gap-6 relative z-10 w-full">
            {posts.map((post) => (
               <BlogPost key={post.id} post={post as any} />
            ))}
          </div>

          {/* Right Sidebar Column */}
          <div className="hidden lg:block relative z-10">
            <BlogSidebar />
          </div>

        </div>
      </div>
    </div>
  );
}
