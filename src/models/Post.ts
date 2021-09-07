import PostData from "./PostData";

export default class Post {
    private static idCounter: number = 0;

    constructor(
        public readonly title: string,
        public readonly content: string,
        public readonly id: number | undefined = undefined
    ) {
        if (id === undefined) {
            this.id = ++Post.idCounter;
        }
    }

    static fromPostData(postData: PostData) {
        return new Post(postData.title, postData.content);
    }
}