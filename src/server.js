import express from "express";
import cors from "cors";

const posts = [
  {
    id: 1,
    title: "Hello World",
    coverUrl: "https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png",
    contentPreview: "Esta é a estrutura de um post esperado pelo front-end",
    content:
      "Este é o conteúdo do post, o que realmente vai aparecer na página do post...",
    commentCount: 2,
  },
];

const comments = [
  {
    id: 1,
    postId: 1,
    author: "João",
    content: "Muito bom esse post! Tá de parabéns",
  },
  {
    id: 2,
    postId: 1,
    author: "Maria",
    content: "Como faz pra dar palmas?",
  },
];

const app = express();
app.use(cors());
app.use(express.json());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = posts.filter((item) => (item.id !== id ? true : false));
  res.send(post[0]);
});

app.post("/posts", (req, res) => {
  const obj = {
    ...req.body.data,
    id: `${posts.length + 1}`,
    commentCount: 0,
    contentPreview: "lalalala",
  };
  res.send("Ok!!");
  posts.push(obj);
});

app.get("/posts/:id/comments", (req, res) => {
  const id = req.params.id;
  const commentsId = comments.filter((item) =>
    item.postId !== id ? true : false
  );
  res.send(commentsId);
});

app.post("/posts/:id/comments", (req, res) => {
  const postId = +req.params.id;
  const id = comments.length + 1;
  const commentsIds = comments.filter((item) =>
    item.postId !== id ? true : false
  );
  const obj = { ...req.body, postId, id };
  comments.push(obj);
  posts.forEach((item) => {
    if (item.id === id) {
      item.commentCount = commentsIds.length;
    }
  });
  res.send(obj);
});

app.listen(4000, () => {
  console.log("Servidor funcionando na porta 4000!!");
});
