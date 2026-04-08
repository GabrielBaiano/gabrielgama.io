import { notFound } from "next/navigation";
import { FloatingIndex } from "./components/FloatingIndex";
import { BlogPostActions } from "../components/BlogPostActions";
import { getPostById } from "../../../../../services/blogService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const extractTextFromReactChildren = (children: any): string => {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(extractTextFromReactChildren).join('');
  if (children && children.props && children.props.children) {
    return extractTextFromReactChildren(children.props.children);
  }
  return '';
};

// In Next.js 14 params can be accessed normally. In Next.js 15 they are promises. 
// Standard typing handles both. We'll extract id securely.
export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Fetch asynchronously from our Markdown extraction engine
  const post = await getPostById(id);

  if (!post) {
    return notFound();
  }

  return (
    <div className="min-h-screen relative w-full bg-stone-50/50 selection:bg-stone-200 pt-28 pb-32 flex justify-center">
      <div className="w-full max-w-4xl px-4 md:px-6">
        <div 
          className="w-full bg-white rounded-[32px] border border-stone-200/60 p-6 md:p-10 shadow-xl"
        >
          {/* Post Detail Header */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-stone-100">
            <div className="w-14 h-14 rounded-full bg-stone-100 overflow-hidden border border-stone-200">
              <img src={post.author.avatar!} alt={post.author.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-stone-900">{post.author.name}</h3>
                <span className="text-[15px] text-stone-500">{post.author.handle}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[14px] text-stone-500">{post.timeAgo}</span>
                {post.category && (
                  <>
                    <span className="text-stone-300">•</span>
                    <span className="text-[13px] font-medium text-emerald-600">
                      {post.category}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Expanded Content mapping using react-markdown components proxy */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-stone-900 leading-tight">
              {post.title}
            </h1>
            
            <div className="text-[17px] md:text-[19px] leading-relaxed text-stone-600 font-sans tracking-[0.2px] break-words">
               <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({node, ...props}) => {
                    const text = extractTextFromReactChildren(props.children);
                    const localId = text
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "") 
                      .replace(/\s+/g, '-')
                      .replace(/[^\w-]/g, '');
                    return <h2 id={localId} className="text-2xl font-bold tracking-tight text-stone-900 mb-4 mt-16 scroll-mt-32" {...props} />
                  },
                  p: ({node, ...props}) => <p className="mb-6 whitespace-pre-line" {...props} />,
                  img: ({node, ...props}) => (
                    <span className="block mt-12 mb-12 rounded-[24px] overflow-hidden border border-stone-100 bg-stone-50 shadow-sm">
                      <img className="w-full object-cover" alt={props.alt || "MDX Embed"} {...props} />
                    </span>
                  ),
                  strong: ({node, ...props}) => <strong className="font-semibold text-stone-900" {...props} />
                }}
              >
                {post.fullContent || post.content}
              </ReactMarkdown>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-stone-100">
            <BlogPostActions metrics={post.metrics as any} />
          </div>

        </div>
      </div>

      {post.sections && post.sections.length > 0 && (
        <FloatingIndex items={post.sections} />
      )}
      
      {/* Spacer to handle over-scroll and ensure tracking goes to 100% */}
      <div className="h-[20vh]" />
    </div>
  );
}
