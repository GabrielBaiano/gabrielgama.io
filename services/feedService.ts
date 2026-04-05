import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export interface FeedPostData {
  id: string;
  author: {
    name: string;
    avatar: string;
    handle: string;
  };
  timeAgo: string;
  title: string;
  content: string; 
  fullContent?: string; 
  imageUrl?: string;
  href?: string;
  metrics: {
    upvotes: number;
    comments?: number;
  };
  isShared?: {
    by: string;
  };
  category?: string;
  sections?: { id: string; title: string; body?: string; }[];
}

/**
 * Extracts H2 headers `## Title` from a markdown string 
 * and maps them into an array for the FloatingIndex component.
 */
function extractSections(markdown: string) {
  const sections: { id: string; title: string }[] = [];
  const regex = /^##\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    let title = match[1].trim();
    // Strip bold/italic markdown characters from the visual title 
    title = title.replace(/(\*\*|__|\*|_|`)/g, '');
    
    // Create bulletproof slug
    const id = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove accents First
      .replace(/\s+/g, '-')            // replace spaces with hyphens
      .replace(/[^\w-]/g, '');         // remove remaining non-word chars
      
    sections.push({ id, title });
  }
  return sections;
}

export async function getAllPosts(): Promise<FeedPostData[]> {
  if (!fs.existsSync(POSTS_DIR)) return [];
  
  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith(".md"));
  
  const posts = files.map(file => {
    const id = file.replace(/\.md$/, "");
    const fullPath = path.join(POSTS_DIR, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    
    // Parse frontmatter mapping
    const { data, content } = matter(fileContents);
    
    return {
      id,
      title: data.title || "Untitled Post",
      author: data.author || { 
        name: "Gabriel Gama", 
        handle: "@gabrielgama", 
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Gabriel&backgroundColor=e5e5e5" 
      },
      timeAgo: data.timeAgo || "Recently",
      category: data.category,
      imageUrl: data.imageUrl,
      metrics: data.metrics || { upvotes: 0 },
      isShared: data.isShared,
      href: data.href, // Preserved functionality for external links mapped via frontmatter
      content: data.excerpt || content.substring(0, 200) + "...", 
      fullContent: content, 
      sections: extractSections(content),
    } as FeedPostData;
  });

  return posts.sort((a, b) => {
    return b.id.localeCompare(a.id); // Simple arbitrary sort 
  });
}

export async function getPostById(id: string): Promise<FeedPostData | null> {
  const posts = await getAllPosts();
  return posts.find(p => p.id === id) || null;
}
