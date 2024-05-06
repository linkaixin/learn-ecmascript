import { getCommentListService, setCommentListService } from "@/api/comment";
import { ref, reactive } from "vue";

export default function comment() {
    const userList = reactive([
        { id: 1, userName: 'zhangsan', name: '张三' },
        { id: 2, userName: 'lisi', name: '李四' },
        { id: 3, userName: 'wangwu', name: '王五' },
    ])
    let userInfo = ref(userList[0])
    let commentData = ref([]);

    const getComment = () => {
        getCommentListService().then(res => {
            commentData.value = commentTree(res)
        })
    }

    const commentTree = (comments) => {
        const commentMap = {};

        // 首先，将所有评论按照id存储到一个哈希表中，并初始化children数组
        comments.forEach(comment => {
            commentMap[comment.id] = { ...comment, children: [] };
        });

        // 然后，遍历所有评论，根据pid将其放入父评论的children数组中
        const rootComments = []; // 存储没有父评论的根评论
        comments.forEach(comment => {
            if (comment.pid != 0) {
                if (commentMap[comment.pid]) {
                    commentMap[comment.pid].children.push(commentMap[comment.id]);
                }
            } else {
                rootComments.push(commentMap[comment.id]);
            }
        });

        return rootComments;
    }

    const setComment = async (comment, pid) => {
        try {
            await setCommentListService(comment);
            if (pid == 0) {
                commentData.value.unshift(comment);
            } else {
                findTreePid(commentData.value, pid, comment)
            }
        } catch (error) {

        }
    }

    const findTreePid = (comments, pid, comment) => {

        for (const item of comments) {
            if (item.id == pid) {
                if (!item.children) {
                    item.children = [];
                }
                item.children.unshift(comment);
                return;
            } else {
                if (item.children && item.children.length > 0) {
                    findTreePid(item.children, pid, comment)
                }
            }
        }
    }

    const changeUserInfo = (index) => {
        userInfo.value = userList[index]
    }

    getComment();

    return {
        userList,
        userInfo,
        changeUserInfo,
        commentData,
        setComment,
    }
}