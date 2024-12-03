import { Grid2 } from "@mui/material";
import { CardPost } from "../components/Card";
import { travelBlogList } from "../mock/blog-list";

export function Blog() {
  return (
    <Grid2 container spacing={2}>
      {travelBlogList.map((post, index) => (
        <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
          <CardPost
            key={index}
            img={post.img}
            title={post.title}
            author={post.author}
            rating={post.rating}
            createdAt={post.createdAt}
            categories={post.categories}
            description={post.description}
          />
        </Grid2>
      ))}
    </Grid2>
  );
}
