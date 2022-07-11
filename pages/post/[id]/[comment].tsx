import { useRouter } from 'next/router';

const Comment = () => {
  const router = useRouter();
  const { id, comment, abc } = router.query;

  return (
    <>
      <h1>Post: {id}</h1>
      <h1>Comment: {comment}</h1>
      <h1>ABC: {abc}</h1>
    </>
  );
};

export default Comment;
