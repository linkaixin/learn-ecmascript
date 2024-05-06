import { httpGet, httpPost } from "@/utils/https";

export function getCommentListService() {
    return httpGet("/get_comment")
}

export function setCommentListService(comment) {
    return httpPost("/set_comment", { comment })
}