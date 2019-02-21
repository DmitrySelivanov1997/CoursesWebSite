const server = {
    url:"https://localhost:5001",
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
    courses
}