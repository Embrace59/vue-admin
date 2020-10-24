import service from "@/utils/request.js"

export function GetSms(data){
    return service.request({
        method: "post",
        url: "/getSms",
        data: data
    })
}