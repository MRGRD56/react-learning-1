import PostData from "./PostData";
import moment, {Moment} from "moment";
import FetchedPost from "./FetchedPost";
// @ts-ignore
import momentRandom from "moment-random";

export default class Post {
    private static idCounter: number = 0;

    public readonly id: string;
    public readonly creationTime: Moment = moment();

    constructor(
        public readonly title: string,
        public readonly content: string,
        creationTime: Moment | undefined = undefined,
        id: string | undefined = undefined
    ) {
        this.creationTime = creationTime ?? moment();
        this.id = id ?? Date.now().valueOf().toString() + "_" + ++Post.idCounter;
    }

    static fromPostData(postData: PostData) {
        return new Post(postData.title, postData.content);
    }

    private static getPostFromParsed(parsed: any) {
        return new Post(parsed.title, parsed.content, moment(parsed.creationTime), parsed.id);
    }

    static fromJson(json: string): Post | Post[] {
        const parsed = JSON.parse(json);
        const isArray = Array.isArray(parsed);
        return isArray
            ? parsed.map(p => Post.getPostFromParsed(p))
            : Post.getPostFromParsed(parsed);
    }

    static fromFetchedPost(fetchedPost: FetchedPost): Post {
        return new Post(
            fetchedPost.title,
            fetchedPost.body,
            momentRandom(moment(), moment().add(-3, "years") as Moment),
            fetchedPost.id.toString());
    }
}