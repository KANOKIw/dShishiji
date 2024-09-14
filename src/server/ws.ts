import * as cookie from "cookie";
import { UserAuth } from "./handler/user/auth";
import { User } from "./handler/user/user";
import { Socket } from "socket.io";
import { OrgAuth } from "./handler/org/auth";
import { websocketio } from "./drought";
import { UserActivity } from "./handler/user/activity";
import { Orgument } from "./handler/org/orgument";


async function setUserId(socket: Socket){
	const cookies: { [key: string]: string } = cookie.parse(socket.request.headers.cookie || "");
    const user_sessionid = cookies["__shjSID"] || "";
    const userdata = await UserAuth.fineData(user_sessionid).catch(()=>{});

    if (!userdata) return;
    
    const user = new User(userdata.discriminator);

    socket.data = {
        user: user
    };
    socket.join(user.user_id);
    

	socket.on("disconnect", (reason) => {
        socket.leave(userdata.discriminator);
	});
}


async function setOrgStatus(socket: Socket){
    const cookies: { [key: string]: string } = cookie.parse(socket.request.headers.cookie || "");
    const org_sessionid = cookies["__ogauthk"] || "";
    const oname = await OrgAuth._auth(org_sessionid);
    
    if (!oname) return;

    const socketdisc = "_org-" + oname;

    socket.join(socketdisc);
    
    socket.on("disconnect", (reason) => {
        socket.leave(socketdisc);
	});
}


async function anyHandler(socket: Socket){
    socket.on("org.data.crowdstatus", callback => {
        callback(Orgument.crowd_status);
    });
}


export const socketOnConnection = {
    setUserId: setUserId,
    setOrgStatus: setOrgStatus,
    anyHandler: anyHandler
}


export { }
