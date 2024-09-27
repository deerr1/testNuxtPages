export default defineEventHandler((event) => {
    const cookie = "accessToken=GOVNO; httpOnly"
    appendResponseHeader(event, 'set-cookie', cookie)
    return {
        hello: 'world'
    }
})