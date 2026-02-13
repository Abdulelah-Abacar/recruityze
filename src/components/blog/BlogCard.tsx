import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

export const BlogCard = ({ post }) => (
  <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
    <CardHeader className="p-0">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          width={800}
          height={400}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    </CardHeader>
    <CardContent className="p-6">
      <div className="mb-3 flex gap-2">
        {post.categories.map((category) => (
          <Badge
            key={category}
            variant="outline"
            className="cursor-pointer hover:bg-black hover:text-white"
          >
            {category}
          </Badge>
        ))}
      </div>
      <CardTitle className="mb-3 text-xl">{post.title}</CardTitle>
      <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
    </CardContent>
    <CardFooter className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage src={post.author.avatar} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="text-sm">{post.author.name}</span>
      </div>
      <time className="text-sm text-muted-foreground">
        {formatDate(post.publishedAt)}
      </time>
    </CardFooter>
  </Card>
);
