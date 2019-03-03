const server = {
    url:"https://commentsiteapp20190302052317.azurewebsites.net",
    api:"/api"
}
const users = {
    users : "/users",
    getByLogin : "/get-by-login",
}
const auth = {
    auth : "/auth",
    login: "/login"
}
const courses = {
    courses : "/courses",
}
const comments = {
    comments : "/comments",
}
const global = {
    getByPage : "/get-by-page",
    getByName: "/get-by-name",
    getCount: "/count",
    delete: '/delete'
}
export {
    server,
    users,
    auth,
    global,
    courses,
    comments
}